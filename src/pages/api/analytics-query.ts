import type { APIRoute } from 'astro';
import { getApiKey } from '../../utils/apiKey';
import type { KVNamespace } from '@cloudflare/workers-types';
import { getPhoenixTracer } from '../../utils/phoenix';
import { trace, context as otelContext, SpanStatusCode } from "@opentelemetry/api";

const LLAMA_URL = 'https://api.llama.com/v1/chat/completions';
const MODEL     = 'Llama-4-Maverick-17B-128E-Instruct-FP8';

export const prerender = false;
export const POST: APIRoute = async ({request, locals}) => {
  const tracer = getPhoenixTracer(locals);

  const execute = async () => {
    const {deviceIds, question} = await request.json() ?? {};
    if (!Array.isArray(deviceIds) || !question) {
      return new Response(JSON.stringify({error:'deviceIds[] and question are required'}),{status:400});
    }

    const currentSpan = trace.getActiveSpan();
    currentSpan?.setAttributes({
        "analytics.question": question,
        "analytics.device_ids": deviceIds,
    });

    const kv = locals.runtime?.env?.BLGC_USER_INTERACTIONS_KV as KVNamespace|undefined;
    if (!kv) {
        currentSpan?.recordException(new Error("KV missing"));
        currentSpan?.setStatus({ code: SpanStatusCode.ERROR, message: "KV missing" });
        return new Response(JSON.stringify({error:'KV missing'}),{status:500});
    }

    // Gather messages for selected devices
    let context = '';
    for (const id of deviceIds) {
      const {keys} = await kv.list({ prefix: `${id}/` });
      for (const k of keys) {
        const data = await kv.get<any>(k.name,{type:'json'});
        if (!data?.messages) continue;
        context += `\n--- DEVICE ${id} KEY ${k.name} ---\n`;
        context += data.messages.map((m:any)=>`${m.role}: ${m.content}`).join('\n');
      }
    }
    if (!context) {
        currentSpan?.addEvent("no_messages_found");
        return new Response(JSON.stringify({error:'No messages found for selected devices'}),{status:404});
    }

    const apiKey = getApiKey(locals, import.meta.env.DEV);
    if (!apiKey) {
        currentSpan?.recordException(new Error("API key missing"));
        currentSpan?.setStatus({ code: SpanStatusCode.ERROR, message: "API key missing" });
        return new Response(JSON.stringify({error:'API key missing'}),{status:500});
    }

    const sysPrompt = `You are an analytics assistant. The user will ask questions about the following chat-log corpus. Answer succinctly.\n--- BEGIN CORPUS ---\n${context}\n--- END CORPUS ---`;
    const payload = {
      model: MODEL,
      messages: [
        {role:'system', content: sysPrompt},
        {role:'user',   content: question}
      ],
      max_tokens: 2048,
      temperature: 0.3
    };

    currentSpan?.setAttributes({
        "llm.request.type": "chat",
        "llm.request.model": payload.model,
        "llm.request.max_tokens": payload.max_tokens,
        "llm.request.temperature": payload.temperature,
    });
    payload.messages.forEach((msg, index) => {
        currentSpan?.addEvent(`message.${index}`, {
            "llm.input.role": msg.role,
            "llm.input.content": msg.content,
        });
    });

    const llmRes = await fetch(LLAMA_URL,{
      method:'POST',
      headers:{'Content-Type':'application/json', Authorization:`Bearer ${apiKey}`},
      body: JSON.stringify(payload)
    });
    if (!llmRes.ok) {
      const errorText = await llmRes.text();
      currentSpan?.recordException(new Error(`LLM API Error: Status ${llmRes.status}. Details: ${errorText.substring(0, 1000)}`));
      currentSpan?.setStatus({ code: SpanStatusCode.ERROR, message: `LLM error ${llmRes.status}` });
      return new Response(JSON.stringify({error:`LLM error ${llmRes.status}`}),{status:502});
    }
    const data = await llmRes.json();
    const answer = data.completion_message?.content?.text || data.choices?.[0]?.message?.content || '';
    currentSpan?.addEvent("llm.output", { "llm.output.content": answer });
    return new Response(JSON.stringify({answer}),{headers:{'Content-Type':'application/json'}});
  };

  if (tracer) {
    const span = tracer.startSpan("analytics-query");
    return otelContext.with(trace.setSpan(otelContext.active(), span), async () => {
        try {
            return await execute();
        } catch (e) {
            span.recordException(e);
            span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
            throw e;
        } finally {
            span.end();
        }
    });
  } else {
    return execute();
  }
};

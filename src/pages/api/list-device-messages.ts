import type { APIRoute } from 'astro';
import type { KVNamespace } from '@cloudflare/workers-types';

export const prerender = false;
export const GET: APIRoute = async ({ locals }) => {
  const kv = locals.runtime?.env?.BLGC_USER_INTERACTIONS_KV as KVNamespace|undefined;
  if (!kv) return new Response('KV missing', {status:500});

  const result: Record<string,{messages:{role:string,content:string}[]}> = {};
  let cursor: string|undefined;
  do {
    const {keys, cursor: next} = await kv.list({ cursor });
    cursor = next && next !== '0' ? next : undefined;
    for (const k of keys) {
      // key format: deviceId/DATE/slug
      const [deviceId] = k.name.split('/');
      if (!deviceId) continue;
      const data = await kv.get<any>(k.name, {type:'json'});
      if (!data?.messages) continue;
      if (!result[deviceId]) result[deviceId] = {messages:[]};
      result[deviceId].messages.push(...data.messages);
    }
  } while (cursor);
  return new Response(JSON.stringify(result), {headers:{'Content-Type':'application/json'}});
};

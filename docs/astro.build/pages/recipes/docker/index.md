Build your Astro site with Docker
=================================

[Docker](https://docker.com) is a tool to build, deploy, and run applications using containers.

Docker images and containers can be deployed to many different platforms, like AWS, Azure, and [Google Cloud](/en/guides/deploy/google-cloud/#cloud-run-ssr-and-static). This recipe won’t cover how to deploy your site to a specific platform but will show you how to set up Docker for your project.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

*   Docker installed on your local machine. You can find [installation instructions for your operating system here](https://docs.docker.com/get-docker/).
*   A Dockerfile in your project. You can [learn more about Dockerfiles here](https://docs.docker.com/engine/reference/builder/) and use the Dockerfiles in the following section as a starting point.

Creating a Dockerfile
---------------------

[Section titled Creating a Dockerfile](#creating-a-dockerfile)

Create a file called `Dockerfile` in your project’s root directory. This file contains the instructions to build your site, which will differ depending on your needs. This guide can’t show all possible options but will give you starting points for SSR and static mode.

If you’re using another package manager than npm, you’ll need to adjust the commands accordingly.

### SSR

[Section titled SSR](#ssr)

This Dockerfile will build your site and serve it using Node.js on port `4321` and therefore requires the [Node adapter](/en/guides/integrations-guide/node/) installed in your Astro project.

Dockerfile

    FROM node:lts AS runtimeWORKDIR /app
    COPY . .
    RUN npm installRUN npm run build
    ENV HOST=0.0.0.0ENV PORT=4321EXPOSE 4321CMD node ./dist/server/entry.mjs

Keep this in mind

These are just examples of Dockerfiles. You can customize them to your needs. For example, you could use another image, like `node:lts-alpine`:

Dockerfile

    FROM node:lts as runtimeFROM node:lts-alpine as runtime

### Adding a .dockerignore

[Section titled Adding a .dockerignore](#adding-a-dockerignore)

Adding a `.dockerignore` file to your project is best practice. This file describes which files or folders should be ignored in the Docker `COPY` or `ADD` commands, very similar to how `.gitignore` works. This speeds up the build process and reduces the size of the final image.

.dockerignore

    .DS_Storenode_modulesdist

This file should go in the same directory as the `Dockerfile` itself. [Read the `.dockerignore` documentation for extra info](https://docs.docker.com/engine/reference/builder/#dockerignore-file)

### Static

[Section titled Static](#static)

#### Apache (httpd)

[Section titled Apache (httpd)](#apache-httpd)

The following Dockerfile will build your site and serve it using Apache httpd on port `80` with the default configuration.

Dockerfile

    FROM node:lts AS buildWORKDIR /appCOPY . .RUN npm iRUN npm run build
    FROM httpd:2.4 AS runtimeCOPY --from=build /app/dist /usr/local/apache2/htdocs/EXPOSE 80

Recommendation

Use this approach for simple websites that don’t need any special configuration. For more complex websites, it is recommended to use a custom configuration, either in Apache or NGINX.

#### NGINX

[Section titled NGINX](#nginx)

Dockerfile

    FROM node:lts AS buildWORKDIR /appCOPY package*.json ./RUN npm installCOPY . .RUN npm run build
    FROM nginx:alpine AS runtimeCOPY ./nginx/nginx.conf /etc/nginx/nginx.confCOPY --from=build /app/dist /usr/share/nginx/htmlEXPOSE 8080

In order to build the Dockerfile above, you’ll also need to create a configuration file for NGINX. Create a folder called `nginx` in your project’s root directory and create a file called `nginx.conf` inside.

nginx.conf

    worker_processes  1;
    events {  worker_connections  1024;}
    http {  server {    listen 8080;    server_name   _;
        root   /usr/share/nginx/html;    index  index.html index.htm;    include /etc/nginx/mime.types;
        gzip on;    gzip_min_length 1000;    gzip_proxied expired no-cache no-store private auth;    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
        error_page 404 /404.html;    location = /404.html {            root /usr/share/nginx/html;            internal;    }
        location / {            try_files $uri $uri/index.html =404;    }  }}

### Multi-stage build (using SSR)

[Section titled Multi-stage build (using SSR)](#multi-stage-build-using-ssr)

Here’s an example of a more advanced Dockerfile that, thanks to Docker’s [multi-stage builds](https://docs.docker.com/build/building/multi-stage/), optimizes the build process for your site by not reinstalling the npm dependencies when only the source code changes. This can reduce the build time even by minutes, depending on the size of your dependencies.

Dockerfile

    FROM node:lts AS baseWORKDIR /app
    # By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.# Therefore, the `-deps` steps will be skipped if only the source code changes.COPY package.json package-lock.json ./
    FROM base AS prod-depsRUN npm install --omit=dev
    FROM base AS build-depsRUN npm install
    FROM build-deps AS buildCOPY . .RUN npm run build
    FROM base AS runtimeCOPY --from=prod-deps /app/node_modules ./node_modulesCOPY --from=build /app/dist ./dist
    ENV HOST=0.0.0.0ENV PORT=4321EXPOSE 4321CMD node ./dist/server/entry.mjs

Recipe
------

[Section titled Recipe](#recipe)

1.  Build your container by running the following command in your project’s root directory. Use any name for `<your-astro-image-name>`:
    
    Terminal window
    
        docker build -t <your-astro-image-name> .
    
    This will output an image, which you can run locally or deploy to a platform of your choice.
    
2.  To run your image as a local container, use the following command.
    
    Replace `<local-port>` with an open port on your machine. Replace `<container-port>` with the port exposed by your Docker container (`4321`, `80`, or `8080` in the above examples.)
    
    Terminal window
    
        docker run -p <local-port>:<container-port> <your-astro-image-name>
    
    You should be able to access your site at `http://localhost:<local-port>`.
    
3.  Now that your website is successfully built and packaged in a container, you can deploy it to a cloud provider. See the [Google Cloud](/en/guides/deploy/google-cloud/#cloud-run-ssr-and-static) deployment guide for one example, and the [Deploy your app](https://docs.docker.com/language/nodejs/deploy/) page in the Docker docs.
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/docker.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Verify a Captcha](/en/recipes/captcha/) [Next  
Dynamically import images](/en/recipes/dynamically-importing-images/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)
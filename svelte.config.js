import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'
import node_adapter from "@sveltejs/adapter-node";
import static_adapter from "@sveltejs/adapter-static";
import vercel from "@sveltejs/adapter-vercel";

const is_static = process.env.BUILD_STATIC_ENV ?? false;
const is_node = process.env.BUILD_NODE_ENV ?? false;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    }),
    mdsvex(mdsvexConfig)
  ],

  kit: {
    adapter: is_static
      ? static_adapter({
          fallback: "app.html",
          // precompress: true,
          strict: true
      })
    : is_node
      ? node_adapter({
          precompress: false
      })
    : vercel({
          // an array of dependencies that esbuild should treat
          // as external when bundling functions
          external: []
      }),

    // remove this if you don't want prerendering
    prerender: {
      entries: ['*', '/sitemap.xml', '/rss.xml']
    }
  }
}

export default config

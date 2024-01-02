/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	refURLs: KVNamespace;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

// Uncomment for testing key value associations offline. 
// const refURL = {
// 	"/github": "https://github.com/xegenix",
// 	"/www": "https://nullidle.com",
// 	"/nullidle": "https://nullidle.com",
// 	"/store": "https://toxiculture.com",
// 	"/linkedin": "https://linkedin.com/in/insecurity",
// } as Record<any, string>;

export default {
	async fetch(
		request: Request,
		env: Env,
		_ctx: ExecutionContext
	): Promise<Response> {
		
		const url = new URL(request.url);
		
		const { pathname } = url;
		
		const redirectURL = refURL[pathname];
		
		if (!redirectURL) {
		  return new Response(`Non-existant pathname: '${pathname}', <br/>Verify the URL entered is accurate!`);
	}

	return Response.redirect(redirectURL, 301);
  }, 
};

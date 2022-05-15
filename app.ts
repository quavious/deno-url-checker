import { Application, Router } from 'https://deno.land/x/oak@v10.5.1/mod.ts';
import { Status } from 'https://deno.land/std@0.139.0/http/mod.ts';

const port = 80;
const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36';
const app = new Application();
const router = new Router();

router.post('/url', async (ctx) => {
  try {
    const body: { [key: string]: any } = await ctx.request.body({
      type: 'json',
    }).value;
    if (!('url' in body) || typeof body.url !== 'string') {
      throw new Error('Invalid Request');
    }
    const resp = await fetch(body.url, {
      method: 'GET',
      headers: {
        'user-agent': userAgent,
      },
    });
    const { response } = ctx;
    response.status = Status.OK;
    response.body = {
      status: true,
      originUrl: resp.url,
    };
  } catch (err) {
    console.error(err);
    const { response } = ctx;
    response.status = Status.BadRequest;
    response.body = {
      status: false,
      originUrl: null,
    };
  }
});

const mux = [router];
mux.forEach((m) => app.use(m.routes()));
await app.listen({
  port,
});

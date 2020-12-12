import Router from 'next/router';

async function redirect(url: string, as?: string, ctx?: any): Promise<any> {
  if (ctx?.res) {
    // server
    ctx.res.writeHead(302, {Location: url});
    ctx.res.end();
    return true;
  }
  // In the browser, we just pretend like this never even happened ;)
  return await Router.replace(url, as);
}

async function push(url: string, as?: string, ctx?: any): Promise<any> {
  if (!!ctx && !!ctx.res) {
    // server
    // 200: "See other"
    ctx.res.writeHead(200, {Location: url});
    ctx.res.end();
    return true;
  } else {
    // In the browser, we just pretend like this never even happened ;)
    return await Router.push(url, as);
  }
}


export const routerUtils = {redirect, push};

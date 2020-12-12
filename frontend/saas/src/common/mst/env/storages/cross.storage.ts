import {destroyCookie, parseCookies, setCookie} from 'nookies';

const defaultCookieOptions = {
  maxAge: 30 * 24 * 60 * 60,
  path: '/',
};

class CrossStorage {
  getString(key: string, ctx?: any): string | undefined {
    try {
      const cookies = parseCookies(ctx, defaultCookieOptions);
      return cookies ? cookies[key] : undefined;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return undefined;
    }
  }

  setString(key: string, value: string, ctx?: any): void {
    try {
      setCookie(ctx, key, value, defaultCookieOptions);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  remove(key: string, ctx?: any): void {
    try {
      destroyCookie(ctx, key);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

export default CrossStorage;

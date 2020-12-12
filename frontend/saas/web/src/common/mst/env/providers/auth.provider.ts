import {AuthenticateInput, AuthenticateResult, RegisterTenantInput} from "@common/mst/services";
import CrossStorage from "@common/mst/env/storages/cross.storage";
import HttpProvider from "@common/mst/env/providers/http.provider";
import ApiProvider from "@common/mst/env/providers/api.provider";
// @ts-ignore
import jwtDecode from "jwt-decode";

const accessTokenKey = 'access_token';
// const refreshTokenKey = 'refresh_token';
const authorizationHeader = 'Authorization';

export class AuthContext {
  private constructor(private readonly decodedTokenInfo: any) {
  }

  public getUserInfo() {
    return {
      name: this.decodedTokenInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      roles: this.decodedTokenInfo.roles || [],
    }
  }

  static fromAccessToken(accessToken?: string): AuthContext | undefined {
    if (!accessToken) return undefined;
    const decodedTokenInfo = jwtDecode(accessToken) as any;
    if (!decodedTokenInfo) return undefined;
    const current_time = Date.now() / 1000;
    /* expired */
    if (decodedTokenInfo.exp < current_time) {
      console.debug('access token expired...');
      return undefined;
    }
    return new AuthContext(decodedTokenInfo);
  }
}

class AuthProvider {

  constructor(
    private readonly crossStorage: CrossStorage,
    private readonly httpProvider: HttpProvider,
    private readonly apiProvider: ApiProvider,
  ) {
  }

  public authContext(ctx?: any): AuthContext | undefined {
    const accessToken = this.getAccessTokenFromCookie(ctx);
    return AuthContext.fromAccessToken(accessToken);
  }

  public initialize(ctx?: any): AuthContext | undefined {
    const accessToken = this.getAccessTokenFromCookie(ctx);
    if (accessToken) {
      this.httpProvider.apiHttpClient.defaults.headers[authorizationHeader] = AuthProvider.formatAccessToken(accessToken);
      return AuthContext.fromAccessToken(accessToken);
    }

    return undefined;
  }

  public async login(input: AuthenticateInput): Promise<AuthContext> {
    this.httpProvider.apiHttpClient.defaults.headers[authorizationHeader] = undefined;
    const result = await this.apiProvider.authService.authenticate({body: input});
    this.setAuthToken(result);
    return AuthContext.fromAccessToken(result.accessToken)!;
  }

  public async register(input: RegisterTenantInput): Promise<AuthContext> {
    this.httpProvider.apiHttpClient.defaults.headers[authorizationHeader] = undefined;
    const result = await this.apiProvider.registrationService.registration({body: input});
    this.setAuthToken(result.adminToken, undefined);
    return AuthContext.fromAccessToken(result.adminToken?.accessToken)!;
  }

  public async logout(): Promise<any> {
    this.removeAuthToken();
  }

  private setAuthToken = (tokenInfo?: AuthenticateResult, ctx?: any) => {
    if (tokenInfo?.accessToken) {
      this.crossStorage.setString(accessTokenKey, tokenInfo.accessToken, ctx);
      this.httpProvider.apiHttpClient.defaults.headers[authorizationHeader] = AuthProvider.formatAccessToken(tokenInfo.accessToken);
    }
  };

  private removeAuthToken = () => {
    this.crossStorage.remove(accessTokenKey);
    // this.crossStorage.remove(refreshTokenKey);
    this.httpProvider.apiHttpClient.defaults.headers[authorizationHeader] = null;
  };

  private getAccessTokenFromCookie(ctx?: any): string | undefined {
    return this.crossStorage.getString(accessTokenKey, ctx);
  }

  /*  private getRefreshTokenFromCookie(ctx?: any): string | undefined {
      return this.crossStorage.getString(refreshTokenKey, ctx);
    }*/

  private static formatAccessToken(accessToken: string): string {
    if (!accessToken) return accessToken;
    return `Bearer ${accessToken}`;
  }
}

export default AuthProvider;

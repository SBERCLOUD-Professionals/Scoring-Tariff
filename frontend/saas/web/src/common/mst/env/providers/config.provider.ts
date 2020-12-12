import {urlUtils} from "@common/utils/url.utils";

export interface IAuthConfigs {
  authUrl: string;
  realm: string;
  clientId: string;
}

class ConfigProvider {
  private readonly _apiUrl: string;

  constructor() {
    this._apiUrl = urlUtils.isValidUrl(process.env.NEXT_PUBLIC_API_URL) ? process.env.NEXT_PUBLIC_API_URL || '' : '';
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

}

export default ConfigProvider;

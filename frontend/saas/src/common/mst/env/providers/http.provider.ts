import axios, {AxiosInstance} from 'axios';
import ConfigProvider from "@common/mst/env/providers/config.provider";
import ApiProvider from "@common/mst/env/providers/api.provider";

class HttpProvider {
  public readonly apiHttpClient: AxiosInstance;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly apiProvider: ApiProvider,
  ) {
    this.apiHttpClient = axios.create({
      baseURL: this.configProvider.apiUrl,
      headers: {'Content-Type': 'application/json',},
    });
    apiProvider.customAxios(this.apiHttpClient);
  }
}

export default HttpProvider;

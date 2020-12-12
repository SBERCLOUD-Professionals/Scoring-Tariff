import ConfigProvider from "@common/mst/env/providers/config.provider";
import HttpProvider from "@common/mst/env/providers/http.provider";
import AuthProvider from "@common/mst/env/providers/auth.provider";
import CrossStorage from "@common/mst/env/storages/cross.storage";
import ApiProvider from "@common/mst/env/providers/api.provider";

export interface IRootEnv {
  providers: {
    authProvider: AuthProvider,
    httpProvider: HttpProvider,
    configProvider: ConfigProvider,
    apiProvider: ApiProvider,
  },
  storages: {
    crossStorage: CrossStorage
  }
}

const createRootEnv = () => {

  const crossStorage = new CrossStorage();
  const configProvider = new ConfigProvider();
  const apiProvider = new ApiProvider();
  const httpProvider = new HttpProvider(configProvider, apiProvider);
  const authProvider = new AuthProvider(crossStorage, httpProvider, apiProvider);

  return {
    providers: {
      authProvider: authProvider,
      httpProvider: httpProvider,
      configProvider: configProvider,
      apiProvider: apiProvider,
    },
    storages: {
      crossStorage: crossStorage
    }
  } as IRootEnv
}

export default createRootEnv;
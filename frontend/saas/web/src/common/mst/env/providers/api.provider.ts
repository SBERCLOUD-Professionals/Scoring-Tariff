import {AuthService, RegistrationService, serviceOptions} from "@common/mst/services";
import {AxiosInstance} from "axios";

class ApiProvider {

  private _authService: AuthService | undefined;
  private _registrationService: RegistrationService | undefined;

  customAxios(axios: AxiosInstance) {
    serviceOptions.axios = axios;
  }

  get authService() {
    if (!this._authService) {
      this._authService = new AuthService();
    }
    return this._authService;
  }

  get registrationService() {
    if (!this._registrationService) {
      this._registrationService = new RegistrationService();
    }
    return this._registrationService;
  }

}

export default ApiProvider;
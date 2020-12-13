/** Generate by swagger-axios-codegen */
// tslint:disable
/* eslint-disable */
import axiosStatic, { AxiosInstance } from 'axios';

export interface IRequestOptions {
  headers?: any;
  baseURL?: string;
  responseType?: string;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AbpApiDefinitionService {
  /**
   *
   */
  apiDefinition(
    params: {
      /**  */
      includeTypes?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ApplicationApiDescriptionModel> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/abp/api-definition';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { IncludeTypes: params['includeTypes'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class AbpApplicationConfigurationService {
  /**
   *
   */
  applicationConfiguration(options: IRequestOptions = {}): Promise<ApplicationConfigurationDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/abp/application-configuration';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class AuthService {
  /**
   *
   */
  authenticate(
    params: {
      /** requestBody */
      body?: AuthenticateInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AuthenticateResult> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/account/auth/authenticate';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ProfileService {
  /**
   *
   */
  profile(options: IRequestOptions = {}): Promise<ProfileDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/account/profile';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  profile1(
    params: {
      /** requestBody */
      body?: UpdateProfileDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProfileDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/account/profile';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  changePassword(
    params: {
      /** requestBody */
      body?: ChangePasswordInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/account/profile/changePassword';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class RegistrationService {
  /**
   *
   */
  lookupByName(
    params: {
      /** requestBody */
      body?: LookupTenantByNameInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LookupTenantByNameResult> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/multiTenancy/registration/lookupByName';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  registration(
    params: {
      /** requestBody */
      body?: RegisterTenantInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RegisterTenantResult> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/multiTenancy/registration';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ResetPasswordService {
  /**
   *
   */
  sendToken(
    params: {
      /** requestBody */
      body?: SendPasswordResetCodeInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/account/resetPassword/sendToken';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  confirm(
    params: {
      /** requestBody */
      body?: ResetPasswordDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/account/resetPassword/confirm';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class TariffService {
  /**
   *
   */
  allTariff(options: IRequestOptions = {}): Promise<TariffDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/tariff/tariff/allTariff';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export interface ControllerInterfaceApiDescriptionModel {
  /**  */
  type?: string;
}

export interface MethodParameterApiDescriptionModel {
  /**  */
  name?: string;

  /**  */
  typeAsString?: string;

  /**  */
  type?: string;

  /**  */
  typeSimple?: string;

  /**  */
  isOptional?: boolean;

  /**  */
  defaultValue?: any | null;
}

export interface ParameterApiDescriptionModel {
  /**  */
  nameOnMethod?: string;

  /**  */
  name?: string;

  /**  */
  type?: string;

  /**  */
  typeSimple?: string;

  /**  */
  isOptional?: boolean;

  /**  */
  defaultValue?: any | null;

  /**  */
  constraintTypes?: string[];

  /**  */
  bindingSourceId?: string;

  /**  */
  descriptorName?: string;
}

export interface ReturnValueApiDescriptionModel {
  /**  */
  type?: string;

  /**  */
  typeSimple?: string;
}

export interface ActionApiDescriptionModel {
  /**  */
  uniqueName?: string;

  /**  */
  name?: string;

  /**  */
  httpMethod?: string;

  /**  */
  url?: string;

  /**  */
  supportedVersions?: string[];

  /**  */
  parametersOnMethod?: MethodParameterApiDescriptionModel[];

  /**  */
  parameters?: ParameterApiDescriptionModel[];

  /**  */
  returnValue?: ReturnValueApiDescriptionModel;
}

export interface ControllerApiDescriptionModel {
  /**  */
  controllerName?: string;

  /**  */
  type?: string;

  /**  */
  interfaces?: ControllerInterfaceApiDescriptionModel[];

  /**  */
  actions?: object;
}

export interface ModuleApiDescriptionModel {
  /**  */
  rootPath?: string;

  /**  */
  remoteServiceName?: string;

  /**  */
  controllers?: object;
}

export interface PropertyApiDescriptionModel {
  /**  */
  name?: string;

  /**  */
  type?: string;

  /**  */
  typeSimple?: string;
}

export interface TypeApiDescriptionModel {
  /**  */
  baseType?: string;

  /**  */
  isEnum?: boolean;

  /**  */
  enumNames?: string[];

  /**  */
  enumValues?: any | null[];

  /**  */
  genericArguments?: string[];

  /**  */
  properties?: PropertyApiDescriptionModel[];
}

export interface ApplicationApiDescriptionModel {
  /**  */
  modules?: object;

  /**  */
  types?: object;
}

export interface RemoteServiceValidationErrorInfo {
  /**  */
  message?: string;

  /**  */
  members?: string[];
}

export interface RemoteServiceErrorInfo {
  /**  */
  code?: string;

  /**  */
  message?: string;

  /**  */
  details?: string;

  /**  */
  data?: object;

  /**  */
  validationErrors?: RemoteServiceValidationErrorInfo[];
}

export interface RemoteServiceErrorResponse {
  /**  */
  error?: RemoteServiceErrorInfo;
}

export interface LanguageInfo {
  /**  */
  cultureName?: string;

  /**  */
  uiCultureName?: string;

  /**  */
  displayName?: string;

  /**  */
  flagIcon?: string;
}

export interface DateTimeFormatDto {
  /**  */
  calendarAlgorithmType?: string;

  /**  */
  dateTimeFormatLong?: string;

  /**  */
  shortDatePattern?: string;

  /**  */
  fullDateTimePattern?: string;

  /**  */
  dateSeparator?: string;

  /**  */
  shortTimePattern?: string;

  /**  */
  longTimePattern?: string;
}

export interface CurrentCultureDto {
  /**  */
  displayName?: string;

  /**  */
  englishName?: string;

  /**  */
  threeLetterIsoLanguageName?: string;

  /**  */
  twoLetterIsoLanguageName?: string;

  /**  */
  isRightToLeft?: boolean;

  /**  */
  cultureName?: string;

  /**  */
  name?: string;

  /**  */
  nativeName?: string;

  /**  */
  dateTimeFormat?: DateTimeFormatDto;
}

export interface NameValue {
  /**  */
  name?: string;

  /**  */
  value?: string;
}

export interface ApplicationLocalizationConfigurationDto {
  /**  */
  values?: object;

  /**  */
  languages?: LanguageInfo[];

  /**  */
  currentCulture?: CurrentCultureDto;

  /**  */
  defaultResourceName?: string;

  /**  */
  languagesMap?: object;

  /**  */
  languageFilesMap?: object;
}

export interface ApplicationAuthConfigurationDto {
  /**  */
  policies?: object;

  /**  */
  grantedPolicies?: object;
}

export interface ApplicationSettingConfigurationDto {
  /**  */
  values?: object;
}

export interface CurrentUserDto {
  /**  */
  isAuthenticated?: boolean;

  /**  */
  id?: string;

  /**  */
  tenantId?: string;

  /**  */
  userName?: string;

  /**  */
  name?: string;

  /**  */
  surName?: string;

  /**  */
  email?: string;

  /**  */
  emailVerified?: boolean;

  /**  */
  phoneNumber?: string;

  /**  */
  phoneNumberVerified?: boolean;

  /**  */
  roles?: string[];
}

export interface ApplicationFeatureConfigurationDto {
  /**  */
  values?: object;
}

export interface MultiTenancyInfoDto {
  /**  */
  isEnabled?: boolean;
}

export interface CurrentTenantDto {
  /**  */
  id?: string;

  /**  */
  name?: string;

  /**  */
  isAvailable?: boolean;
}

export interface IanaTimeZone {
  /**  */
  timeZoneName?: string;
}

export interface WindowsTimeZone {
  /**  */
  timeZoneId?: string;
}

export interface TimeZone {
  /**  */
  iana?: IanaTimeZone;

  /**  */
  windows?: WindowsTimeZone;
}

export interface TimingDto {
  /**  */
  timeZone?: TimeZone;
}

export interface ClockDto {
  /**  */
  kind?: string;
}

export interface LocalizableStringDto {
  /**  */
  name?: string;

  /**  */
  resource?: string;
}

export interface ExtensionPropertyApiGetDto {
  /**  */
  isAvailable?: boolean;
}

export interface ExtensionPropertyApiCreateDto {
  /**  */
  isAvailable?: boolean;
}

export interface ExtensionPropertyApiUpdateDto {
  /**  */
  isAvailable?: boolean;
}

export interface ExtensionPropertyApiDto {
  /**  */
  onGet?: ExtensionPropertyApiGetDto;

  /**  */
  onCreate?: ExtensionPropertyApiCreateDto;

  /**  */
  onUpdate?: ExtensionPropertyApiUpdateDto;
}

export interface ExtensionPropertyUiTableDto {
  /**  */
  isVisible?: boolean;
}

export interface ExtensionPropertyUiFormDto {
  /**  */
  isVisible?: boolean;
}

export interface ExtensionPropertyUiDto {
  /**  */
  onTable?: ExtensionPropertyUiTableDto;

  /**  */
  onCreateForm?: ExtensionPropertyUiFormDto;

  /**  */
  onEditForm?: ExtensionPropertyUiFormDto;
}

export interface ExtensionPropertyAttributeDto {
  /**  */
  typeSimple?: string;

  /**  */
  config?: object;
}

export interface ExtensionPropertyDto {
  /**  */
  type?: string;

  /**  */
  typeSimple?: string;

  /**  */
  displayName?: LocalizableStringDto;

  /**  */
  api?: ExtensionPropertyApiDto;

  /**  */
  ui?: ExtensionPropertyUiDto;

  /**  */
  attributes?: ExtensionPropertyAttributeDto[];

  /**  */
  configuration?: object;

  /**  */
  defaultValue?: any | null;
}

export interface EntityExtensionDto {
  /**  */
  properties?: object;

  /**  */
  configuration?: object;
}

export interface ModuleExtensionDto {
  /**  */
  entities?: object;

  /**  */
  configuration?: object;
}

export interface ExtensionEnumFieldDto {
  /**  */
  name?: string;

  /**  */
  value?: any | null;
}

export interface ExtensionEnumDto {
  /**  */
  fields?: ExtensionEnumFieldDto[];

  /**  */
  localizationResource?: string;
}

export interface ObjectExtensionsDto {
  /**  */
  modules?: object;

  /**  */
  enums?: object;
}

export interface ApplicationConfigurationDto {
  /**  */
  localization?: ApplicationLocalizationConfigurationDto;

  /**  */
  auth?: ApplicationAuthConfigurationDto;

  /**  */
  setting?: ApplicationSettingConfigurationDto;

  /**  */
  currentUser?: CurrentUserDto;

  /**  */
  features?: ApplicationFeatureConfigurationDto;

  /**  */
  multiTenancy?: MultiTenancyInfoDto;

  /**  */
  currentTenant?: CurrentTenantDto;

  /**  */
  timing?: TimingDto;

  /**  */
  clock?: ClockDto;

  /**  */
  objectExtensions?: ObjectExtensionsDto;
}

export interface AuthenticateInput {
  /**  */
  usernameOrEmail: string;

  /**  */
  password: string;
}

export interface AuthenticateResult {
  /**  */
  accessToken?: string;

  /**  */
  expireInSeconds?: number;
}

export interface ProfileDto {
  /**  */
  extraProperties?: object;

  /**  */
  userName?: string;

  /**  */
  email?: string;

  /**  */
  name?: string;

  /**  */
  surname?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  isExternal?: boolean;

  /**  */
  hasPassword?: boolean;
}

export interface UpdateProfileDto {
  /**  */
  extraProperties?: object;

  /**  */
  userName?: string;

  /**  */
  email?: string;

  /**  */
  name?: string;

  /**  */
  surname?: string;

  /**  */
  phoneNumber?: string;
}

export interface ChangePasswordInput {
  /**  */
  currentPassword?: string;

  /**  */
  newPassword: string;
}

export interface LookupTenantByNameInput {
  /**  */
  tenancyName: string;
}

export interface LookupTenantByNameResult {
  /**  */
  success?: boolean;

  /**  */
  tenantId?: string;
}

export interface RegisterTenantInput {
  /**  */
  extraProperties?: object;

  /**  */
  name: string;

  /**  */
  adminEmailAddress: string;

  /**  */
  adminPassword: string;
}

export interface RegisterAdminTokenDto {
  /**  */
  accessToken?: string;
}

export interface TenantDto {
  /**  */
  extraProperties?: object;

  /**  */
  id?: string;

  /**  */
  name?: string;
}

export interface RegisterTenantResult {
  /**  */
  adminToken?: RegisterAdminTokenDto;

  /**  */
  tenant?: TenantDto;
}

export interface SendPasswordResetCodeInput {
  /**  */
  email: string;

  /**  */
  appName: string;

  /**  */
  returnUrl?: string;

  /**  */
  returnUrlHash?: string;
}

export interface ResetPasswordDto {
  /**  */
  userId?: string;

  /**  */
  resetToken: string;

  /**  */
  password: string;
}

export interface TariffDto {
  /**  */
  name?: string;
}

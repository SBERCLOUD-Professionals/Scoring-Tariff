/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseHttpErrorByMessage = (response: any) => {
  const data = response.data;
  if (data && data.error) {
    if (typeof data.error === 'string') {
      return data.error;
    }
    if (data.error['message']) {
      return data.error['message'];
    }
    if (data.error['details']) {
      return data.error['details'];
    }
  }
  return undefined;
}

const prettyHttpError = (error: any): string => {

  if (typeof error === "string") {
    return error;
  }

  console.debug(error.response || error);
  switch (error.response?.status) {
    case 400: // Bad Request
    case 401: // Unauthorized
    case 403: // Forbidden (access denied)
    case 404: // Not Found
      return parseHttpErrorByMessage(error.response) || 'Синтаксическая ошибка в запросе.';
    case 500: // Internal Server FormError
      return parseHttpErrorByMessage(error.response) || 'Внутренняя ошибка сервера';
    case 502: // Bad Gateway
      return 'Сервис временно недоступен. Попробуйте повторить позже.';
    case 503: // Service Unavailable
      return 'Сервис недоступен';
    case 504: // Gateway Timeout
      return 'Сервис не отвечает';
    case 520: // Unknown FormError («неизвестная ошибка»)
      return 'Неизвестная ошибка';
    default:
      return 'Произошла непредвиденная ошибка';
  }
};

const prettyValidationError = (error: any): string => {

  if (typeof error === "string") {
    return error;
  }

  const firstErrorKey = Object.keys(error).find(key => error.hasOwnProperty(key) && !!error[key]);
  return firstErrorKey ? error[firstErrorKey] : undefined;
};

const prettyFormError = (error: any): string => {

  if (typeof error === "string") {
    return error;
  }

  const firstErrorKey = Object.keys(error).find(key => error.hasOwnProperty(key) && !!error[key]);
  return firstErrorKey ? error[firstErrorKey] : undefined;
};

export const errorUtils = {
  prettyHttpError,
  prettyFormError,
  prettyValidationError
};

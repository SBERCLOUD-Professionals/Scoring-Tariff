import {FORM_ERROR} from 'final-form'
import {errorUtils} from "@common/utils/error.utils";

interface FormError {
  [FORM_ERROR]?: string;
}

export class FormResult<TResult, TError extends FormError | any> {

  private constructor(
    public readonly result?: TResult,
    public readonly error?: Record<Partial<keyof TError>, string>) {
  }

  public static success<TResult extends any, TError extends FormError | any>(result: TResult): FormResult<TResult, TError> {
    return new FormResult<TResult, TError>(result, undefined);
  }

  public static inputsError<TResult extends any, TError extends FormError | any>(error?: Record<Partial<keyof TError>, string>): FormResult<TResult, TError> {
    return new FormResult<TResult, TError>(undefined, error);
  }

  public static formError<TResult extends any, TError extends FormError | any>(error?: any): FormResult<TResult, TError> {
    return new FormResult<TResult, TError>(undefined, {[FORM_ERROR]: errorUtils.prettyHttpError(error)} as any);
  }
}
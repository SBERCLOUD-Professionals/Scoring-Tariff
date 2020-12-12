import {Instance, types} from 'mobx-state-tree';

export enum SnackbarVariantEnum {
  default = 'default',
  secondary = 'secondary',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export const SnackbarModel = types.model({
  key: types.identifier,
  message: types.optional(types.string, 'Что-то пошло не так...'),
  variant: types.enumeration<SnackbarVariantEnum>(Object.values(SnackbarVariantEnum)),
  persist: types.optional(types.boolean, false),
  delay: types.optional(types.number, 8000),
  cancel: types.optional(types.boolean, false),
});

export interface ISnackbarModel extends Instance<typeof SnackbarModel> {
}

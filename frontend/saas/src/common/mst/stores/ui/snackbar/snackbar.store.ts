import {values} from 'mobx';
import {Instance, types} from 'mobx-state-tree';
import {ISnackbarModel, SnackbarModel, SnackbarVariantEnum,} from './snackbar.model';
import {errorUtils} from "@common/utils/error.utils";
import {commonUtils} from "@common/utils/common.utils";

export const SnackbarStore = types.model('SnackbarStore', {
  itemsMap: types.optional(types.map(SnackbarModel), {}),
}).actions((self) => {
  const actions = {
    addSnackbar({key, ...snackbarProps}: ISnackbarModel) {
      self.itemsMap.put({
        key: `${commonUtils.hashCode(snackbarProps.message)}`,
        ...snackbarProps,
      });
    },
    removeSnackbar(key: string) {
      self.itemsMap.delete(key);
    },
    addInfoMessage(message: string) {
      const payload = {
        message,
        variant: SnackbarVariantEnum.warning,
      } as ISnackbarModel;
      actions.addSnackbar(payload);
    },
    addSuccessMessage(message: string) {
      const payload = {
        message,
        variant: SnackbarVariantEnum.success,
      } as ISnackbarModel;
      actions.addSnackbar(payload);
    },
    addErrorMessage(error: any, needPretty = true) {
      const payload = {
        message: needPretty ? errorUtils.prettyHttpError(error) : error || undefined,
        variant: SnackbarVariantEnum.error,
      } as ISnackbarModel;
      actions.addSnackbar(payload);
    },
  };
  return actions;
}).views((self) => ({
  get items(): ISnackbarModel[] {
    return (values(self.itemsMap) as unknown) as ISnackbarModel[];
  },
}));

export interface ISnackbarStore extends Instance<typeof SnackbarStore> {
}

import {getRoot, Instance, types} from 'mobx-state-tree';
import {errorUtils} from "@common/utils/error.utils";

export const LoadStore = types.model({
  loading: types.optional(types.boolean, false),
  error: types.maybeNull(types.string),
}).actions((self) => {
  const actions = {
    startLoading() {
      self.loading = true;
      self.error = null;
    },
    setError(error: any, notify: boolean = true) {
      self.error = error ? errorUtils.prettyHttpError(error) : null;
      if (notify && self.error) actions.snackbarError();
    },
    endLoading() {
      self.loading = false;
    },
    reset() {
      self.loading = false;
      self.error = null;
    },
    snackbarError() {
      const {ui: {snackbarStore}} = getRoot(self);
      snackbarStore.addErrorMessage(self.error, false);
    },
  };
  return actions;
});

export interface ILoadStore extends Instance<typeof LoadStore> {
}

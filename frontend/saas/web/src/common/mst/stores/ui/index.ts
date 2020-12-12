import {Instance, types} from "mobx-state-tree";
import {SnackbarStore} from "@common/mst/stores/ui/snackbar";

export const UIStore = types.model("UIStore", {
  snackbarStore: types.optional(SnackbarStore, {}),
});

export interface IUIStore extends Instance<typeof UIStore> {
}
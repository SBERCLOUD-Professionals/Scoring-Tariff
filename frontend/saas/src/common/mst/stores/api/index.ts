import {Instance, types} from "mobx-state-tree";
import {ITariffStore, TariffStore} from "@common/mst/stores/api/tariff";

export const ApiStore = types.model("ApiStore", {
  tariffStore: types.optional(TariffStore, {} as ITariffStore),
});

export interface IApiStore extends Instance<typeof ApiStore> {

}
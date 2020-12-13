import {flow, getEnv, Instance, types} from "mobx-state-tree";
import {ILoadStore, LoadStore} from "@common/mst/stores/shared/load.store";
import {IRootEnv} from "@common/mst/env";
import {TariffModel} from "@common/mst/stores/api/tariff/tariff.model";

export const TariffStore = types.model("TariffStore", {
  items: types.optional(types.array(TariffModel), []),
  fetchState: types.optional(LoadStore, {loading: true} as ILoadStore),
}).actions(self => {
  return ({
    fetchItems: flow(function* (): Generator<any, any, any> {
      try {
        self.fetchState.startLoading();
        const {apiProvider} = getEnv<IRootEnv>(self).providers;
        const tariff = yield apiProvider.tariffService.allTariff();
        console.log(tariff);
        self.items = tariff as any;
      } catch (e) {
        self.fetchState.setError(e);
      } finally {
        self.fetchState.endLoading();
      }
    }),
  });
});

export interface ITariffStore extends Instance<typeof TariffStore> {
}
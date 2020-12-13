import {Instance, types} from "mobx-state-tree";

export const FeatureModel = types.model('FeatureModel', {
  id: types.identifier,
  name: types.string,
  sku: types.string,
});

export const TariffFeatureModel = types.model('TariffFeatureModel', {
  id: types.identifier,
  count: types.number,
  feature: FeatureModel,
});

export const TariffModel = types.model('TariffModel', {
  id: types.identifier,
  name: types.string,
  tariffFeatures: types.optional(types.array(TariffFeatureModel), [])
}).views(self => {
  return {};
});

export interface ITariffModel extends Instance<typeof TariffModel> {

}


export interface ITariffFeatureModel extends Instance<typeof TariffFeatureModel> {

}

export interface IFeatureModel extends Instance<typeof FeatureModel> {

}
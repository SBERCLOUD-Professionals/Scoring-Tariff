import {Instance, types} from "mobx-state-tree";

export const SessionInfoModel = types.model('SessionInfoModel', {
  application: types.optional(types.string, "app"),
  name: types.string,
  roles: types.optional(types.array(types.string), [])
}).views(self => {
  return {};
});

export interface ISessionInfoModel extends Instance<typeof SessionInfoModel> {

}
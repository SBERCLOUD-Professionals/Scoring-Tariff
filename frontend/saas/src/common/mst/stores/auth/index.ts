import {Instance, types} from "mobx-state-tree";
import {ISessionStore, SessionStore} from "@common/mst/stores/auth/session";

export const AuthStore = types.model("AuthStore", {
  sessionStore: types.optional(SessionStore, {} as ISessionStore),
});

export interface IAuthStore extends Instance<typeof AuthStore> {

}
import {flow, getEnv, Instance, types} from "mobx-state-tree";
import {ILoadStore, LoadStore} from "@common/mst/stores/shared/load.store";
import {ILoginInput, IRegisterInput} from "@common/mst/stores/auth/_inputs";
import {SessionInfoModel} from "@common/mst/stores/auth/session/sessionInfo.model";
import {FormResult} from "@common/mst/stores/shared/_results";
import {IRootEnv} from "@common/mst/env";
import {AuthContext} from "@common/mst/env/providers/auth.provider";
import {envUtils} from "@common/utils/env.utils";

export const SessionStore = types.model("SessionStore", {
  tenantId: types.optional(types.maybeNull(types.number), null),
  info: types.maybeNull(SessionInfoModel),

  updateInfoState: types.optional(LoadStore, {} as ILoadStore),
}).actions(self => {

  function setUserInfoFromAuthContext(authContext: AuthContext) {
    const info = authContext.getUserInfo();
    self.info = SessionInfoModel.create({
      name: info.name,
      roles: info.roles
    })
  }

  const actions = {

    afterCreate() {
      if(envUtils.isServer()) return;
      actions.initialize();
    },

    initialize(ctx?: any): AuthContext | undefined {
      const {authProvider} = getEnv<IRootEnv>(self).providers;
      const authContext = authProvider.initialize(ctx);
      if (authContext) setUserInfoFromAuthContext(authContext);

      return authContext;
    },
    login: flow(function* (input: ILoginInput): Generator<any, FormResult<boolean, ILoginInput>, any> {
      try {
        const {authProvider} = getEnv<IRootEnv>(self).providers;
        const result: AuthContext = yield authProvider.login({
          usernameOrEmail: input.email,
          password: input.password
        });
        setUserInfoFromAuthContext(result);
        return FormResult.success(true);
      } catch (e) {
        return FormResult.formError(e);
      }
    }),
    register: flow(function* (input: IRegisterInput): Generator<any, FormResult<boolean, IRegisterInput>, any> {
      try {
        const {authProvider} = getEnv<IRootEnv>(self).providers;
        const result: AuthContext = yield authProvider.register({
          name: input.tenant,
          adminEmailAddress: input.adminEmail,
          adminPassword: input.adminPassword,
        });
        setUserInfoFromAuthContext(result);
        return FormResult.success(true);
      } catch (e) {
        return FormResult.formError(e);
      }
    }),
    updateInfo: flow(function* () {
      try {
        self.updateInfoState.startLoading();
        return true;
      } catch (e) {
        self.updateInfoState.setError(e);
        return false;
      } finally {
        self.updateInfoState.endLoading();
      }
    }),
    logout: flow(function* (): Generator<any, any, any> {
      const {authProvider} = getEnv<IRootEnv>(self).providers;
      yield authProvider.logout();
      self.info = null;
    })
  };

  return actions;
}).views(self => ({
  get authenticated(): boolean {
    return !!self.info;
  }
}));

export interface ISessionStore extends Instance<typeof SessionStore> {
}
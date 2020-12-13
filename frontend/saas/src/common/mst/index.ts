import {createContext} from 'react';
import {applySnapshot, Instance, onSnapshot, types} from "mobx-state-tree";
import {AuthStore} from "@common/mst/stores/auth";
import {UIStore} from "@common/mst/stores/ui";
import {enableStaticRendering} from 'mobx-react';
import createRootEnv from "@common/mst/env";
import {envUtils} from "@common/utils/env.utils";
import {ApiStore} from "@common/mst/stores/api";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(envUtils.isServer());

const RootStore = types.model({
  api: ApiStore,
  auth: AuthStore,
  ui: UIStore,
});

let rootStore: IRootStore;

export const initializeRootStore = (appSnapshot: any = null) => {
  const _rootStore = rootStore ?? RootStore.create({
    api: {},
    auth: {},
    ui: {},
  }, createRootEnv());
  // If your page has Next.js data fetching methods that use a Mobx _rootStore, it will
  // get hydrated here, check
  // https://github.com/zeit/next.js/blob/canary/examples/with-mobx-state-tree-typescript/pages/ssr.tsx
  // for more details
  if (appSnapshot) {
    applySnapshot(_rootStore, appSnapshot);
  }

  // Create the _rootStore once in the client
  if (!rootStore) {
    rootStore = _rootStore;
    if (envUtils.isClient() && envUtils.isDevelopment()) {
      onSnapshot(rootStore, snapshot => console.debug("Snapshot: ", snapshot));
    }
  }

  return rootStore;
};

export interface IRootStore extends Instance<typeof RootStore> {
}

export const RootStoreContext = createContext<null | IRootStore>(null);
export const MstProvider = RootStoreContext.Provider;
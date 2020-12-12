import '../../styles/globals.scss'
import {AppContext, AppProps} from "next/app";
import {CssBaseline} from "@geist-ui/react";
import React, {useEffect, useMemo} from "react";
import ThemeProvider from "@common/theme/ThemeProvider";
import {initializeRootStore, MstProvider} from "@common/mst";
import Notifier from "@common/components/Notifier";
import {configureFormValidationMessages} from "@common/form";
import {envUtils} from "@common/utils/env.utils";
import {getSnapshot} from "mobx-state-tree";
import {APP_HOME_ROUTE, APP_PATH, LOGIN_ROUTE, REGISTER_ROUTE} from "@common/routes";
import {routerUtils} from "@common/utils/router.utils";

configureFormValidationMessages();

interface CustomAppProps extends AppProps {
  initialStoreState?: any;
}


const App: React.FC<CustomAppProps> = ({Component, initialStoreState, pageProps}) => {

  const rootStore = useMemo(() => initializeRootStore(initialStoreState), [initialStoreState]);
  const getLayout = useMemo(() => (Component as any).getLayout || ((page: any) => page), [Component]);

  useEffect(() => {
    const style = document.getElementById('server-side-styles')
    if (style?.parentNode) style.parentNode.removeChild(style);
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline/>
      <MstProvider value={rootStore}>
        {getLayout(<Component {...pageProps}/>)}
        <Notifier/>
      </MstProvider>
    </ThemeProvider>
  );
};

(App as any).getInitialProps = (appCtx: AppContext) => {

  let initialStoreState: any;
  let appProps = {} as CustomAppProps;
  const href = appCtx.ctx.pathname;

  const rootStore = initializeRootStore();
  if (envUtils.isServer()) {
    rootStore.auth.sessionStore.initialize(appCtx.ctx);
    initialStoreState = getSnapshot(rootStore);
  }

  if (initialStoreState) {
    appProps.initialStoreState = initialStoreState;
  }

  console.log(rootStore.auth.sessionStore.authenticated);
  if (rootStore.auth.sessionStore.authenticated) {
    // отправляем на страницу app
    if (href.startsWith(LOGIN_ROUTE) || href.startsWith(REGISTER_ROUTE)) {
      routerUtils.redirect(APP_HOME_ROUTE, undefined, appCtx.ctx);
    }
  } else {
    // отправляем на страницу логина
    if (href.startsWith(APP_PATH)) {
      routerUtils.redirect(LOGIN_ROUTE, undefined, appCtx.ctx);
    }
  }

  return appProps;
}

export default App;


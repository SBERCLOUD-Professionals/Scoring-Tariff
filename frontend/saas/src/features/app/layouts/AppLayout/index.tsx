import React, {useEffect, useState} from 'react';
import {Page} from "@geist-ui/react";
import AppHeader from "./AppHeader";
import {useRouter} from "next/router";
import AppPageLoader from "./AppPageLoader";
import {AppTheme} from "@common/theme";
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles((theme: AppTheme) => ({
  content: (isLoading) => {
    return ({
      ...theme.layout.templates.flexColumn(),
      ...theme.layout.templates.flexGrow(),
      ...theme.layout.templates.flexNoWrap(),
      marginTop: -40,
      opacity: isLoading ? 0 : 1
    });
  }
}));

interface Props {
}

const AppLayout: React.FC<Props> = ({children}) => {


  // indicates if the loading indicator should appear
  const [isLoading, setIsLoading] = useState(false)
  // used to inform the Header about route changes
  const [routerEventPath, setRouterEventPath] = useState<string | undefined>()
  // used to listen to events
  const {events} = useRouter();
  const classes = useStyles(isLoading);

  useEffect(() => {

    /** Informs about the beginning of a route change */
    const handleStart = (url: string) => {
      setRouterEventPath(url)
      setIsLoading(true)
    }

    /** Informs about the ending of a route change */
    const handleEnd = () => {
      setRouterEventPath(undefined)
      setIsLoading(false)
    }

    // adds listeners to route events
    events.on("routeChangeStart", handleStart)
    events.on("routeChangeComplete", handleEnd)
    events.on("routeChangeError", handleEnd)

    // removes listeners to route events
    return () => {
      events.off("routeChangeStart", handleStart)
      events.off("routeChangeComplete", handleEnd)
      events.off("routeChangeError", handleEnd)
    }
  }, [])

  return (
    <Page size={"small"} className={"page"} key={"app_page"}>
      {/** page header and background */}
      <Page.Header className={"page_header"}>
        <AppHeader routerEventPath={routerEventPath}/>
      </Page.Header>
      <Page.Content className={"page_content"}>
        {/** show loading indicator on route changes */}
        <AppPageLoader isLoading={isLoading}/>
        {/** common content */}
        <div className={classes.content}>
          {children}
        </div>
      </Page.Content>
    </Page>
  );
};

export default AppLayout;
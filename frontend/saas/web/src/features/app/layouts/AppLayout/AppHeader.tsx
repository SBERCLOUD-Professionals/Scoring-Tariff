import React, {createRef, useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {Tabs} from "@geist-ui/react";
import {APP_HOME_ROUTE, APP_SETTINGS_ROUTE} from "@common/routes";
import {AppTheme} from "@common/theme";
import {createUseStyles} from 'react-jss';
import AppHeaderPopover from "@app/layouts/AppLayout/AppHeaderPopover";

const useStyles = createUseStyles((theme: AppTheme) => ({
  root: {
    overflow: "hidden",
    backdropFilter: "blur(20px)",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100
  },
  infoContainer: {
    ...theme.layout.templates.flexRow(),
    paddingTop: 14,
    paddingBottom: 6,
  },
  logoButton: {
    border: "none",
    padding: 0,
    background: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  content: {
    width: "calc(750pt - 100pt)",
    maxWidth: "100vw",
    margin: "0 auto",
    padding: "0 16pt",
    boxSizing: "border-box"
  },
  grow: {
    ...theme.layout.templates.flexGrow()
  }
}));

interface Props {
  routerEventPath?: string
}

/**
 * Calculates the base path to highlight
 * its tab in the header
 * @example "/blog/article" becomes "/blog"
 * @param fullPath Current path from Router
 * @returns Base path
 */
// const calculateBase = (fullPath: string) => `/${fullPath.split("/")[1]}`
const calculateBase = (fullPath: string) => fullPath

const AppHeader: React.FC<Props> = ({routerEventPath}) => {

  const classes = useStyles();
  const {pathname, push} = useRouter()
  const [path, setPath] = useState(pathname)
  const [basePath, setBasePath] = useState(calculateBase(pathname))
  const headerRef = createRef<HTMLDivElement>()

  // used to switch to the selected tab
  useEffect(() => {
    if (pathname !== path) push(path).then()
  }, [path])

  // used to react to router events between route changes
  useEffect(() => {
    if (routerEventPath) setBasePath(calculateBase(routerEventPath))
    else {
      setPath(pathname)
      setBasePath(calculateBase(pathname))
    }
  }, [routerEventPath])

  // used to remove empty space under the tabs
  useEffect(() => {
    const ref = headerRef.current
    if (!ref) return
    // const content = ref.querySelector(".content")
    // if (content) content.remove()
  }, [headerRef])

  // used to highlight the selected tab from router change
  useEffect(() => {
    setPath(pathname)
    setBasePath(calculateBase(pathname))
  }, [pathname])

  const handleChangeTab = useCallback((value: string) => {
    setPath(value);
  }, [setPath]);

  const handleLogo = useCallback(() => {
    setPath(APP_HOME_ROUTE);
  }, [setPath]);

  return (
    <div className={classes.root} ref={headerRef}>
      <div className={classes.content}>
        <div className={classes.infoContainer}>
          <button onClick={handleLogo} className={classes.logoButton}>
            <img src={require("@common/assets/images/logo.svg")} height={36} alt="Logo"/>
          </button>
          <div className={classes.grow} />
          <AppHeaderPopover/>
        </div>
        <Tabs value={basePath} onChange={handleChangeTab}>
          <Tabs.Item label="Главная" value={APP_HOME_ROUTE}/>
          <Tabs.Item label="Настройки" value={APP_SETTINGS_ROUTE}/>
        </Tabs>
      </div>
    </div>
  );
};

export default AppHeader;
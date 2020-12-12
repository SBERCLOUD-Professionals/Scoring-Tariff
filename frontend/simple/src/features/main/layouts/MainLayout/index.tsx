import React from 'react';
import {Page} from "@geist-ui/react";
import MainHeader from "./MainHeader";
import {AppTheme} from "@common/theme";
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles((theme: AppTheme) => ({
  content: {
    ...theme.layout.templates.flexColumn(),
    ...theme.layout.templates.flexGrow(),
    ...theme.layout.templates.flexNoWrap(),
    marginTop: -60
  }
}));

interface Props {
}

const AppLayout: React.FC<Props> = ({children}) => {
  const classes = useStyles();
  return (
    <Page size={"small"} className={"page"} key={"app_page"}>
      <Page.Header className={"page_header"}>
        <MainHeader/>
      </Page.Header>
      <Page.Content className={"page_content"}>
        <div className={classes.content}>
          {children}
        </div>
      </Page.Content>
    </Page>
  );
};

export default AppLayout;
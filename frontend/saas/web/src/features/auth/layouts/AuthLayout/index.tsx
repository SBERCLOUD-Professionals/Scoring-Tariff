import React from 'react';
import {Page} from "@geist-ui/react";
import {createUseStyles} from "react-jss";
import {AppTheme} from "@common/theme";

const useStyles = createUseStyles((theme: AppTheme) => ({
  footer: {
    ...theme.layout.templates.flexColumn()
  }
}));

interface Props {
  FooterComponent?: React.ReactComponentElement<any> | any
}

const AuthLayout: React.FC<Props> = ({children, FooterComponent}) => {
  const classes = useStyles();
  return (
    <Page size={"small"} className={"page"} key={"app_page"}>
      <Page.Content className={"page_content"}>
        {children}
      </Page.Content>
      {FooterComponent && (<Page.Footer className={classes.footer}><FooterComponent/></Page.Footer>)}
    </Page>
  );
};

export default AuthLayout;
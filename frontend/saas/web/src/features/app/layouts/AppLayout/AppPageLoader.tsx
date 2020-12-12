import React from 'react';
import {Spinner} from "@geist-ui/react";
import {AppTheme} from "@common/theme";
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles((theme: AppTheme) => ({
  root: (isLoading) => ({
    ...theme.layout.templates.flexColumn(),
    ...theme.layout.templates.flexCenter(),
    ...theme.layout.templates.flexGrow(),
    zIndex: 0,
    display: isLoading ? "flex" : "none",
    opacity: isLoading ? 1 : 0,
  })
}));

interface Props {
  isLoading?: boolean
}

const AppPageLoader: React.FC<Props> = ({isLoading}) => {
  const classes = useStyles(isLoading);
  return (
    <div className={classes.root}>
      <Spinner size="large"/>
    </div>
  );
};

export default AppPageLoader;
import React, {useMemo} from 'react';
import {GeistProvider, useTheme} from "@geist-ui/react";
import {ThemeProvider as ReactJssThemeProvider} from "react-jss"
import createAppTheme from "@common/theme/createAppTheme";

const JssThemeProvider: React.FC = ({children}) => {
  const theme = useTheme();
  const appTheme = useMemo(() => createAppTheme(theme), [theme]);

  return (
    <ReactJssThemeProvider key={"ReactJssThemeProvider"} theme={appTheme}>
      {children}
    </ReactJssThemeProvider>
  )
}

const ThemeProvider: React.FC = ({children}) => {

  return (
    <GeistProvider key={"GeistProvider"}>
      <JssThemeProvider key={"JssThemeProvider"}>
        {children}
      </JssThemeProvider>
    </GeistProvider>
  )
};

export default ThemeProvider;
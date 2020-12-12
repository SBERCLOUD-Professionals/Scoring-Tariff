import '../../styles/globals.scss'
import {AppProps} from "next/app";
import {CssBaseline} from "@geist-ui/react";
import React, {useEffect, useMemo} from "react";
import ThemeProvider from "@common/theme/ThemeProvider";
import {EventProvider} from "@common/contexts/eventContext";

const App: React.FC<AppProps> = ({Component, pageProps}) => {

  const getLayout = useMemo(() => (Component as any).getLayout || ((page: any) => page), [Component]);

  useEffect(() => {
    const style = document.getElementById('server-side-styles')
    if (style?.parentNode) style.parentNode.removeChild(style);
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline/>
      <EventProvider>
        {getLayout(<Component {...pageProps}/>)}
      </EventProvider>
    </ThemeProvider>
  );
};

export default App;


import NextDocument, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';
import {CssBaseline} from "@geist-ui/react";
import { SheetsRegistry, JssProvider, createGenerateId } from "react-jss";

class Document extends NextDocument {
  public render() {
    return (
      <Html dir="ltr" lang="ru">
        <Head>
          <meta charSet="utf-8"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

Document.getInitialProps = async (ctx) => {

  // styled-jsx
  const styles = CssBaseline.flush();

  // react-jss
  const registry = new SheetsRegistry();
  const generateId = createGenerateId();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <JssProvider registry={registry} generateId={generateId}>
          <App {...props} />
        </JssProvider>
      ),
    })

  const initialProps = await NextDocument.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        {styles}
        <style id="server-side-styles">{registry.toString()}</style>
      </>
    )
  }
};

export default Document;

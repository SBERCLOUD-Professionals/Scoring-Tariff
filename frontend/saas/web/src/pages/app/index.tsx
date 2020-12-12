import React from 'react';
import {PageFC} from "@common/pages";
import getAppLayout from "@app/layouts/getAppLayout";

interface Props {
}

const App: PageFC<Props> = ({children}) => {
  return (
    <>
      {children}
    </>
  );
};

App.getLayout = getAppLayout;

export default App;
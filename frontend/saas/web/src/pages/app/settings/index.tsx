import React from 'react';
import {Text} from "@geist-ui/react";
import {PageFC} from "@common/pages";
import getAppLayout from "@app/layouts/getAppLayout";

interface Props {
}

const Settings: PageFC<Props> = (props) => {
  return (
    <>
      <Text h1>Settings</Text>
    </>
  );
};

Settings.getLayout = getAppLayout;

export default Settings;
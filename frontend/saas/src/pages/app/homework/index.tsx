import React from 'react';
import {Text} from "@geist-ui/react";
import getAppLayout from "@app/layouts/getAppLayout";
import {PageFC} from "@common/pages";

interface Props {
}

const Homework: PageFC<Props> = (props) => {
  return (
    <>
      <Text h1>Homework</Text>
    </>
  );
};

Homework.getLayout = getAppLayout;

export default Homework;
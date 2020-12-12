import {PageFC} from "@common/pages";
import getMainLayout from "../features/main/layouts/getMainLayout";
import React from "react";
import { Button } from "@geist-ui/react";
import {useEvent} from "@common/contexts/eventContext";

interface Props {
}

const Index: PageFC<Props> = (props) => {

  const {onEvent} = useEvent();
  const handleClick = ()=> {
    onEvent("Клик");
  }

  return (
    <div>
      <Button type={"success"} onClick={handleClick}>Эвент</Button>
    </div>

  );
};

Index.getLayout = getMainLayout;

export default Index;
import React from 'react';
import {Text} from "@geist-ui/react";
import css from 'styled-jsx/css';

interface Props {
}

const styles = css`
  .root { 
    text-align: center;
  }
`

const Main: React.FC<Props> = (props) => {

  return (
    <div className={"root"}>
      <Text h1 size="4rem">
        The React Framework for Production
      </Text>
      <Text p type={"secondary"} size={"1.5rem"}>
        This is a simulated page, you can click anywhere to close it.
      </Text>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Main;
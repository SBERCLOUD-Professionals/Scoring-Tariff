import React from 'react';
import {Col, Row, Text} from "@geist-ui/react";

interface Props {
}

const Footer: React.FC<Props> = (props) => {
  return (
    <Row gap={.8}>
      <Col><Text small>Ehok</Text></Col>
    </Row>
  )
};

export default Footer;
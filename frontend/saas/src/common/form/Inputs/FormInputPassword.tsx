import React, {useMemo} from 'react';
import {Input} from "@geist-ui/react";
import {FieldRenderProps} from "react-final-form";
import {InputPasswordProps} from "@geist-ui/react/dist/input/password";

interface Props extends FieldRenderProps<any>, InputPasswordProps {
}

const FormInputPassword: React.FC<Props> = ({input, meta, status, password, ...rest}) => {

  const wrapStatus = useMemo(() => status ? status : meta.error && meta.touched ? "error" : "default", [status, meta.error, meta.touched]);

  return (<Input.Password {...input} {...rest} status={wrapStatus}/>);
};

export default FormInputPassword;
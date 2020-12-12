import React, {useMemo} from 'react';
import {Input} from "@geist-ui/react";
import {FieldRenderProps} from "react-final-form";
import {InputProps} from "@geist-ui/react/dist/input/input";

interface Props extends FieldRenderProps<any>, InputProps {
}

const FormInput: React.FC<Props> = ({input, meta, status, required, ...rest}) => {

  const wrapStatus = useMemo(() => status ? status : meta.error && meta.touched ? "error" : "default", [status, meta.error, meta.touched]);

  return (
    <Input
      {...input}
      {...rest}
      required={required}
      status={wrapStatus}
    />
  );
};

export default FormInput;
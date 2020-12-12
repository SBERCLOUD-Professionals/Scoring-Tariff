import React, {useMemo} from 'react';
import {Text} from "@geist-ui/react";
import {errorUtils} from "@common/utils/error.utils";
import {createUseStyles} from "react-jss";
import {AppTheme} from "@common/theme";
import isEmpty from "lodash/isEmpty"

const useStyles = createUseStyles((theme: AppTheme) => ({
  root: {
    minHeight: 36,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: theme.spacing(1, 0)
  },
  text: (hasValidationErrors) => ({
    fontSize: '0.8rem',
    paddingLeft: 12,
    position: 'relative',
    "&:before": {
      content: "''",
      width: "0.5rem",
      height: "0.5rem",
      background: hasValidationErrors ? theme.palette.warning : theme.palette.error,
      position: 'absolute',
      borderRadius: 99,
      left: 0,
      top: 6
    }
  }),
}));

interface Props {
  pristine: boolean;
  submitErrors: any;
  validationErrors: any;
}

const FormError: React.FC<Props> = ({submitErrors, validationErrors, pristine}) => {

  const hasValidationErrors = useMemo(() => !isEmpty(validationErrors), [validationErrors]);
  const classes = useStyles(hasValidationErrors);
  const errorMessage = useMemo(() => {
    if (pristine) return undefined;
    if (hasValidationErrors) return errorUtils.prettyValidationError(validationErrors);
    if (submitErrors) return errorUtils.prettyFormError(submitErrors);
  }, [submitErrors, validationErrors, hasValidationErrors, pristine]);


  return (
    <div className={classes.root}>
      {errorMessage
        ? <Text type={"secondary"} span className={classes.text}>{errorMessage}</Text>
        : null}
    </div>
  )
};

export default FormError;
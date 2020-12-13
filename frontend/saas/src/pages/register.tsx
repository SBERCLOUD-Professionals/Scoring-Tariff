import {Field, Form} from "react-final-form";
import {Button, Card, Spacer, Text} from "@geist-ui/react";
import MailIcon from '@geist-ui/react-icons/mail'
import LockIcon from '@geist-ui/react-icons/lock'
import BoxIcon from '@geist-ui/react-icons/box'
import {PageFC} from "@common/pages";
import getAuthLayout from "@auth/layouts/getAuthLayout";
import {createUseStyles} from "react-jss";
import useRootData from "@common/mst/hooks/useRootData";
import FormError from "@common/form/Inputs/FormError";
import WrapLink from "@common/components/Links/WrapLink";
import FormInput from "@common/form/Inputs/FormInput";
import FormInputPassword from "@common/form/Inputs/FormInputPassword";
import {FormResult} from "@common/mst/stores/shared/_results";
import {AppTheme} from "@common/theme";
import {createFinalFormValidation} from "@lemoncode/fonk-final-form";
import {Validators} from "@lemoncode/fonk";
import {useCallback} from "react";
import {APP_HOME_ROUTE} from "@common/routes";
import {useRouter} from "next/router";

const useStyles = createUseStyles((theme: AppTheme) => ({
  root: {
    ...theme.layout.templates.flexColumn(),
    ...theme.layout.templates.flexCenter(),
    ...theme.layout.templates.flexGrow(),
  },
  content: {
    ...theme.layout.templates.flexColumn(),
    width: "100%",
    maxWidth: 420,
  },
  form: {
    ...theme.layout.templates.flexColumn(),
  },
  footer: {
    alignSelf: 'center',
    padding: theme.spacing(1, 0)
  },
  login: {
    '&:hover': {
      textDecoration: 'underline !important',
    }
  }
}));

interface Props {
}

interface FormValues {
  tenant: string;
  adminEmail: string;
  adminPassword: string;
}

const formValidation = createFinalFormValidation({
  field: {
    tenant: [
      Validators.required.validator,
      {
        validator: Validators.minLength.validator,
        customArgs: {length: 4},
      }
    ],
    adminEmail: [Validators.required.validator, Validators.email.validator],
    adminPassword: [Validators.required.validator]
  }
});

const Register: PageFC<Props> = ({}) => {

  const router = useRouter();
  const classes = useStyles();
  const {sessionStore} = useRootData(store => ({
    sessionStore: store.auth.sessionStore,
    snackbarStore: store.ui.snackbarStore,
  }))

  const handleValidate = useCallback((values: FormValues) => {
    return formValidation.validateForm(values)
  }, []);

  const handleSubmit = useCallback(async (values: FormValues) => {
    const result: FormResult<boolean, any> = await sessionStore.register({
      tenant: values.tenant,
      adminEmail: values.adminEmail,
      adminPassword: values.adminPassword
    });

    if (result.result) {
      router.push(APP_HOME_ROUTE).then();
    } else {
      return result.error;
    }
  }, [sessionStore]);

  return (
    <div className={classes.root}>
      <Text h1>Регистрация в Scoring</Text>
      <div className={classes.content}>
        <Card>
          <Form
            validate={handleValidate}
            onSubmit={handleSubmit}
            render={({handleSubmit, submitting, pristine, invalid, submitErrors, errors}) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Field
                  required
                  name="tenant"
                  component={FormInput}
                  type={"text"}
                  icon={<BoxIcon/>}
                  placeholder={"Название компании"}
                  size={"large"}
                  width={"100%"}
                />
                <Spacer y={.5}/>
                <Field
                  required
                  name="adminEmail"
                  component={FormInput}
                  type={"text"}
                  icon={<MailIcon/>}
                  placeholder={"Введите email"}
                  size={"large"}
                  width={"100%"}
                />
                <Spacer y={.5}/>
                <Field
                  required
                  name="adminPassword"
                  component={FormInputPassword}
                  icon={<LockIcon/>}
                  placeholder={"Введите пароль"}
                  size={"large"}
                  width={"100%"}
                />
                <FormError
                  submitErrors={submitErrors}
                  validationErrors={errors}
                  pristine={pristine}
                />
                <Button
                  disabled={pristine}
                  type={"success"}
                  loading={submitting}
                  htmlType={"submit"}>
                  Зарегистрироваться
                </Button>
              </form>)}>
          </Form>
        </Card>
      </div>
    </div>
  );
};

const RegisterFooter: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Text span type={"secondary"}>
        Есть аккаунт? <WrapLink color className={classes.login} href="/login">Войти</WrapLink>
      </Text>
    </div>
  );
};

Register.getLayout = getAuthLayout(RegisterFooter);

export default Register;
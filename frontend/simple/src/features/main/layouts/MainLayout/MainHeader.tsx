import React, {useEffect, useState} from 'react';
import {APP_HOME_ROUTE} from "@common/routes";
import {AppTheme} from "@common/theme";
import {createUseStyles} from 'react-jss';
import Link from 'next/link';
import {useEvent} from "@common/contexts/eventContext";
import {Button, Input, Spacer, Dot} from "@geist-ui/react";
import KeyIcon from '@geist-ui/react-icons/key'


const useStyles = createUseStyles((theme: AppTheme) => ({
  root: {
    overflow: "hidden",
    backdropFilter: "blur(20px)",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    borderBottom: `1px solid ${theme.palette.border}`
  },
  container: {
    ...theme.layout.templates.flexRow(),
    paddingTop: 14,
    paddingBottom: 6,
    alignItems: "center"
  },
  logoButton: {
    border: "none",
    padding: 0,
    background: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  content: {
    width: "calc(750pt - 100pt)",
    maxWidth: "100vw",
    margin: "0 auto",
    padding: "0 16pt",
    boxSizing: "border-box"
  },
  grow: {
    ...theme.layout.templates.flexGrow()
  }
}));

interface Props {
}

const MainHeader: React.FC<Props> = () => {

  const classes = useStyles();
  const {apiKey, setApiKey, connected} = useEvent();
  const [value, setValue] = useState("");
  const handleChangeValue = (event: any) => {
    setValue(event.target.value);
  }
  const handleSubmit = () => {
    setApiKey(value);
  }

  useEffect(() => {
    if (apiKey) setValue(apiKey);
  }, []);


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.container}>
          <Link href={APP_HOME_ROUTE}>
            <a className={classes.logoButton}>
              <img src={require("@common/assets/images/logo.svg")} height={36} alt="Logo"/>
            </a>
          </Link>
          <Spacer x={2}/>
          <Input
            icon={<KeyIcon />}
            label={"АПИ ключ"}
            placeholder={"Введите значение"}
            onChange={handleChangeValue}
            value={value}
          />
          <Spacer x={0.5}/>
          <Button size={"small"} onClick={handleSubmit} type={"success"}>Сохранить</Button>
          <Spacer className={classes.grow}/>
          <Dot type={connected ? "success" : "default"}>{connected ? "Подключен" : "Не подключен"}</Dot>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
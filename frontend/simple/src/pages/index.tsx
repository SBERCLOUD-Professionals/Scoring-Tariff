import {PageFC} from "@common/pages";
import getMainLayout from "../features/main/layouts/getMainLayout";
import React from "react";
import {Button, Col, Grid, Row} from "@geist-ui/react";
import {useEvent} from "@common/contexts/eventContext";
import {
  AUDIO_FEATURE_EVENT,
  HISTORY_FEATURE_EVENT,
  MESSAGES_FEATURE_EVENT,
  PROJECTS_FEATURE_EVENT,
  SSO_FEATURE_EVENT,
  USERS_FEATURE_EVENT,
  VIDEO_FEATURE_EVENT
} from "@common/contexts/events";
import {createUseStyles} from "react-jss";
import {AppTheme} from "@common/theme";

const useStyles = createUseStyles((theme: AppTheme) => ({
  root: {
    ...theme.layout.templates.flex()
  }
}));

interface Props {
}

const Index: PageFC<Props> = (props) => {

  const classes = useStyles();
  const {onEvent} = useEvent();
  const handleVideoClick = () => {
    onEvent(VIDEO_FEATURE_EVENT);
  }
  const handleAudioClick = () => {
    onEvent(AUDIO_FEATURE_EVENT);
  }
  const handleHistoryClick = () => {
    onEvent(HISTORY_FEATURE_EVENT);
  }
  const handleMessagesClick = () => {
    onEvent(MESSAGES_FEATURE_EVENT);
  }
  const handleUsersClick = () => {
    onEvent(USERS_FEATURE_EVENT);
  }
  const handleProjectsClick = () => {
    onEvent(PROJECTS_FEATURE_EVENT);
  }
  const handleSsoClick = () => {
    onEvent(SSO_FEATURE_EVENT);
  }
  const handleSubmitClick = () => {
  }


  return (
      <Grid.Container gap={2} justify="center" className={classes.root}>
        <Grid xs={6}>
          <Button type={"default"} onClick={handleVideoClick}>Видеозвонок</Button>
        </Grid>
        <Grid xs={6}>
          <Button type={"default"} onClick={handleAudioClick}>Аудиозвонок</Button>
        </Grid>
        <Grid xs={6}>
          <Button type={"default"} onClick={handleMessagesClick}>Страница сообщений</Button>
        </Grid>
        <Grid xs={6}>
          <Button type={"default"} onClick={handleHistoryClick}>Страница истории сообщений</Button>
        </Grid>
        <Grid xs={6}>
          <Button type={"default"} onClick={handleUsersClick}>Страница пользователей</Button>
        </Grid>
        <Grid xs={6}>
          <Button type={"default"} onClick={handleProjectsClick}>Страница проектов</Button>
        </Grid>
        <Grid xs={6}>
          <Button type={"default"} onClick={handleSsoClick}>Настройка SSO</Button>
        </Grid>

        <Grid xs={12}>
          <Button type={"success"} onClick={handleSubmitClick}>Получить тариф</Button>
        </Grid>
      </Grid.Container>
  );
};

Index.getLayout = getMainLayout;

export default Index;
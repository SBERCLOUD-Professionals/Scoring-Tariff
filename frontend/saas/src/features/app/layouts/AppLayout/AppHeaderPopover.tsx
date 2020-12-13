import React, {useCallback, useMemo, useState} from 'react';
import {Popover, User} from '@geist-ui/react';
import useRootData from "@common/mst/hooks/useRootData";
import {AppTheme} from "@common/theme";
import {createUseStyles} from 'react-jss';
import clsx from "clsx";
import {observer} from "mobx-react";
import PopoverButton from "@common/components/Buttons/PopoverButton";
import {useRouter} from "next/router";
import {LOGIN_ROUTE} from "@common/routes";
import {ISessionInfoModel} from "@common/mst/stores/auth/session";

const useStyles = createUseStyles((theme: AppTheme) => ({
  user: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  popover: {
    minWidth: 200
  }
}));

interface AppHeaderPopoverContentProps {
  sessionInfo: ISessionInfoModel;
  logout: () => Promise<any>
}

const AppHeaderPopoverContent: React.FC<AppHeaderPopoverContentProps> = observer(({logout, sessionInfo}) => {

  const router = useRouter();
  const title = useMemo(() => sessionInfo?.name || '', []);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setLogoutLoading(true);
      router.push(LOGIN_ROUTE).then();
    } finally {
      setLogoutLoading(false);
    }
  }, [logout, setLogoutLoading])

  return (
    <>
      <Popover.Item title>
        <span>{title}</span>
      </Popover.Item>
      <PopoverButton
        onClick={handleLogout}
        text={"Выйти"}
        loadingText={"Выхожу"}
        loading={logoutLoading}
      />
    </>
  );
});

interface Props {
  className?: string
}

const AppHeaderPopover: React.FC<Props> = ({className}) => {

  const classes = useStyles();
  const {sessionInfo, logout} = useRootData(store => ({
    sessionInfo: store.auth.sessionStore.info!,
    logout: store.auth.sessionStore.logout
  }));

  const avatarUrl = useMemo(() => sessionInfo ? `https://eu.ui-avatars.com/api/?name=${sessionInfo?.name}` : '', [sessionInfo]);

  return (
    <Popover
      portalClassName={classes.popover}
      content={() => <AppHeaderPopoverContent sessionInfo={sessionInfo} logout={logout}/>}
      trigger={"click"}>
      <User
        src={require("@common/assets/images/avatar.svg")}
        name={sessionInfo?.name} className={clsx(classes.user, className)}
      />
    </Popover>
  );
};

export default AppHeaderPopover;
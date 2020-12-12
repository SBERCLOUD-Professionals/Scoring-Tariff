import React from 'react';
import {AppTheme} from "@common/theme";
import {createUseStyles} from 'react-jss';
import {Loading, Popover, Text} from "@geist-ui/react";

const useStyles = createUseStyles((theme: AppTheme) => ({
  popoverItem: {
    padding: "0 !important"
  },
  button: {
    textAlign: "inherit",
    border: "none",
    padding: "0.5rem 16px",
    background: "none",
    width: "100%",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

interface Props {
  loading?: boolean;
  text: string;
  loadingText?: string;
  onClick?: () => any;
}

const PopoverButton: React.FC<Props> = ({loading, loadingText, onClick, text}) => {

  const classes = useStyles();
  return (
    <Popover.Item className={classes.popoverItem}>
      <button className={classes.button} onClick={onClick}>
        {loading ? (<Loading>{loadingText}</Loading>) : (<Text span>{text}</Text>)}
      </button>
    </Popover.Item>
  );
};

PopoverButton.defaultProps = {
  loadingText: "Загрузка"
}

export default PopoverButton;
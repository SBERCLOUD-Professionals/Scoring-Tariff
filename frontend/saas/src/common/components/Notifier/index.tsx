import React, {useEffect} from 'react';
import {useToasts} from "@geist-ui/react";
import {Toast, ToastAction} from "@geist-ui/react/dist/use-toasts/use-toast";
import useRootData from "@common/mst/hooks/useRootData";
import {observer} from "mobx-react";

interface Props {

}

const Notifier: React.FC<Props> = ({}) => {
  const [, setToast] = useToasts();
  const {items, removeSnackbar} = useRootData(store => ({
    items: store.ui.snackbarStore.items,
    removeSnackbar: store.ui.snackbarStore.removeSnackbar,
  }));

  useEffect(() => {
    items.forEach((item) => {
      setToast({
        text: item.message,
        type: item.variant,
        delay: item.delay,
        actions: item.cancel ? [{
          name: 'Закрыть',
          handler: (event, cancel) => cancel()
        } as ToastAction] : undefined
      } as Toast)
      removeSnackbar(item.key);
    });

    return () => {
    };
  }, [items, setToast, removeSnackbar]);

  return null;
};

export default observer(Notifier);

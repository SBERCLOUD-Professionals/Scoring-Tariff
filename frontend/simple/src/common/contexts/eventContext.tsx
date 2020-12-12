import constate from "constate";
import {useEffect, useState} from "react";
import useLocalStorage from "@common/hooks/useLocalStorage";
import EventSignalR from "@common/signalr/eventSignalR";
import {useToasts} from "@geist-ui/react";

const signalR = new EventSignalR();

function useEventContext() {

  const [_, setToast] = useToasts();
  const [storedApiKey, setStoredApiKey] = useLocalStorage("API_KEY", "");
  const [connected, setConnected] = useState(false);

  const handleConnect = (value: string) => {
    const result = signalR.start(value);
    setConnected(result);
  }

  const handleSetApiKey = (value: string) => {
    handleConnect(value);
    setStoredApiKey(value);
  }

  const onEvent =  async (e: string) => {
    if (!signalR.canUse) return;
    try {
      await signalR.registerEvent(e);
    } catch (e) {
      setToast({text: "Не удалось отправить эвент. Попробуйте позже", type: "error"});
      console.error(e.details);
    }
  }

  useEffect(() => {
    if (storedApiKey) handleConnect(storedApiKey);
  }, [])

  return {
    apiKey: storedApiKey,
    setApiKey: handleSetApiKey,
    onEvent: onEvent,
    connected: connected
  };
}

const EventFactory = constate(useEventContext);

export const EventProvider = EventFactory[0];
export const useEvent = EventFactory[1];
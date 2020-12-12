import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';

function buildSignalR(apiKey: string, path: string): string {
  return `${process.env.NEXT_PUBLIC_EVENT_API_URL}${path}?api_key=${encodeURIComponent(apiKey)}`;
}

class EventSignalR {

  private _isStarted: boolean | undefined;
  private _connection: HubConnection | undefined;

  constructor() {
  }

  public start(apiKey: string): boolean {

    // check only with ApiKey
    if (!apiKey) {
      return false;
    }

    // stop previous connection
    if (this._isStarted) {
      this.stop();
    }

    // try init
    this._initIfNeeded(apiKey);

    // start connection
    // https://docs.microsoft.com/ru-ru/aspnet/core/signalr/javascript-client?view=aspnetcore-2.2#reconnect-clients
    this._connection!.start()
      .then(() => {
        console.debug("events service connected...");
        this._isStarted = true;
      })
      .catch((err) => {
        console.error(err);
        if (this._isStarted) {
          setTimeout(() => this.start(apiKey), 5000);
        }
      });

    return true;
  }

  public stop() {

    // check duplicate stop
    if (!this._isStarted) {
      return;
    }

    this._isStarted = false;

    if (!!this._connection) {
      // stop connection
      this._connection.stop()
        .then(() => {
          console.debug("events service disconnected...");
        })
        .catch((err) => console.error(err));
    }
  }

  public get canUse(): boolean {
    return this._isStarted || false;
  }

  private _initIfNeeded(apiKey: string) {
    if (!!this._connection) return;

    this._connection = new HubConnectionBuilder()
      .withUrl(buildSignalR(apiKey, "/eventsHub"), {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Error)
      .build();
    this._connection.onclose(async () => {
      console.debug("on close");
    });
  }

  public async registerEvent(e: string): Promise<any> {
    if (!this.canUse) return;
    return await this._connection!.invoke("Register", e).then((result) => {
      return result;
    });
  }
}

export default EventSignalR;

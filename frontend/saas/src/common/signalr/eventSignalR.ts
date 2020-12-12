class EventSignalR {

  private readonly _authContext: AuthContext;
  private _isStarted: boolean;
  private _listener: ICourierOrderEventListener;
  private _connection: HubConnection;

  constructor(authContext: AuthContext) {
    this._authContext = authContext;
  }

  public start(listener: ICourierOrderEventListener = null, force?: boolean) {

    // check duplicate init
    if (!force && this._isStarted) {
      return;
    }

    // stop previous connection
    if (this._isStarted) {
      this.stop();
    }

    // check only auth
    const isAuth = this._authContext.isAuth();
    if (!isAuth) {
      return;
    }

    this._listener = listener;

    // try init
    this._initIfNeeded();

    // start connection
    // https://docs.microsoft.com/ru-ru/aspnet/core/signalr/javascript-client?view=aspnetcore-2.2#reconnect-clients
    this._connection.start()
      .then(() => {
        console.debug("ws courier order service connected...");
        this._isStarted = true;
      })
      .catch((err) => {
        console.error(err);
        if (this._isStarted) {
          setTimeout(() => this.start(listener, true), 5000);
        }
      });
  }

  public stop() {

    // check duplicate stop
    if (!this._isStarted) {
      return;
    }

    // detach listener
    this._listener = null;
    this._isStarted = false;

    if (!!this._connection) {
      // stop connection
      this._connection.stop()
        .then(() => {
          console.debug("ws courier order service disconnected...");
        })
        .catch((err) => console.error(err));
    }
  }

  public get canUse(): boolean {
    return this._isStarted;
  }

  private _initIfNeeded() {
    if (!!this._connection) return;

    const _encryptedAccessToken = this._authContext.encryptedAccessToken();
    this._connection = new HubConnectionBuilder()
      .withUrl(signalrUtils.buildSignalR(_encryptedAccessToken, "/signalr/courierOrderHub"))
      .configureLogging(LogLevel.Warning)
      .build();
    this._connection.on("createCourierOrderReceived", (dto: ICourierOrderDto) => {
      if (!!this._listener) {
        this._listener.onCreate(dto);
      }
    });
    this._connection.on("updateCourierOrderReceived", (dto: ICourierOrderDto) => {
      if (!!this._listener) {
        this._listener.onUpdate(dto);
      }
    });
    this._connection.on("deleteCourierOrderReceived", (dto: IDeleteCourierOrderOutput) => {
      if (!!this._listener) {
        this._listener.onDelete(dto);
      }
    });
    this._connection.onclose(async () => {
      if (this._isStarted) {
        this.start(this._listener, true);
      }
    });
  }

  public async createCourierOrder(input: ICreateCourierOrderInput): Promise<any> {
    if (!this.canUse) return;
    const requestBody = {...input};
    return await this._connection.invoke("createCourierOrder", requestBody).then((result) => {
      return result;
    });
  }

  public async makeRefundCourierOrder(input: IMakeRefundCourierOrderInput): Promise<any> {
    if (!this.canUse) return;
    return await this._connection.invoke("makeRefundCourierOrder", input).then((result) => {
      return result;
    });
  }

  public async updateCourierOrder(input: IUpdateCourierOrderInput): Promise<any> {
    if (!this.canUse) return;
    const requestBody = {...input};
    return await this._connection.invoke("updateCourierOrder", requestBody).then((result) => {
      return result;
    });
  }

  public async moveToCourierOrder(input: IMoveToCourierOrderInput): Promise<any> {
    if (!this.canUse) return;
    return await this._connection.invoke("moveToCourierOrder", input).then((result) => {
      return result;
    });
  }

  public async deleteCourierOrder(id: string): Promise<IDeleteCourierOrderOutput> {
    if (!this.canUse) return;
    return await this._connection.invoke("deleteCourierOrder", id);
  }
}

export default EventSignalR;

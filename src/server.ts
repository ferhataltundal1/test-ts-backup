interface ServerModel {
  host: string;
  port: string;
  path?: string;
  username: string;
  password: string;
}

const SERVER_CONFIG: ServerModel = {
  host: location.hostname,
  port: location.port,
  username: "root",
  password: "192837",
};

const SERVER_USER_LIST = [
  {
    id: "6362981876",
    username: "dev",
    password: "111100",
  },
  {
    id: "6757198210",
    username: "root",
    password: "192837",
  },
];

class ServerConnection {
  protected host: string;
  protected port: string;
  protected path?: string;
  protected username: string;
  protected password: string;

  constructor({ host, port, path, username, password }: ServerModel) {
    this.host = host;
    this.port = port;
    this.path = path;
    this.username = username;
    this.password = password;
  }

  private serverControl(
    url: string,
    username: string,
    password: string
  ): boolean {
    if (!url) {
      return false;
    }
    if (username.length === 0 || password.length === 0) {
      return false;
    }
    const status = SERVER_USER_LIST.find((users) =>
      users.id && users.username === username && users.password === password
        ? true
        : false
    );
    return Boolean(status);
  }

  public runServer() {
    const url = `http://${this.host}:${this.port}/${this.path}`;
    if (this.serverControl(url, this.username, this.password)) {
      console.log("YES");
    } else {
      console.log("NO");
    }
  }

  public stopServer() {}
}

const serverRunner = new ServerConnection(SERVER_CONFIG);
serverRunner.runServer();

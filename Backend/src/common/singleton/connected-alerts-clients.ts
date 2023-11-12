export class ConnectedAlertsClients {
  private static sConnectedClients: any;
  private static activeSockets: any = {};
  private static activeUsers: any = {};

  private constructor() {
    ConnectedAlertsClients.sConnectedClients = [];
  }

  public static getConnectedClients() {
    if (!this.sConnectedClients) {
      new ConnectedAlertsClients();
    }
    return this.sConnectedClients;
  }

  public static getActiveUsers() {
    return this.activeUsers;
  }

  public static getActiveSockets() {
    return this.activeSockets;
  }

  public static setConnectedClient(client: any) {
    if (!this.sConnectedClients) {
      new ConnectedAlertsClients();
    }
    this.sConnectedClients.push(client);
    if (!this.activeSockets.hasOwnProperty(client.clientSocket)) {
      this.activeSockets[client.clientSocket] = client;
    }
    if (!this.activeUsers.hasOwnProperty(client.clientUser)) {
      this.activeUsers[client.clientUser] = {
        userDetails: client.clientUser,
        sockets: [client.clientSocket],
      };
    } else {
      if (
        !this.activeUsers[client.clientUser].sockets?.includes(
          client.clientSocket,
        )
      )
        this.activeUsers[client.clientUser].sockets?.push(client.clientSocket);
    }
  }

  public static removeConnectedClient(client: any) {
    this.sConnectedClients = this.sConnectedClients.filter(
      (connectedClient) => connectedClient.clientSocket !== client,
    );
    const username = this.activeSockets[client]?.clientUser;
    let userSocketList = this.activeUsers[username]?.sockets;
    userSocketList?.splice(userSocketList?.indexOf(client), 1);
    delete this.activeSockets[client];
    if (userSocketList?.length === 0) {
      delete this.activeUsers[username];
    }
  }
}

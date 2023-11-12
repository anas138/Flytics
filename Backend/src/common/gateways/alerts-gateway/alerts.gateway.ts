import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ConnectedAlertsClients } from 'src/common/singleton/connected-alerts-clients';
import { debug } from 'winston';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AlertsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AlertsGateway');

  private connectedClients: ConnectedAlertsClients =
    ConnectedAlertsClients.getConnectedClients();

  @SubscribeMessage('subscribeToAlerts')
  handleMessage(client: Socket, payload) {}

  sendAbsentAlert(alert) {
    // debug(`Sending socket alert to ${alert.owner}`);
    const activeUsers = ConnectedAlertsClients.getActiveUsers();
    // debug('activeUsers');
    // debug(activeUsers);
    if (activeUsers.hasOwnProperty(alert.owner)) {
      activeUsers[alert.owner].sockets.forEach((socketId) => {
        this.server.to(socketId).emit('notification', alert);
      });
    }
  }

  sendPresenceAlert(alert) {
    const activeUsers = ConnectedAlertsClients.getActiveUsers();
    // debug('activeUsers');
    // debug(activeUsers);
    if (activeUsers.hasOwnProperty(alert.owner)) {
      activeUsers[alert.owner].sockets.forEach((socketId) => {
        this.server.to(socketId).emit('presence-alert', alert);
      });
    }
  }

  sendStatsChangeAlert(alert){
    const activeUsers = ConnectedAlertsClients.getActiveUsers();
    if (activeUsers.hasOwnProperty(alert.owner)) {
      activeUsers[alert.owner].sockets.forEach((socketId) => {
        this.server.to(socketId).emit('stats-change-alert', alert);
      });
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    ConnectedAlertsClients.removeConnectedClient(client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    ConnectedAlertsClients.setConnectedClient({
      clientSocket: client.id,
      clientUser: client.handshake.query?.userId,
    });
  }
}

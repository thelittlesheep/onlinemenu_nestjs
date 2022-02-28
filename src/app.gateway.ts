import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
// import { Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  private logger: Logger = new Logger('AppGateway');
  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket, payload: any): WsResponse<string> {
  //   return { event: 'msgToClient', data: 'Hello world!' };
  // }
}

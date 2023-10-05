// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
// import { Reflector } from '@nestjs/core'
// import { Socket } from 'socket.io'
// import { SocketEvent } from 'src/enum/enum'
// import { TokenService } from 'src/token/token.service'
// import { UserService } from 'src/user/user.service'

// @Injectable()
// export class ChatAuthGuard implements CanActivate {
//   constructor(
//     private userService: UserService,
//     private tokenService: TokenService,
//     private reflector: Reflector,
//     ) {}

//   async canActivate(
//     context: ExecutionContext,
//   ): Promise<boolean>  {
//     try {
//       const prevEvent = this.reflector.get<string[]>('SocketEvent', context.getHandler());
//       const prevData = context.switchToWs().getData()
//       const client: Socket = context.switchToWs().getClient<Socket>()
     

//       console.log(client.handshake.auth.accessToken);
      
//       const accessToken = client.handshake.auth.accessToken
  
//       const payloadToken = await this.tokenService.verifyToken(accessToken)
  
//       console.log(payloadToken instanceof Error);
      
//       if(payloadToken instanceof Error){
//         client.emit(SocketEvent.AUTH_SOCKET, prevEvent, prevData )
//         return false
//       }
  
//       const user = await this.userService.getUserByDto({id:payloadToken.id})
      
//       if(!user){
//         client.emit(SocketEvent.AUTH_SOCKET, prevEvent, prevData )
//         return false
//       }
      
//       return true
//     } catch (error) {
//       return false
//     }
 
//   }
// }

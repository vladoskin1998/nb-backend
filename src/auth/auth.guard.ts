// import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
// import { Observable } from 'rxjs'
// import { JwtTokenService } from './jwt-auth.service';
// import { Request } from 'express'
// import { UserService } from '../../user/user.service';

// @Injectable()
// export class AuthHttpGuard implements CanActivate {
//   constructor(
//     private tokenService: TokenService,
//     private userService: UserService
//   ) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request: Request = context.switchToHttp().getRequest()

//     const accessToken = request.headers?.authorization
    
//     if (!accessToken) {
//       throw new HttpException("Request don`t have authorization header", HttpStatus.BAD_REQUEST)
//     }

//     return this.authByAccessToken(accessToken)
//   }

//   async authByAccessToken(accessToken: string): Promise<boolean> {
    
//     const payload = await this.tokenService.verifyToken(accessToken)

//     if(payload instanceof Error){
//       throw new HttpException("UNAUTHORIZED, Bad token", HttpStatus.UNAUTHORIZED)
//     }

//     const user = await this.userService.getUserByDto({id: payload.id})

//     if (!user) {
//       throw new HttpException("DB don`t find user", HttpStatus.BAD_REQUEST)
//     }

//     const userToken = await user.$get('tokens')

//     return userToken.accessToken === accessToken
//   }
// }



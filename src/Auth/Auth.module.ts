import { UserModule } from "@app/user"
import { BoatModule } from "@libs/boat"
import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthController } from "./controller/Auth.controller"
import { LoginController } from "./controller/Login.controller"
import { AuthService } from "./services/Auth.services"
import { LoginService } from "./services/login.services"
import { JwtModule } from '@nestjs/jwt';
import { randomBytes } from "crypto"
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from "./constants"
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from "./local.auth"
import { JwtStrategy } from "./jwtStrategy"
@Module({
    imports:[BoatModule,UserModule ,PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers:[AuthController,LoginController],
    providers:[AuthService,LoginService,JwtService,LocalStrategy,JwtStrategy]
})
export class AuthModule{}
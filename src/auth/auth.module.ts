import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import config from 'src/config'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '1d' }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}

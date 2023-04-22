import { Controller, Req, Post, UseGuards } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { Request } from 'express'
import { User } from 'src/users/entities/user.entity'
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user as User
    return this.authService.generateJWT(user)
  }
}

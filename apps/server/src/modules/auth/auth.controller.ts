import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Public } from '../../decorators/public.decorator'
import { AuthUserDto } from '../users/dto/authUser.dto'
import { RegisterUserDto } from '../users/dto/registerUser.dto'
import { AuthService } from './auth.service'

@ApiTags('/api')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() user: AuthUserDto) {
    return await this.authService.login(user)
  }

  @Public()
  @Post('/register')
  async register(@Body() user: RegisterUserDto) {
    console.log(user)
    return await this.authService.register(user)
  }
}

import { Controller, Get } from '@nestjs/common'
import { CurrentUser } from '../../decorators/currentUser.decorator'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getAll()
  }

  @Get('/me')
  async getCurrentUser(@CurrentUser() user: UserDto) {
    return this.usersService.getUserById(user.id)
  }
}

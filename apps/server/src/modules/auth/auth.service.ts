import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from '../users/dto/authUser.dto'
import { RegisterUserDto } from '../users/dto/registerUser.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: AuthUserDto = await this.usersService.getUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException({
        field: 'email',
        message: 'Wrong email'
      })
    }

    if (!this.passwordIsValid(user.password, pass)) {
      throw new UnauthorizedException({
        field: 'password',
        message: 'Wrong password'
      })
    }

    const { password, ...result } = user

    return result
  }

  async login(user: AuthUserDto) {
    const validatedUser = await this.validateUser(user.email, user.password)

    const payload = {
      id: validatedUser.id
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async register(user: RegisterUserDto) {
    const registeredUser = await this.usersService.createUser(user)

    if (!registeredUser) {
      throw new UnprocessableEntityException()
    }

    const payload = {
      id: registeredUser.id
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private passwordIsValid(externalPassword: string, password: string) {
    return bcrypt.compareSync(password, externalPassword)
  }
}

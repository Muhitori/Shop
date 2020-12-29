import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from '../../entities/User'
import { CountriesService } from '../countries/countries.service'
import { RolesService } from '../roles/roles.service'
import { AuthUserDto } from './dto/authUser.dto'
import { RegisterUserDto } from './dto/registerUser.dto'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private countriesService: CountriesService,
    private rolesService: RolesService
  ) {}

  async getAllUsers(): Promise<UserDto[] | []> {
    return this.userRepo.find({
      join: {
        alias: 'users',
        leftJoinAndSelect: {
          role: 'users.role',
          country: 'users.country'
        }
      }
    })
  }

  async findOneByEmail(email: string): Promise<AuthUserDto | null> {
    return this.userRepo.findOne({ email })
  }

  async createUser(user: RegisterUserDto): Promise<UserDto | null> {
    const country = await this.countriesService.getCountryByName(
      user.countryName
    )
    const role = await this.rolesService.getRoleByName('User')
    const newUser: User = new User(
      user.email,
      user.username,
      user.password,
      user.birthDate,
      country.id,
      role.id
    )

    newUser.password = this.hashPassword(newUser.password)

    await this.userRepo.insert(newUser)

    return newUser
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 2)
  }
}

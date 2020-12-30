import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entities/user.entity'
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

  async getAll(): Promise<UserDto[] | []> {
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

  async getUserById(id: string): Promise<UserDto | null> {
    return this.userRepo.findOne({
      where: { id },
      join: {
        alias: 'users',
        leftJoinAndSelect: {
          roles: 'users.roles',
          country: 'users.country'
        }
      }
    })
  }

  async getUserByEmail(email: string): Promise<AuthUserDto | null> {
    return this.userRepo.findOne({
      where: { email },
      join: {
        alias: 'users',
        leftJoinAndSelect: {
          roles: 'users.roles'
        }
      }
    })
  }

  async create(user: RegisterUserDto): Promise<AuthUserDto | null> {
    const country = await this.countriesService.getCountryByName(
      user.countryName
    )

    const newUser: User = new User(
      user.email,
      user.username,
      user.password,
      user.birthDate,
      country.id
    )

    await this.userRepo.insert(newUser)

    return this.getUserByEmail(user.email)
  }

  async createMany(users: RegisterUserDto[]): Promise<any> {
    return this.userRepo.insert(users)
  }
}

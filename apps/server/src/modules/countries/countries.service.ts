import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Country } from '../../entities/country.entity'
import { CountryDto } from './country.dto'

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private countryRepo: Repository<Country>
  ) {}

  async getCountryByName(name: string): Promise<CountryDto | null> {
    return this.countryRepo.findOne({ name })
  }

  async create(country: CountryDto): Promise<any> {
    return this.countryRepo.insert(country)
  }

  async createMany(countries: CountryDto[]): Promise<any> {
    return this.countryRepo.insert(countries)
  }
}

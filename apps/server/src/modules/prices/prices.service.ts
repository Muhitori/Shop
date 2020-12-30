import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Price } from '../../entities/price.entity'
import { PriceDto } from './price.dto'

@Injectable()
export class PricesService {
  constructor(@InjectRepository(Price) private priceRepo: Repository<Price>) {}

  async create(price: PriceDto): Promise<any> {
    return this.priceRepo.insert(price)
  }

  async createMany(prices: PriceDto[]): Promise<any> {
    return this.priceRepo.insert(prices)
  }
}

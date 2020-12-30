import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Price } from '../../entities/price.entity'
import { PricesService } from './prices.service'

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  providers: [PricesService],
  exports: [PricesService]
})
export class PricesModule {}

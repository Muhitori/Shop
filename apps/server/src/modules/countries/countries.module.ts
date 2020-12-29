import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Country } from '../../entities/Country'
import { CountriesService } from './countries.service'

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountriesService],
  exports: [CountriesService]
})
export class CountriesModule {}

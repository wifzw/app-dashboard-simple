import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersEntity } from './customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity])],
  providers: [CustomersService, JwtService],
  controllers: [CustomersController],
})
export class CustomersModule {}

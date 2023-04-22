import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe'
import {
  CreateCustomerDto,
  UpdateCustomerDto
} from 'src/users/dtos/customer.dto'

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers() {
    return 'customers'
  }

  @Get(':id')
  getCustomer(@Param('id', MongoIdPipe) id: string) {
    return 'customer'
  }

  @Post()
  createCustomer(@Body() payload: CreateCustomerDto) {
    return payload
  }

  @Put(':id')
  updateCustomer(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCustomerDto
  ) {
    return 'customer'
  }

  @Delete(':id')
  deleteCustomer(@Param('id', MongoIdPipe) id: string) {
    return 'customer'
  }
}

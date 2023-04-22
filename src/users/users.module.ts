import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users/users.controller'
import { UsersService } from './services/users/users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './entities/user.entity'
import { CustomersController } from './controllers/customers/customers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController, CustomersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

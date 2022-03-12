import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { validationMiddleware } from '@middlewares/validation.middleware';

@Controller()
export class UsersController {
  public userService = new userService();

  @Get('/users')
  @OpenAPI({ summary: 'Return a list of users' })
  async getUsers() {
    const findAllUsersData: any = await this.userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }
  
}

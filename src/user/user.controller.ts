import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserPayload } from '@gglk/auth/auth.interface';
import { JwtAuthGuard } from '@gglk/auth/guard/jwt.guard';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { UserType } from '@gglk/common/decorator/user-type.decorator';
import { UserTypeGuard } from '@gglk/common/guard/user-type.guard';
import { GetUserDocs, UserControllerDocs } from './docs';
import { GetUserResponseDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
@UserType(['USER'])
@UseGuards(JwtAuthGuard, UserTypeGuard)
@UserControllerDocs
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UserType(['GUEST'])
  @GetUserDocs
  async getUser(@GetUser() userPayload: UserPayload) {
    const user = await this.userService.getUser(userPayload);
    return new GetUserResponseDto(user);
  }
}

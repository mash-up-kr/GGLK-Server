import { Controller, Get } from '@nestjs/common';
import { UserPayload } from '@gglk/auth/auth.interface';
import { GetUser } from '@gglk/common/decorator/get-user.decorator';
import { UserType } from '@gglk/common/decorator/user-type.decorator';
import { UserControllerGuardDefinition } from './decorators';
import { GetUserDocs, UserControllerDocs } from './docs';
import { GetUserResponseDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
@UserControllerGuardDefinition
@UserControllerDocs
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UserType(['GUEST'])
  @GetUserDocs
  async getUser(@GetUser() userPayload: UserPayload) {
    const user = await this.userService.getUser(userPayload);
    return new GetUserResponseDto(user);
  }
}

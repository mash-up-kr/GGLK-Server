import { Test, TestingModule } from '@nestjs/testing';
import {
  MockServiceFactory,
  MockedClass,
} from '@gglk/common/testing/mock.factory';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let mockedService: MockedClass<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: MockServiceFactory.getMockService(UserService),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    mockedService = module.get<MockedClass<UserService>>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockedService).toBeDefined();
  });
});

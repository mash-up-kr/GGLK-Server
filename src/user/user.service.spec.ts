import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockRepositoryFactory,
  MockedClass,
} from '@gglk/common/testing/mock.factory';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockedRepositry: MockedClass<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useFactory: MockRepositoryFactory.getMockRepository(UserRepository),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockedRepositry = module.get<MockedClass<UserRepository>>(
      getRepositoryToken(UserRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockedRepositry).toBeDefined();
  });
});

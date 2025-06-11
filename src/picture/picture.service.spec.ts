import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockRepositoryFactory,
  MockServiceFactory,
  MockedClass,
} from '@gglk/common/testing/mock.factory';
import { PictureRepository } from './picture.repository';
import { PictureService } from './picture.service';

describe('PictureService', () => {
  let service: PictureService;
  let mockedRepositry: MockedClass<PictureRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PictureService,
        {
          provide: getRepositoryToken(PictureRepository),
          useFactory:
            MockRepositoryFactory.getMockRepository(PictureRepository),
        },
        {
          provide: ConfigService,
          useFactory: MockServiceFactory.getMockService(ConfigService),
        },
      ],
    }).compile();

    service = module.get<PictureService>(PictureService);
    mockedRepositry = module.get<MockedClass<PictureRepository>>(
      getRepositoryToken(PictureRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockedRepositry).toBeDefined();
  });
});

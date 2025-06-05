import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  MockRepositoryFactory,
  MockServiceFactory,
  MockedClass,
} from '@gglk/common/testing/mock.factory';
import { PictureRepository } from '@gglk/picture/picture.repository';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;
  let configService: MockedClass<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useFactory: MockServiceFactory.getMockService(ConfigService),
        },
        {
          provide: PictureRepository,
          useFactory:
            MockRepositoryFactory.getMockRepository(PictureRepository),
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    configService = module.get<MockedClass<ConfigService>>(ConfigService);

    configService.get = jest.fn().mockReturnValue('test-api-key');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

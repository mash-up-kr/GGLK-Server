import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  MockServiceFactory,
  MockedClass,
} from '@gglk/common/testing/mock.factory';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

describe('PictureController', () => {
  let controller: PictureController;
  let mockedService: MockedClass<PictureService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PictureController],
      providers: [
        {
          provide: PictureService,
          useFactory: MockServiceFactory.getMockService(PictureService),
        },
        {
          provide: ConfigService,
          useFactory: MockServiceFactory.getMockService(ConfigService),
        },
      ],
    }).compile();

    controller = module.get<PictureController>(PictureController);
    mockedService = module.get<MockedClass<PictureService>>(PictureService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockedService).toBeDefined();
  });
});

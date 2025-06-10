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
  let configService: jest.Mocked<ConfigService>;

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
    configService = module.get(ConfigService);

    // 환경 변수 설정
    configService.get.mockImplementation((key: string) => {
      if (key === 'NCP_BUCKET') return 'test-bucket';
      return '';
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockedService).toBeDefined();
  });

  describe('uploadPicture', () => {
    it('사진 파일을 업로드 하면 사진의 id를 반환한다', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        mimetype: 'image/png',
      } as Express.Multer.File;
      const mockPicture = { id: 123 };

      mockedService.savePicture?.mockResolvedValue(mockPicture);

      const result = await controller.uploadPicture(mockFile);

      expect(mockedService.savePicture).toHaveBeenCalled();
      expect(result).toBe(123);
    });
  });
});

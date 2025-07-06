import { Test, TestingModule } from '@nestjs/testing';
import {
  MockServiceFactory,
  MockedClass,
} from '@gglk/common/testing/mock.factory';
import { RedisService } from '@gglk/redis/redis.service';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';

describe('EvaluationController', () => {
  let controller: EvaluationController;
  let mockedService: MockedClass<EvaluationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationController],
      providers: [
        {
          provide: EvaluationService,
          useFactory: MockServiceFactory.getMockService(EvaluationService),
        },
        {
          provide: RedisService,
          useFactory: MockServiceFactory.getMockService(RedisService),
        },
      ],
    }).compile();

    controller = module.get<EvaluationController>(EvaluationController);
    mockedService =
      module.get<MockedClass<EvaluationService>>(EvaluationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockedService).toBeDefined();
  });
});

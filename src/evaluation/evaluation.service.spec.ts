import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AiService } from '@gglk/ai/ai.service';
import {
  MockRepositoryFactory,
  MockServiceFactory,
  MockedClass,
} from '@gglk/common/testing/mock.factory';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationService } from './evaluation.service';

describe('EvaluationService', () => {
  let service: EvaluationService;
  let mockedRepositry: MockedClass<EvaluationRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationService,
        {
          provide: getRepositoryToken(EvaluationRepository),
          useFactory:
            MockRepositoryFactory.getMockRepository(EvaluationRepository),
        },
        {
          provide: AiService,
          useFactory: MockServiceFactory.getMockService(AiService),
        },
      ],
    }).compile();

    service = module.get<EvaluationService>(EvaluationService);
    mockedRepositry = module.get<MockedClass<EvaluationRepository>>(
      getRepositoryToken(EvaluationRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockedRepositry).toBeDefined();
  });
});

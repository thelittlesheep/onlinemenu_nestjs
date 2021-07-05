import { Test, TestingModule } from '@nestjs/testing';
import { UpdatetempService } from './updatetemp.service';

describe('UpdatetempService', () => {
  let service: UpdatetempService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatetempService],
    }).compile();

    service = module.get<UpdatetempService>(UpdatetempService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

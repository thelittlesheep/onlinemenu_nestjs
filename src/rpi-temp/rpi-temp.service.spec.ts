import { Test, TestingModule } from '@nestjs/testing';
import { RpiTempService } from './rpi-temp.service';

describe('RpiTempService', () => {
  let service: RpiTempService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpiTempService],
    }).compile();

    service = module.get<RpiTempService>(RpiTempService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RpiTempController } from './rpi-temp.controller';

describe('RpiTempController', () => {
  let controller: RpiTempController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RpiTempController],
    }).compile();

    controller = module.get<RpiTempController>(RpiTempController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

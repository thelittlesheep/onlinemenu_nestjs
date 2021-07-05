import { Test, TestingModule } from '@nestjs/testing';
import { UpdatetempController } from './updatetemp.controller';

describe('UpdatetempController', () => {
  let controller: UpdatetempController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatetempController],
    }).compile();

    controller = module.get<UpdatetempController>(UpdatetempController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

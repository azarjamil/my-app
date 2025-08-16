import { Test, TestingModule } from '@nestjs/testing';
import { SignalsController } from './signals.controller';
import { SignalsService } from './signals.service';

describe('SignalsController', () => {
  let controller: SignalsController;

  const mockSignalsService = {
    findAll: jest.fn().mockResolvedValue([{ deviceId: '123', dataLength: 10 }]),
    create: jest.fn().mockResolvedValue({ deviceId: '123', dataLength: 10 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalsController],
      providers: [{ provide: SignalsService, useValue: mockSignalsService }],
    }).compile();

    controller = module.get<SignalsController>(SignalsController);
  });

  it('should return all signals', async () => {
    expect(await controller.findAll()).toEqual([{ deviceId: '123', dataLength: 10 }]);
  });

  it('should create a signal', async () => {
    const dto = { deviceId: '123', dataLength: 10, dataVolume: 20, time: new Date() };
    expect(await controller.create(dto as any)).toEqual(dto);
  });
});

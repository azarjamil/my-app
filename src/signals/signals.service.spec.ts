import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SignalsService } from './signals.service';
import { Signal } from './signal.schema';

describe('SignalsService', () => {
  let service: SignalsService;

  const mockSignalModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([{ deviceId: '123', dataLength: 10 }]),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalsService,
        { provide: getModelToken(Signal.name), useValue: mockSignalModel },
      ],
    }).compile();

    service = module.get<SignalsService>(SignalsService);
  });

  it('should return all signals', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ deviceId: '123', dataLength: 10 }]);
  });
});

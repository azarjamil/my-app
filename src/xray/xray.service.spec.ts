import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { XrayService } from './xray.service';
import { Model } from 'mongoose';

describe('XrayService', () => {
  let service: XrayService;
  let model: Model<any>;

  const mockXray = {
    deviceId: 'device123',
    time: new Date(),
    dataLength: 20,
    dataVolume: 400,
  };

  const mockXrayModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockXray]),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockXray),
    }),
    create: jest.fn().mockResolvedValue(mockXray),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XrayService,
        { provide: getModelToken('Xray'), useValue: mockXrayModel },
      ],
    }).compile();

    service = module.get<XrayService>(XrayService);
    model = module.get<Model<any>>(getModelToken('Xray'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all xrays', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockXray]);
  });

  it('should return one xray by id', async () => {
    const result = await service.findOne('id123');
    expect(result).toEqual(mockXray);
  });
});



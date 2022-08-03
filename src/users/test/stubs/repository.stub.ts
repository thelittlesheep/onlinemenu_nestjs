import { UpdateResult } from 'typeorm';

export const updateResultStub = (): UpdateResult => {
  return {
    raw: {},
    affected: 1,
    generatedMaps: [],
  };
};

import { CentPrecisionMoney } from '@commercetools/platform-sdk';

export const createMockMoney = (amount: number): CentPrecisionMoney => ({
  centAmount: amount,
  fractionDigits: 2,
  currencyCode: 'USD',
  type: 'centPrecision',
});

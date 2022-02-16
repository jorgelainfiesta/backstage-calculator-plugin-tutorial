import { calculatorPlugin } from './plugin';

describe('calculator', () => {
  it('should export plugin', () => {
    expect(calculatorPlugin).toBeDefined();
  });
});

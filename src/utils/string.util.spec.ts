import { toCamelCase, toSnakeCase } from './string.util';

describe('StringUtil', () => {
  describe('toCamelCase', () => {
    it('should convert snake_case to camelCase', () => {
      const result = toCamelCase('test_str');
      expect(result).toEqual('testStr');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      const result = toSnakeCase('testStr');
      expect(result).toEqual('test_str');
    });
  });
});

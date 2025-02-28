import { postProcessResponseToCamelCase, wrapIdentifierToSnakeCase } from './knex.util';

describe('KnexUtil', () => {
  describe('postProcessResponseToCamelCase', () => {
    it('should convert snake_case keys to camelCase', () => {
      const result = {
        id: 1,
        title: 'title',
        content: 'content',
        user_id: 1,
        created_at: '2023-08-01T00:00:00.000Z',
        updated_at: '2023-08-01T00:00:00.000Z',
      };
      const expected = {
        id: 1,
        title: 'title',
        content: 'content',
        userId: 1,
        createdAt: '2023-08-01T00:00:00.000Z',
        updatedAt: '2023-08-01T00:00:00.000Z',
      };
      expect(postProcessResponseToCamelCase(result)).toEqual(expected);
    });

    it('should return an array of objects with camelCase keys', () => {
      const result = [
        {
          id: 1,
          title: 'title',
          content: 'content',
          user_id: 1,
          created_at: '2023-08-01T00:00:00.000Z',
          updated_at: '2023-08-01T00:00:00.000Z',
        },
        {
          id: 2,
          title: 'title',
          content: 'content',
          user_id: 1,
          created_at: '2023-08-01T00:00:00.000Z',
          updated_at: '2023-08-01T00:00:00.000Z',
        },
      ];
      const expected = [
        {
          id: 1,
          title: 'title',
          content: 'content',
          userId: 1,
          createdAt: '2023-08-01T00:00:00.000Z',
          updatedAt: '2023-08-01T00:00:00.000Z',
        },
        {
          id: 2,
          title: 'title',
          content: 'content',
          userId: 1,
          createdAt: '2023-08-01T00:00:00.000Z',
          updatedAt: '2023-08-01T00:00:00.000Z',
        },
      ];
      expect(postProcessResponseToCamelCase(result)).toEqual(expected);
    });
  });

  describe('wrapIdentifierToSnakeCase', () => {
    it('should wrap identifier to snake_case', () => {
      const result = wrapIdentifierToSnakeCase('testStr', str => str);
      expect(result).toEqual('test_str');
    });
  });
});

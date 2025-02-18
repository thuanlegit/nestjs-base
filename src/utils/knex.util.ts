import { toCamelCase, toSnakeCase } from './string.util';

export function postProcessResponseToCamelCase(result: any) {
  function mapKeysToCamelCase(obj: any) {
    const transformed: Record<string, any> = {};
    Object.keys(obj).forEach(key => (transformed[toCamelCase(key)] = obj[key]));
    return transformed;
  }

  if (!result) return result;

  if (Array.isArray(result)) {
    return result.map(row => mapKeysToCamelCase(row));
  }
  return mapKeysToCamelCase(result);
}

export function wrapIdentifierToSnakeCase(value: string, origImpl: (value: string) => string) {
  return origImpl(toSnakeCase(value));
}

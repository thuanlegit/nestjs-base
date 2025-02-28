import { toCamelCase, toSnakeCase } from './string.util';

export function postProcessResponseToCamelCase(
  result: Record<string, any>[] | Record<string, any>,
): Record<string, any> | Record<string, any>[] {
  function mapKeysToCamelCase(obj: Record<string, any>) {
    const transformed: Record<string, any> = {};
    Object.keys(obj).forEach(key => {
      transformed[toCamelCase(key)] = obj[key] as unknown;
    });
    return transformed;
  }

  if (Array.isArray(result)) {
    return result.map((row: Record<string, any>) => mapKeysToCamelCase(row));
  }
  return mapKeysToCamelCase(result);
}

export function wrapIdentifierToSnakeCase(
  value: string,
  origImpl: (value: string) => string,
): string {
  return origImpl(toSnakeCase(value));
}

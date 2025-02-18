export function toCamelCase(str: string): string {
  return str
    .replace(/([-_]\w)/g, match => match[1].toUpperCase())
    .replace(/^\w/, match => match.toLowerCase());
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();
}

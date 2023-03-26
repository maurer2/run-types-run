export function listFormatterAnd(list: Array<string>): string {
  // en-gb disabled oxford comma
  return new Intl.ListFormat('en-gb', { style: 'long', type: 'conjunction' }).format(list);
}

export function listFormatterOr(list: Array<string>): string {
  // en-gb disabled oxford comma
  return new Intl.ListFormat('en-gb', { style: 'long', type: 'disjunction' }).format(list);
}

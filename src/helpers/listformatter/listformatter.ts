export function listFormatterAnd(list: Array<string>): string {
  return new Intl.ListFormat('en', { style: 'short', type: 'conjunction' }).format(list);
}

export function listFormatterOr(list: Array<string>): string {
  return new Intl.ListFormat('en', { style: 'short', type: 'disjunction' }).format(list);
}

const behaviourValues = ['and', 'or', 'delimiter'] as const;
const behaviourMap: Record<(typeof behaviourValues)[number], Intl.ListFormatType> = {
  'and': 'conjunction',
  'delimiter': 'unit',
  'or': 'disjunction',
}

export function formatList(behaviour: keyof typeof behaviourMap = 'and', style: Intl.ListFormatStyle = 'long') {
  const type: Intl.ListFormatType = behaviourMap[behaviour];
  const formatter = new Intl.ListFormat('en-gb', { style, type });

  return (list: string[]) => formatter.format(list);
}

export function listFormatterAnd(list: string[]): string {
  // en-gb disables oxford comma
  return new Intl.ListFormat('en-gb', { style: 'long', type: 'conjunction' }).format(list);
}

export function listFormatterOr(list: string[]): string {
  // en-gb disables oxford comma
  return new Intl.ListFormat('en-gb', { style: 'long', type: 'disjunction' }).format(list);
}

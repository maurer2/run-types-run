import { describe, expect, it } from 'vitest';

import { listFormatterAnd, listFormatterOr } from './listformatter';

describe('listFormatter', () => {
  describe('listFormatterAnd', () => {
    it('should not add "and" for single items', () => {
      const list = ['cat'];
      expect(listFormatterAnd(list)).toBe('cat');
      expect(listFormatterAnd(list)).not.toContain('and');
    });

    it('should add "and" for multiple items', () => {
      const list = ['cat', 'dog'];
      expect(listFormatterAnd(list)).toBe('cat and dog');
      expect(listFormatterAnd(list)).toContain('and');
      expect(listFormatterAnd(list)).not.toContain('&');
    });

    it('should have commas when there more than two items', () => {
      const list = ['cat', 'dog', 'armadillo'];
      expect(listFormatterAnd(list)).toBe('cat, dog and armadillo');
      expect(listFormatterAnd(list)).toContain('and');
      expect(listFormatterAnd(list)).not.toContain('&');
      expect(listFormatterAnd(list)).toContain(',');
    });

    it('should not have oxford comma', () => {
      const list = ['cat', 'dog', 'armadillo'];
      expect(listFormatterAnd(list).split(',')).toHaveLength(list.length - 1) // n times comma + rest

      const list2 = ['cat', 'dog', 'armadillo', 'meerkat'];
      expect(listFormatterAnd(list2).split(',')).toHaveLength(list2.length - 1) // n times comma + rest
    });
  });

  describe('listFormatterOr', () => {
    it('should not add "or" for single items', () => {
      const list = ['cat'];
      expect(listFormatterOr(list)).toBe('cat');
      expect(listFormatterOr(list)).not.toContain('or');
    });

    it('should add "or" for multiple items', () => {
      const list = ['cat', 'dog'];
      expect(listFormatterOr(list)).toBe('cat or dog');
      expect(listFormatterOr(list)).toContain('or');
    });

    it('should have commas when there more than two items', () => {
      const list = ['cat', 'dog', 'armadillo'];
      expect(listFormatterOr(list)).toBe('cat, dog or armadillo');
      expect(listFormatterOr(list)).toContain('or');
      expect(listFormatterOr(list)).toContain(',');
    });

    it('should not have oxford comma', () => {
      const list = ['cat', 'dog', 'armadillo'];
      expect(listFormatterOr(list).split(',')).toHaveLength(list.length - 1) // n times comma + rest

      const list2 = ['cat', 'dog', 'armadillo', 'meerkat'];
      expect(listFormatterOr(list2).split(',')).toHaveLength(list2.length - 1) // n times comma + rest
    });
  });

});

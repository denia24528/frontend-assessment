import { checkEquivalence } from './check-equivalence';

describe('checkEquivalence', () => {
    test('returns true for strictly equal primitives', () => {
        expect(checkEquivalence(1, 1)).toBe(true);
        expect(checkEquivalence('a', 'a')).toBe(true);
        expect(checkEquivalence(true, true)).toBe(true);
        expect(checkEquivalence(null, null)).toBe(true);
        expect(checkEquivalence(undefined, undefined)).toBe(true);
    });

    test('returns true for null and undefined equivalence', () => {
        expect(checkEquivalence(null, undefined)).toBe(true);
        expect(checkEquivalence(undefined, null)).toBe(true);
    });

    test('returns false for different primitive values', () => {
        expect(checkEquivalence(1, 2)).toBe(false);
        expect(checkEquivalence('a', 'b')).toBe(false);
        expect(checkEquivalence(true, false)).toBe(false);
        expect(checkEquivalence(0, false)).toBe(false);
    });

    test('returns false for different types', () => {
        expect(checkEquivalence(1, '1')).toBe(false);
        expect(checkEquivalence({}, [])).toBe(false);
        expect(checkEquivalence([], {})).toBe(false);
    });

    test('returns true for equivalent arrays', () => {
        expect(checkEquivalence([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(checkEquivalence([], [])).toBe(true);
        expect(checkEquivalence([null, undefined], [undefined, null])).toBe(true);
    });

    test('returns false for arrays with different lengths or values', () => {
        expect(checkEquivalence([1, 2], [1, 2, 3])).toBe(false);
        expect(checkEquivalence([1, 2, 3], [3, 2, 1])).toBe(false);
        expect(checkEquivalence([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    test('returns true for equivalent objects', () => {
        expect(checkEquivalence({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
        expect(checkEquivalence({ a: 1, b: 2 }, { b: 2, a: 1, c: null })).toBe(true);
        expect(checkEquivalence({}, {})).toBe(true);
        expect(checkEquivalence({ a: undefined }, { a: null })).toBe(true);
    });

    test('returns false for objects with different keys or values', () => {
        expect(checkEquivalence({ a: 1 }, { a: 2 })).toBe(false);
        expect(checkEquivalence({ a: 1 }, { b: 1 })).toBe(false);
        expect(checkEquivalence({ a: 1 }, {})).toBe(false);
    });

    test('returns true for nested structures that are equivalent', () => {
        const obj1 = { a: [1, { b: 2 }], c: { d: 3 } };
        const obj2 = { c: { d: 3 }, a: [1, { b: 2 }] };
        expect(checkEquivalence(obj1, obj2)).toBe(true);
    });

    test('returns false for nested structures that are not equivalent', () => {
        const obj1 = { a: [1, { b: 2 }], c: { d: 3 } };
        const obj2 = { c: { d: 4 }, a: [1, { b: 2 }] };
        expect(checkEquivalence(obj1, obj2)).toBe(false);
    });

    test('returns true for equivalent Date objects', () => {
        const date1 = new Date('2023-01-01T00:00:00Z');
        const date2 = new Date('2023-01-01T00:00:00Z');
        expect(checkEquivalence(date1, date2)).toBe(true);
    });

    test('returns false for different Date objects', () => {
        const date1 = new Date('2023-01-01T00:00:00Z');
        const date2 = new Date('2024-01-01T00:00:00Z');
        expect(checkEquivalence(date1, date2)).toBe(false);
    });

    test('handles objects with undefined properties', () => {
        expect(checkEquivalence({ a: undefined }, {})).toBe(true);
        expect(checkEquivalence({}, { a: undefined })).toBe(true);
    });

    test('handles arrays with undefined and null', () => {
        expect(checkEquivalence([undefined], [null])).toBe(true);
        expect(checkEquivalence([null], [undefined])).toBe(true);
    });
});
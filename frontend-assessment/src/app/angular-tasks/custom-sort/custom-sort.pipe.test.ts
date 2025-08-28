import { CustomSortPipe } from './custom-sort.pipe';

describe('CustomSortPipe', () => {
    let pipe: CustomSortPipe;

    beforeEach(() => {
        pipe = new CustomSortPipe();
    });

    it('should return the same value if input is not an array', () => {
        expect(pipe.transform(null as never, 'name')).toBe(null);
        expect(pipe.transform(undefined as never, 'name')).toBe(undefined);
        expect(pipe.transform('not-an-array' as never, 'name')).toBe('not-an-array');
    });

    it('should sort by a single string property ascending', () => {
        const arr = [
            { name: 'Charlie' },
            { name: 'Alice' },
            { name: 'Bob' },
        ];
        const sorted = pipe.transform(arr, 'name');
        expect(sorted.map(x => x.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('should sort by a single string property descending', () => {
        const arr = [
            { name: 'Charlie' },
            { name: 'Alice' },
            { name: 'Bob' },
        ];
        const sorted = pipe.transform(arr, '-name');
        expect(sorted.map(x => x.name)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('should sort by a single number property ascending', () => {
        const arr = [
            { age: 30 },
            { age: 20 },
            { age: 40 },
        ];
        const sorted = pipe.transform(arr, 'age');
        expect(sorted.map(x => x.age)).toEqual([20, 30, 40]);
    });

    it('should sort by a single number property descending', () => {
        const arr = [
            { age: 30 },
            { age: 20 },
            { age: 40 },
        ];
        const sorted = pipe.transform(arr, '-age');
        expect(sorted.map(x => x.age)).toEqual([40, 30, 20]);
    });

    it('should sort by multiple criteria', () => {
        const arr = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 20 },
            { name: 'Alice', age: 25 },
        ];
        const sorted = pipe.transform(arr, ['name', '-age']);
        expect(sorted).toEqual([
            { name: 'Alice', age: 30 },
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 20 },
        ]);
    });

    it('should handle null and undefined values', () => {
        const arr = [
            { name: 'Charlie' },
            { name: null },
            { name: undefined },
            { name: 'Alice' },
        ];
        const sorted = pipe.transform(arr, 'name');
        expect(sorted.map(x => x.name)).toEqual([null, undefined, 'Alice', 'Charlie']);
    });

    it('should sort by date property', () => {
        const arr = [
            { date: new Date('2022-01-01') },
            { date: new Date('2021-01-01') },
            { date: new Date('2023-01-01') },
        ];
        const sorted = pipe.transform(arr, 'date');
        expect(sorted.map(x => x.date.getFullYear())).toEqual([2021, 2022, 2023]);
    });

    it('should sort arrays by array length', () => {
        const arr = [
            { items: [1, 2, 3] },
            { items: [1] },
            { items: [1, 2] },
        ];
        const sorted = pipe.transform(arr, 'items');
        expect(sorted.map(x => x.items.length)).toEqual([1, 2, 3]);
    });

    it('should sort objects by JSON string if property is object', () => {
        const arr = [
            { obj: { b: 2, a: 1 } },
            { obj: { a: 1, b: 1 } },
            { obj: { a: 1, b: 2 } },
        ];
        const sorted = pipe.transform(arr, 'obj');
        expect(sorted[0].obj).toEqual({ a: 1, b: 1 });
    });

    it('should not mutate the original array', () => {
        const arr = [
            { name: 'Charlie' },
            { name: 'Alice' },
            { name: 'Bob' },
        ];
        const arrCopy = [...arr];
        pipe.transform(arr, 'name');
        expect(arr).toEqual(arrCopy);
    });

    it('should handle empty array', () => {
        expect(pipe.transform([], 'name')).toEqual([]);
    });
});
import { deepCopy } from './deep-copy';

describe('deepCopy', () => {
    it('should return primitives as is', () => {
        expect(deepCopy(42)).toBe(42);
        expect(deepCopy('hello')).toBe('hello');
        expect(deepCopy(null)).toBeNull();
        expect(deepCopy(undefined)).toBeUndefined();
        expect(deepCopy(true)).toBe(true);
    });

    it('should copy Date objects', () => {
        const date = new Date();
        const copy = deepCopy(date);
        expect(copy).not.toBe(date);
        expect(copy.getTime()).toBe(date.getTime());
    });

    it('should deep copy arrays', () => {
        const arr = [1, { a: 2 }, [3, 4]];
        const copy = deepCopy(arr);
        expect(copy).not.toBe(arr);
        expect(copy).toEqual(arr);
        expect(copy[1]).not.toBe(arr[1]);
        expect(copy[2]).not.toBe(arr[2]);
    });

    it('should deep copy objects', () => {
        const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
        const copy = deepCopy(obj);
        expect(copy).not.toBe(obj);
        expect(copy).toEqual(obj);
        expect(copy.b).not.toBe(obj.b);
        expect(copy.d).not.toBe(obj.d);
    });

    it('should handle nested structures', () => {
        const obj = { a: [{ b: { c: 1 } }] };
        const copy = deepCopy(obj);
        expect(copy).toEqual(obj);
        expect(copy.a[0].b).not.toBe(obj.a[0].b);
    });

    it('should not copy prototype properties', () => {
        function Foo() {
            // intentionally empty
        }
        Foo.prototype.x = 1;
        const foo = new Foo();
        foo.y = 2;
        const copy = deepCopy(foo);
        expect(copy.x).toBeUndefined();
        expect(copy.y).toBe(2);
    });
});
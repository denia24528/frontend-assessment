import { executeCode } from './execute-code';

describe('executeCode', () => {
    it('executes code with no variables', () => {
        const result = executeCode('return 2 + 2;');
        expect(result).toBe(4);
    });

    it('executes code with provided variables', () => {
        const result = executeCode('return a + b;', { a: 3, b: 7 });
        expect(result).toBe(10);
    });

    it('can use $math.sum and $math.mul', () => {
        const code = `
            const s = $math.sum(x, y);
            const m = $math.mul(x, y);
            return { s, m };
        `;
        const result = executeCode(code, { x: 2, y: 5 });
        expect(result).toEqual({ s: 7, m: 10 });
    });

    it('can use $logger to log output', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { /* mock implementation */ });
        executeCode('$logger("hello", 123); return true;');
        expect(logSpy).toHaveBeenCalledWith('hello', 123);
        logSpy.mockRestore();
    });

    it('throws error for invalid code', () => {
        expect(() => executeCode('return unknownVar + 1;')).toThrow();
    });

    it('executes code in strict mode', () => {
        // In strict mode, assigning to an undeclared variable throws
        expect(() => executeCode('undeclared = 5;')).toThrow();
    });

    it('provides correct variable names and values', () => {
        const code = 'return foo * bar;';
        const result = executeCode(code, { foo: 4, bar: 6 });
        expect(result).toBe(24);
    });
});
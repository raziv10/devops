"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
describe('Helpers: object', () => {
    describe('withoutAttrs()', () => {
        const obj = {
            a: 1,
            b: 2
        };
        describe('given one key', () => {
            it('omits correct key', () => {
                expect((0, object_1.withoutAttrs)(obj, ['a'])).toStrictEqual({ b: 2 });
            });
        });
        describe('given multiple keys', () => {
            it('omits correct keys', () => {
                expect((0, object_1.withoutAttrs)(obj, ['a', 'b'])).toStrictEqual({});
            });
        });
        describe('given NO keys', () => {
            it('does not omit anything', () => {
                expect((0, object_1.withoutAttrs)(obj, [])).toStrictEqual({ a: 1, b: 2 });
            });
        });
        describe('given keys DOES NOT match with object keys', () => {
            it('does not omit anything', () => {
                expect((0, object_1.withoutAttrs)(obj, ['c', 'd'])).toStrictEqual({ a: 1, b: 2 });
            });
        });
    });
    describe('listWithoutAttrs()', () => {
        describe('given valid keys', () => {
            it('recursively omit keys from nested array of objects', () => {
                const list = [
                    {
                        a: 1,
                        b: 2
                    },
                    {
                        c: 3,
                        d: 4
                    }
                ];
                expect((0, object_1.listWithoutAttrs)(list, ['a', 'c'])).toStrictEqual([{ b: 2 }, { d: 4 }]);
            });
        });
    });
    describe('withOnlyAttrs()', () => {
        const obj = {
            a: 1,
            b: 2
        };
        describe('given single key', () => {
            it('retains the single key specified in attrs', () => {
                expect((0, object_1.withOnlyAttrs)(obj, ['a'])).toStrictEqual({ a: 1 });
            });
        });
        describe('given multiple keys', () => {
            it('retains the keys specified in attrs', () => {
                expect((0, object_1.withOnlyAttrs)(obj, ['a', 'b'])).toStrictEqual(obj);
            });
        });
        describe('given none of the keys are present', () => {
            it('returns an empty object', () => {
                expect((0, object_1.withOnlyAttrs)(obj, ['c', 'd'])).toStrictEqual({});
            });
        });
        describe('given there are some unavailable keys', () => {
            it('retains keys available to object', () => {
                expect((0, object_1.withOnlyAttrs)(obj, ['a', 'c'])).toStrictEqual({ a: 1 });
            });
        });
        describe('given keys list is empty', () => {
            it('returns an empty object', () => {
                expect((0, object_1.withOnlyAttrs)(obj, [])).toStrictEqual({});
            });
        });
    });
});
//# sourceMappingURL=object.test.js.map
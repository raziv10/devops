"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypt_1 = require("./crypt");
describe('Crypt', () => {
    describe('hash()', () => {
        describe('given valid string', () => {
            it('generates a hash', () => __awaiter(void 0, void 0, void 0, function* () {
                const inputText = 'test';
                const generatedHash = yield (0, crypt_1.hash)(inputText);
                expect(generatedHash).not.toBeNull();
            }));
        });
    });
    describe('compareWithHashValue()', () => {
        describe('given valid string', () => {
            it('matches strings', () => __awaiter(void 0, void 0, void 0, function* () {
                const string = 'test';
                const expectedHashString = yield (0, crypt_1.hash)(string);
                const result = yield (0, crypt_1.compareWithHashValue)(string, expectedHashString);
                expect(result).toEqual(true);
            }));
        });
        describe('given INVALID string', () => {
            it('does not matches strings', () => __awaiter(void 0, void 0, void 0, function* () {
                const string = 'test';
                const randomString = 'testing';
                const expectedHashString = yield (0, crypt_1.hash)(string);
                const result = yield (0, crypt_1.compareWithHashValue)(randomString, expectedHashString);
                expect(result).toEqual(false);
            }));
        });
    });
});
//# sourceMappingURL=crypt.test.js.map
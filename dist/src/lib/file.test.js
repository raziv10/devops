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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = __importDefault(require("./file"));
describe('FileManager:', () => {
    describe('readFile', () => {
        describe('given correct path to read file', () => {
            it('returns the text of file', () => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield new file_1.default().readFile('./test/fixtures/readfile.txt');
                expect(data).toEqual('Read file to test\n');
            }));
        });
    });
    describe('given INCORRECT path to read file', () => {
        it('rejects with error', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(new file_1.default().readFile('./readFile.txt')).rejects;
        }));
    });
});
//# sourceMappingURL=file.test.js.map
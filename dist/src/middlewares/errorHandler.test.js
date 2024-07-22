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
const sinon_1 = __importDefault(require("sinon"));
const errorHandler_1 = require("./errorHandler");
const http_status_codes_1 = require("http-status-codes");
describe('handleErrorMiddleware: ', () => {
    let mockExpressRequest;
    let mockExpressResponse;
    let mockNextFunction;
    let err;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mockExpressRequest = {};
        mockExpressResponse = {};
        mockNextFunction = () => { };
        err = {};
    }));
    describe('given payload is empty', () => {
        it('throws 400 error', () => __awaiter(void 0, void 0, void 0, function* () {
            mockExpressRequest.method = 'POST';
            mockExpressRequest.body = {};
            mockExpressRequest.is = (arg) => {
                return 'true';
            };
            mockExpressResponse.status = sinon_1.default.stub().callsFake((statusArg) => {
                return {
                    json: sinon_1.default.stub().callsFake((replyArg) => {
                        return { status: statusArg, body: replyArg };
                    })
                };
            });
            const data = (0, errorHandler_1.emptyBody)(mockExpressRequest, mockExpressResponse, mockNextFunction);
            expect(data).toStrictEqual({
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                body: {
                    message: 'Payload is invalid.'
                }
            });
        }));
    });
    describe('given requested resource is not found', () => {
        it('throws 404 error', () => __awaiter(void 0, void 0, void 0, function* () {
            mockExpressResponse.status = sinon_1.default.stub().callsFake((statusArg) => {
                return {
                    json: sinon_1.default.stub().callsFake((replyArg) => {
                        return { status: statusArg, body: replyArg };
                    })
                };
            });
            const data = (0, errorHandler_1.notFoundHandler)(err, mockExpressRequest, mockExpressResponse, mockNextFunction);
            expect(data).toStrictEqual({
                status: http_status_codes_1.StatusCodes.NOT_FOUND,
                body: {
                    message: 'Requested resource is not found'
                }
            });
        }));
    });
});
//# sourceMappingURL=errorHandler.test.js.map
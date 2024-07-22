"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jwt = __importStar(require("../lib/jwt"));
const users_1 = require("../../test/factories/users");
const auth_1 = __importDefault(require("./auth"));
const object_1 = require("../helpers/object");
describe('authentication middleware', () => {
    let mockExpressRequest;
    let mockExpressResponse;
    let mockNextFunction;
    let token;
    let user;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mockExpressRequest = {};
        mockExpressResponse = {};
        mockNextFunction = () => { };
        user = (0, users_1.userFactory)();
        token = yield jwt.generateAccessToken(user);
    }));
    describe('given there is NO token sent', () => {
        it('throws unauthorized error', () => __awaiter(void 0, void 0, void 0, function* () {
            mockExpressRequest.method = 'POST';
            mockExpressRequest.body = {};
            mockExpressRequest.is = (arg) => {
                return 'true';
            };
            mockExpressRequest.headers = {};
            mockExpressResponse.status = sinon_1.default.stub().callsFake((statusArg) => {
                return {
                    json: sinon_1.default.stub().callsFake((replyArg) => {
                        return { status: statusArg, body: replyArg };
                    })
                };
            });
            const response = yield (0, auth_1.default)(mockExpressRequest, mockExpressResponse, mockNextFunction);
            expect(response).toStrictEqual({
                status: 401,
                body: {
                    message: 'No authorization header set'
                }
            });
        }));
    });
    describe('given token is INVALID', () => {
        it('throws unauthorized error', () => __awaiter(void 0, void 0, void 0, function* () {
            mockExpressRequest.headers = { authorization: `random_token ${token}` };
            mockExpressResponse.status = sinon_1.default.stub().callsFake((statusArg) => {
                return {
                    json: sinon_1.default.stub().callsFake((replyArg) => {
                        return { status: statusArg, body: replyArg };
                    })
                };
            });
            const response = yield (0, auth_1.default)(mockExpressRequest, mockExpressResponse, mockNextFunction);
            expect(response).toStrictEqual({
                status: 401,
                body: {
                    message: "Authorization header doesn't include a Bearer token"
                }
            });
        }));
    });
    describe('given token is valid', () => {
        it('sets the decoded user value to request object', () => __awaiter(void 0, void 0, void 0, function* () {
            mockExpressRequest.headers = { authorization: `Bearer ${token}` };
            mockExpressResponse.status = sinon_1.default.stub().callsFake((statusArg) => {
                return {
                    send: sinon_1.default.stub().callsFake((replyArg) => {
                        return { status: statusArg, body: replyArg };
                    })
                };
            });
            process.env.accessTokenSecret = 'ENTER_ACCESS_TOKEN_SALT_HERE';
            yield (0, auth_1.default)(mockExpressRequest, mockExpressResponse, mockNextFunction);
            expect((0, object_1.withoutAttrs)(mockExpressRequest.user, ['exp', 'iat', 'createdAt', 'updatedAt'])).toStrictEqual((0, object_1.withoutAttrs)(user, ['createdAt', 'updatedAt']));
        }));
    });
});
//# sourceMappingURL=auth.test.js.map
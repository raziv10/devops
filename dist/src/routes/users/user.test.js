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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importStar(require("../../server"));
const users_1 = __importDefault(require("../../repositories/users"));
const users_2 = require("../../../test/factories/users");
describe('User post API:', () => {
    describe('given valid params', () => {
        it('returns created user with status 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = (0, users_2.userFactory)();
            const userPayload = {
                name: user.name,
                email: 'unique.user@noveltytechnology.com.co',
                password: user.password
            };
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/v1/users')
                .send({ email: userPayload.email, password: userPayload.password, name: userPayload.name });
            expect(response.statusCode).toBe(201);
            expect(response.body.name).toBe(user.name);
            expect(response.body.email).toBe('unique.user@noveltytechnology.com.co');
        }));
    });
    describe('given email is NOT unique', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        const userRepository = new users_1.default();
        it('returns with unprocessable entity error', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = (0, users_2.userFactory)();
            const userPayload = {
                name: user.name,
                email: 'dev@noveltytechnology.com.co',
                password: user.password
            };
            yield userRepository.createUser(userPayload);
            (0, supertest_1.default)(server_1.default)
                .post('/api/v1/users')
                .send({ email: userPayload.email, password: userPayload.password, name: userPayload.name })
                .end((err, res) => {
                expect(res.statusCode).toBe(500);
            });
        }));
    });
});
//# sourceMappingURL=user.test.js.map
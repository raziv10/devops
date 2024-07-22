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
const users_1 = __importDefault(require("../../services/users/users"));
const users_2 = require("../../../test/factories/users");
const users_3 = __importDefault(require("../../repositories/users"));
const server_1 = __importStar(require("../../server"));
describe('User login test', () => {
    describe('given valid credentials', () => {
        it('returns tokens logging in user', () => __awaiter(void 0, void 0, void 0, function* () {
            const userManager = new users_1.default(new users_3.default());
            const user = (0, users_2.userFactory)();
            const userPayload = {
                name: user.name,
                email: 'unique.user@gmail.com',
                password: user.password
            };
            yield userManager.create(userPayload);
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/v1/auth/login')
                .send({ email: 'unique.user@gmail.com', password: user.password });
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
            expect(response.body.user.email).toBe('unique.user@gmail.com');
        }));
    });
    describe('given INVALID credentials', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        const user = (0, users_2.userFactory)();
        it('throws unprocessable entity error', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/v1/auth/login')
                .send({ email: 'unique.user@gmail.com', password: user.password });
            expect(response.statusCode).toBe(422);
        }));
    });
});
//# sourceMappingURL=auth.test.js.map
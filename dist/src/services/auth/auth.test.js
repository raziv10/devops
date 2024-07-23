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
const users_1 = require("../../../test/factories/users");
const users_2 = __importDefault(require("../../repositories/users"));
const users_3 = __importDefault(require("../users/users"));
const auth_1 = __importDefault(require("./auth"));
describe('Auth:', () => {
    describe('login', () => {
        const userRepository = new users_2.default();
        const userManager = new users_3.default(userRepository);
        const authManager = new auth_1.default(userRepository);
        describe('given correct credentials', () => {
            it('returns user', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_1.userFactory)();
                const password = 'password';
                const userPayload = { name: user.name, email: user.email, password: password };
                yield userManager.create(userPayload);
                const data = yield authManager.login({
                    email: user.email,
                    password
                });
                expect(data).not.toBeNull();
                expect(data === null || data === void 0 ? void 0 : data.user.email).toEqual(user.email);
                expect(data === null || data === void 0 ? void 0 : data.user.name).toEqual(user.name);
                expect(data === null || data === void 0 ? void 0 : data.accessToken).not.toBeNull();
                expect(data === null || data === void 0 ? void 0 : data.refreshToken).not.toBeNull();
            }));
        });
        describe('given there is NO user as credential', () => {
            it('throws custom error', () => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(authManager.login({ email: 'dev@noveltytechnology.com.co', password: 'random' })).rejects.toHaveProperty('message', 'Provided email or password does not match.');
            }));
        });
        describe('given NO credentials are passed', () => {
            it('throws bad request error', () => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(authManager.login({ email: '', password: '' })).rejects.toHaveProperty('message', 'Provided email or password does not match.');
            }));
        });
        describe('given passed password is INCORRECT', () => {
            it('throws custom error', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_1.userFactory)();
                const userPayload = {
                    name: user.name,
                    email: 'user@noveltytechnology.com.co',
                    password: user.password
                };
                yield userManager.create(userPayload);
                yield expect(authManager.login({
                    email: 'user@noveltytechnology.com.co',
                    password: '1234567'
                })).rejects.toHaveProperty('message', 'Provided email or password does not match.');
            }));
        });
    });
});
//# sourceMappingURL=auth.test.js.map
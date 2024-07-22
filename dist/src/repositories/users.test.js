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
const database_1 = __importDefault(require("../config/database"));
const users_1 = __importDefault(require("./users"));
const users_2 = require("../../test/factories/users");
describe('User Repository', () => {
    const userRepository = new users_1.default();
    describe('create', () => {
        describe('given valid params', () => {
            it('creates user', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_2.userFactory)();
                const userEmail = 'dev@noveltytechnology.com.co';
                const userPayload = Object.assign(Object.assign({}, user), { email: userEmail });
                const createdUser = yield userRepository.createUser(userPayload);
                const data = yield database_1.default.user.findUnique({ where: { id: createdUser.id } });
                expect(data).not.toBeNull();
                expect(data === null || data === void 0 ? void 0 : data.email).toEqual(userEmail);
            }));
        });
    });
    describe('findByEmail', () => {
        describe('given user exists', () => {
            it('returns user', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_2.userFactory)();
                const userEmail = 'dev@noveltytechnology.com.co';
                const userPayload = Object.assign(Object.assign({}, user), { email: userEmail });
                const createdUser = yield database_1.default.user.create({ data: userPayload });
                const data = yield userRepository.findByEmail(userEmail);
                expect(data).not.toBeNull();
                expect(data === null || data === void 0 ? void 0 : data.id).toEqual(createdUser.id);
                expect(data === null || data === void 0 ? void 0 : data.email).toEqual(userEmail);
            }));
        });
        describe('given user does not exists', () => {
            it('returns null', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_2.userFactory)();
                const userEmail = 'dev@noveltytechnology.com.co';
                const userPayload = Object.assign(Object.assign({}, user), { email: userEmail });
                yield database_1.default.user.create({ data: userPayload });
                const data = yield userRepository.findByEmail('other.user@noveltytechnology.com.co');
                expect(data).toBeNull();
            }));
        });
    });
});
//# sourceMappingURL=users.test.js.map
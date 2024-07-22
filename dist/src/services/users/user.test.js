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
const users_2 = __importDefault(require("./users"));
const users_3 = __importDefault(require("../../repositories/users"));
describe('UserManager:', () => {
    const userRepository = new users_3.default();
    const userManager = new users_2.default(userRepository);
    describe('createUser', () => {
        describe('given valid params', () => {
            const user = (0, users_1.userFactory)();
            it('creates the user successfully with encrypted password', () => __awaiter(void 0, void 0, void 0, function* () {
                const userPayload = {
                    name: 'dev noveltytechnology',
                    email: 'dev@noveltytechnology.comhq.co',
                    password: user.password
                };
                const createdUser = yield userManager.create(userPayload);
                expect(createdUser.email).toEqual('dev@noveltytechnology.comhq.co');
                expect(createdUser.name).toEqual('dev noveltytechnology');
            }));
        });
        describe('given email is NOT unique', () => {
            it('throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_1.userFactory)();
                const userPayload = {
                    name: user.name,
                    email: 'unique.user@noveltytechnology.com.co',
                    password: user.password
                };
                yield userManager.create(userPayload);
                yield expect(userManager.create(userPayload)).rejects.toHaveProperty('message', 'Account with this email already exists.');
            }));
        });
    });
});
//# sourceMappingURL=user.test.js.map
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
const baseQuery_1 = __importDefault(require("./baseQuery"));
const database_1 = __importDefault(require("../config/database"));
const users_1 = __importDefault(require("../repositories/users"));
const pets_1 = require("../../test/factories/pets");
const users_2 = require("../../test/factories/users");
describe('PetQuery', () => {
    describe('given pagination is enabled', () => {
        const userRepository = new users_1.default();
        it('returns valid paginated data', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = (0, users_2.userFactory)();
            const createdUser = yield userRepository.createUser(user);
            const petPayload = [
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { userId: createdUser.id })
            ];
            yield database_1.default.pet.createMany({ data: petPayload });
            const paginationQuery = new baseQuery_1.default({
                paginationParams: { currentPage: 1, maxRows: 2 },
                databaseModel: database_1.default.pet
            });
            const data = yield paginationQuery.query();
            expect(data.length).toEqual(2);
        }));
    });
    describe('given pagination is DISABLED', () => {
        const userRepository = new users_1.default();
        it('returns all data without pagination', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = (0, users_2.userFactory)();
            const createdUser = yield userRepository.createUser(user);
            const petPayload = [
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { userId: createdUser.id })
            ];
            yield database_1.default.pet.createMany({ data: petPayload });
            const paginationQuery = new baseQuery_1.default({
                isPaginated: false,
                databaseModel: database_1.default.pet
            });
            const data = yield paginationQuery.query();
            expect(data.length).toEqual(3);
        }));
    });
});
//# sourceMappingURL=baseQuery.test.js.map
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
const petQuery_1 = __importDefault(require("./petQuery"));
const database_1 = __importDefault(require("../../config/database"));
const users_1 = __importDefault(require("../../repositories/users"));
const pets_1 = require("../../../test/factories/pets");
const users_2 = require("../../../test/factories/users");
const client_1 = require("@prisma/client");
describe('PetQuery', () => {
    describe('given name Params', () => {
        it('returns filtered data', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = (0, users_2.userFactory)();
            const userRepository = new users_1.default();
            const createdUser = yield userRepository.createUser(user);
            const petPayload = [
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Tom', userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Tom', userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { userId: createdUser.id })
            ];
            yield database_1.default.pet.createMany({ data: petPayload });
            const paginationQuery = new petQuery_1.default({
                paginationParams: { currentPage: 1, maxRows: 2 },
                filters: { name: 'Tom' }
            });
            const data = yield paginationQuery.listAll();
            expect(data.length).toEqual(2);
        }));
    });
    describe('given species Params', () => {
        it('returns filtered data', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = (0, users_2.userFactory)();
            const userRepository = new users_1.default();
            const createdUser = yield userRepository.createUser(user);
            const petPayload = [
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Tom', species: client_1.Species.cat, userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Tom', species: client_1.Species.cat, userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Bruno', species: client_1.Species.dog, userId: createdUser.id })
            ];
            yield database_1.default.pet.createMany({ data: petPayload });
            const paginationQuery = new petQuery_1.default({
                paginationParams: { currentPage: 1, maxRows: 2 },
                filters: { species: client_1.Species.cat }
            });
            const data = yield paginationQuery.listAll();
            expect(data.length).toEqual(2);
        }));
    });
    describe('given species and name Params', () => {
        it('returns filtered data', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = (0, users_2.userFactory)();
            const userRepository = new users_1.default();
            const createdUser = yield userRepository.createUser(user);
            const petPayload = [
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Tom', species: client_1.Species.cat, userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Butch', species: client_1.Species.cat, userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Bruno', species: client_1.Species.dog, userId: createdUser.id })
            ];
            yield database_1.default.pet.createMany({ data: petPayload });
            const paginationQuery = new petQuery_1.default({
                paginationParams: { currentPage: 1, maxRows: 2 },
                filters: { name: 'Tom', species: client_1.Species.cat }
            });
            const data = yield paginationQuery.listAll();
            expect(data.length).toEqual(1);
        }));
    });
    describe('given no Params', () => {
        it('returns all data', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = (0, users_2.userFactory)();
            const userRepository = new users_1.default();
            const createdUser = yield userRepository.createUser(user);
            const petPayload = [
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Tom', species: client_1.Species.cat, userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Butch', species: client_1.Species.cat, userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { name: 'Bruno', species: client_1.Species.dog, userId: createdUser.id })
            ];
            yield database_1.default.pet.createMany({ data: petPayload });
            const paginationQuery = new petQuery_1.default({
                isPaginated: false
            });
            const data = yield paginationQuery.listAll();
            expect(data.length).toEqual(3);
        }));
    });
});
//# sourceMappingURL=petQuery.test.js.map
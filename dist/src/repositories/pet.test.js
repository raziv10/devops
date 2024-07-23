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
const pets_1 = __importDefault(require("./pets"));
const users_1 = require("../../test/factories/users");
const pets_2 = require("../../test/factories/pets");
const client_1 = require("@prisma/client");
describe('Pet Repository', () => {
    const petRepository = new pets_1.default();
    describe('create', () => {
        describe('given valid params', () => {
            it('creates pets', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_1.userFactory)();
                const userEmail = 'dev@noveltytechnology.com.co';
                const userPayload = Object.assign(Object.assign({}, user), { email: userEmail });
                const createdUser = yield database_1.default.user.create({ data: userPayload });
                const pets = (0, pets_2.petFactory)();
                const petPayload = Object.assign(Object.assign({}, pets), { user: { connect: { id: createdUser.id } } });
                const createdPet = yield petRepository.create(petPayload);
                const data = yield database_1.default.pet.findUnique({ where: { id: createdPet.id } });
                expect(data).not.toBeNull();
                expect(data === null || data === void 0 ? void 0 : data.userId).toBe(createdUser.id);
            }));
        });
        describe('given INVALID params', () => {
            it('rejects with error', () => __awaiter(void 0, void 0, void 0, function* () {
                const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { user: { connect: { id: 3 } } });
                yield expect(petRepository.create(petPayload)).rejects.toThrow();
            }));
        });
    });
    describe('update', () => {
        describe('given valid params', () => {
            it('updates pets', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_1.userFactory)();
                const userEmail = 'dev@noveltytechnology.com.co';
                const userPayload = Object.assign(Object.assign({}, user), { email: userEmail });
                const createdUser = yield database_1.default.user.create({ data: userPayload });
                const pets = (0, pets_2.petFactory)();
                const petPayload = Object.assign(Object.assign({}, pets), { species: client_1.Species.dog, user: { connect: { id: createdUser.id } } });
                const createdPet = yield petRepository.create(petPayload);
                const updatePayload = { species: client_1.Species.cat, name: 'Tom' };
                const updatedPet = yield petRepository.update({ id: createdPet.id, userId: createdUser.id }, updatePayload);
                expect(updatedPet.name).toBe('Tom');
                expect(updatedPet.species).toBe(client_1.Species.cat);
            }));
        });
        describe('given INVALID params', () => {
            it('throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                const updatePayload = { species: client_1.Species.cat, name: 'Tom' };
                yield expect(petRepository.update({ id: 1, userId: 2 }, updatePayload)).rejects.toThrow();
            }));
        });
    });
    describe('remove', () => {
        describe('given valid params', () => {
            it('update pets status to unavailable', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_1.userFactory)();
                const userEmail = 'dev@noveltytechnology.com.co';
                const userPayload = Object.assign(Object.assign({}, user), { email: userEmail });
                const createdUser = yield database_1.default.user.create({ data: userPayload });
                const pets = (0, pets_2.petFactory)();
                const petPayload = Object.assign(Object.assign({}, pets), { species: client_1.Species.dog, user: { connect: { id: createdUser.id } } });
                const createdPet = yield petRepository.create(petPayload);
                const removedPet = yield petRepository.remove(createdPet.id);
                expect(removedPet.available).toBe(false);
            }));
        });
        describe('given INVALID params', () => {
            it('throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(petRepository.remove(2)).rejects.toThrow();
            }));
        });
    });
    describe('findById', () => {
        describe('given valid params', () => {
            it('returns the pet', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = (0, users_1.userFactory)();
                const userEmail = 'dev@noveltytechnology.com.co';
                const userPayload = Object.assign(Object.assign({}, user), { email: userEmail });
                const createdUser = yield database_1.default.user.create({ data: userPayload });
                const pets = (0, pets_2.petFactory)();
                const petPayload = Object.assign(Object.assign({}, pets), { species: client_1.Species.dog, user: { connect: { id: createdUser.id } } });
                const createdPet = yield petRepository.create(petPayload);
                const pet = yield petRepository.findById(createdPet.id);
                expect(pet).not.toBeNull();
                expect(pet === null || pet === void 0 ? void 0 : pet.species).toBe(client_1.Species.dog);
            }));
        });
        describe('given INVALID params', () => {
            it('returns null', () => __awaiter(void 0, void 0, void 0, function* () {
                const pet = yield petRepository.findById(3);
                expect(pet).toBeNull();
            }));
        });
    });
});
//# sourceMappingURL=pet.test.js.map
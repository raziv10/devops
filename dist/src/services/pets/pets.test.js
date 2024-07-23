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
const pets_1 = require("../../../test/factories/pets");
const pets_2 = __importDefault(require("./pets"));
const pets_3 = __importDefault(require("../../repositories/pets"));
const users_1 = __importDefault(require("../../repositories/users"));
const client_1 = require("@prisma/client");
const notFoundError_1 = __importDefault(require("../../lib/notFoundError"));
describe('UserManager:', () => {
    const userRepository = new users_1.default();
    const petRepository = new pets_3.default();
    const petManager = new pets_2.default(petRepository);
    describe('createPet', () => {
        describe('given valid params', () => {
            it('creates the pet records successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                const userPayload = {
                    name: 'dev noveltytechnology',
                    email: 'dev@noveltytechnology.comhq.co',
                    password: 'random'
                };
                const createdUser = yield userRepository.createUser(userPayload);
                const petPayload = Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { user: { connect: { id: createdUser.id } }, name: 'Tom', species: client_1.Species.cat });
                const createdPet = yield petManager.create(petPayload);
                expect(createdPet.species).toEqual(client_1.Species.cat);
                expect(createdPet.name).toEqual('Tom');
            }));
        });
    });
    describe('updatePet', () => {
        describe('given valid params', () => {
            it('updates the pet records successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                const userPayload = {
                    name: 'dev noveltytechnology',
                    email: 'dev@noveltytechnology.comhq.co',
                    password: 'random'
                };
                const createdUser = yield userRepository.createUser(userPayload);
                const petPayload = Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { user: { connect: { id: createdUser.id } }, name: 'Tom', species: client_1.Species.cat });
                const createdPet = yield petManager.create(petPayload);
                const updatePayload = { species: client_1.Species.dog, name: 'Bruno' };
                const updatedPet = yield petManager.update({
                    id: createdPet.id,
                    userId: createdUser.id,
                    payload: updatePayload
                });
                expect(updatedPet.species).toEqual(client_1.Species.dog);
                expect(updatedPet.name).toEqual('Bruno');
            }));
        });
        describe('given INVALID entity that does not exist', () => {
            it('throws not found error', () => __awaiter(void 0, void 0, void 0, function* () {
                const updatePayload = { species: client_1.Species.dog, name: 'Bruno' };
                yield expect(petManager.update({
                    id: 1,
                    userId: 2,
                    payload: updatePayload
                })).rejects.toBeInstanceOf(notFoundError_1.default);
            }));
        });
    });
    describe('removePet', () => {
        describe('given valid params', () => {
            it('removes the pet from availability', () => __awaiter(void 0, void 0, void 0, function* () {
                const userPayload = {
                    name: 'dev noveltytechnology',
                    email: 'dev@noveltytechnology.comhq.co',
                    password: 'random'
                };
                const createdUser = yield userRepository.createUser(userPayload);
                const petPayload = Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { user: { connect: { id: createdUser.id } }, name: 'Tom', species: client_1.Species.cat });
                const createdPet = yield petManager.create(petPayload);
                const updatedPet = yield petManager.remove({
                    id: createdPet.id,
                    userId: createdUser.id
                });
                expect(updatedPet.available).toBe(false);
            }));
        });
        describe('given INVALID entity that does not exist', () => {
            it('throws not found error', () => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(petManager.remove({
                    id: 1,
                    userId: 2
                })).rejects.toBeInstanceOf(notFoundError_1.default);
            }));
        });
    });
    describe('findPetDetail', () => {
        describe('given valid params', () => {
            it('returns the pet detail', () => __awaiter(void 0, void 0, void 0, function* () {
                const userPayload = {
                    name: 'dev noveltytechnology',
                    email: 'dev@noveltytechnology.comhq.co',
                    password: 'random'
                };
                const createdUser = yield userRepository.createUser(userPayload);
                const petPayload = Object.assign(Object.assign({}, (0, pets_1.petFactory)()), { user: { connect: { id: createdUser.id } }, name: 'Tom', species: client_1.Species.cat });
                const createdPet = yield petManager.create(petPayload);
                const pet = yield petManager.findDetail(createdPet.id);
                expect(pet).not.toBeNull();
                expect(pet.species).toBe(client_1.Species.cat);
                expect(pet.name).toBe('Tom');
            }));
        });
        describe('given INVALID entity that does not exist', () => {
            it('throws not found error', () => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(petManager.findDetail(3)).rejects.toBeInstanceOf(notFoundError_1.default);
            }));
        });
    });
});
//# sourceMappingURL=pets.test.js.map
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
const client_1 = require("@prisma/client");
const server_1 = __importStar(require("../../server"));
const database_1 = __importDefault(require("../../config/database"));
const jwt = __importStar(require("../../lib/jwt"));
const users_1 = __importDefault(require("../../repositories/users"));
const users_2 = __importDefault(require("../../services/users/users"));
const pets_1 = __importDefault(require("../../repositories/pets"));
const users_3 = require("../../../test/factories/users");
const pets_2 = require("../../../test/factories/pets");
describe('Pets post API:', () => {
    let token;
    let user;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        user = Object.assign(Object.assign({}, (0, users_3.userFactory)()), { email: 'unique.user@noveltytechnology.com.co' });
        token = yield jwt.generateAccessToken(user);
    }));
    describe('given valid params', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('returns created pet with status 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const userManager = new users_2.default(userRepository);
            yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat });
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/v1/pets').send(petPayload).set('authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(201);
            expect(response.body.name).toBe('Tom');
            expect(response.body.species).toBe(client_1.Species.cat);
        }));
    });
    describe('given NO authorization header is passed', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws unauthorized error', () => __awaiter(void 0, void 0, void 0, function* () {
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat });
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/v1/pets').send(petPayload);
            expect(response.statusCode).toBe(401);
        }));
    });
    describe('given INVALID payload object', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws bad request error', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const userManager = new users_2.default(userRepository);
            yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: 'mouse' });
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/v1/pets').set('authorization', `Bearer ${token}`).send(petPayload);
            expect(response.statusCode).toBe(400);
        }));
    });
});
describe('Pets PUT API:', () => {
    let token;
    let user;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        user = Object.assign(Object.assign({}, (0, users_3.userFactory)()), { email: 'unique.user@noveltytechnology.com.co' });
        token = yield jwt.generateAccessToken(user);
    }));
    describe('given valid params', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('returns updated pet with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const petRepository = new pets_1.default();
            const userManager = new users_2.default(userRepository);
            const createdUser = yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat, user: { connect: { id: createdUser.id } } });
            const createdPet = yield petRepository.create(petPayload);
            const updatePayload = { species: client_1.Species.dog, name: 'Bruno' };
            const response = yield (0, supertest_1.default)(server_1.default)
                .put(`/api/v1/pets/${createdPet.id}`)
                .send(updatePayload)
                .set('authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe('Bruno');
            expect(response.body.species).toBe(client_1.Species.dog);
        }));
    });
    describe('given NO authorization header is passed', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws unauthorized error', () => __awaiter(void 0, void 0, void 0, function* () {
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat });
            const response = yield (0, supertest_1.default)(server_1.default).put('/api/v1/pets/1').send(petPayload);
            expect(response.statusCode).toBe(401);
        }));
    });
    describe('given INVALID payload object', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws bad request error', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const petRepository = new pets_1.default();
            const userManager = new users_2.default(userRepository);
            const createdUser = yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat, user: { connect: { id: createdUser.id } } });
            const createdPet = yield petRepository.create(petPayload);
            const updatePayload = { name: 'Tom', species: 'mouse' };
            const response = yield (0, supertest_1.default)(server_1.default)
                .put(`/api/v1/pets/${createdPet.id}`)
                .set('authorization', `Bearer ${token}`)
                .send(updatePayload);
            expect(response.statusCode).toBe(400);
        }));
    });
    describe('given entity that does NOT EXIST', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws not found error', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const petRepository = new pets_1.default();
            const userManager = new users_2.default(userRepository);
            const createdUser = yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat, user: { connect: { id: createdUser.id } } });
            yield petRepository.create(petPayload);
            const updatePayload = { name: 'Bruno', species: client_1.Species.dog };
            const response = yield (0, supertest_1.default)(server_1.default)
                .put(`/api/v1/pets/4`)
                .set('authorization', `Bearer ${token}`)
                .send(updatePayload);
            expect(response.statusCode).toBe(404);
        }));
    });
});
describe('Pets DELETE API:', () => {
    let token;
    let user;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        user = Object.assign(Object.assign({}, (0, users_3.userFactory)()), { email: 'unique.user@noveltytechnology.com.co' });
        token = yield jwt.generateAccessToken(user);
    }));
    describe('given valid params', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('returns deleted pet with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const petRepository = new pets_1.default();
            const userManager = new users_2.default(userRepository);
            const createdUser = yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat, user: { connect: { id: createdUser.id } } });
            const createdPet = yield petRepository.create(petPayload);
            const response = yield (0, supertest_1.default)(server_1.default)
                .delete(`/api/v1/pets/${createdPet.id}`)
                .set('authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.available).toBe(false);
        }));
    });
    describe('given NO authorization header is passed', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws unauthorized error', () => __awaiter(void 0, void 0, void 0, function* () {
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat });
            const response = yield (0, supertest_1.default)(server_1.default).put('/api/v1/pets/1').send(petPayload);
            expect(response.statusCode).toBe(401);
        }));
    });
    describe('given entity that does NOT EXIST', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws not found error', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const petRepository = new pets_1.default();
            const userManager = new users_2.default(userRepository);
            const createdUser = yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat, user: { connect: { id: createdUser.id } } });
            yield petRepository.create(petPayload);
            const response = yield (0, supertest_1.default)(server_1.default).delete(`/api/v1/pets/4`).set('authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(404);
        }));
    });
});
describe('Pets GET detail API:', () => {
    let token;
    let user;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        user = Object.assign(Object.assign({}, (0, users_3.userFactory)()), { email: 'unique.user@noveltytechnology.com.co' });
        token = yield jwt.generateAccessToken(user);
    }));
    describe('given valid params', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('returns  pet with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const petRepository = new pets_1.default();
            const userManager = new users_2.default(userRepository);
            const createdUser = yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat, user: { connect: { id: createdUser.id } } });
            const createdPet = yield petRepository.create(petPayload);
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/pets/${createdPet.id}`).set('authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe('Tom');
            expect(response.body.species).toBe(client_1.Species.cat);
            expect(response.body.extraInformation).toBe('This is extra information');
        }));
    });
    describe('given NO authorization header is passed', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws unauthorized error', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/pets/1');
            expect(response.statusCode).toBe(401);
        }));
    });
    describe('given entity that does NOT EXIST', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws not found error', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const petRepository = new pets_1.default();
            const userManager = new users_2.default(userRepository);
            const createdUser = yield userManager.create(user);
            const petPayload = Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { name: 'Tom', species: client_1.Species.cat, user: { connect: { id: createdUser.id } } });
            yield petRepository.create(petPayload);
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/pets/4`).set('authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(404);
        }));
    });
});
describe('Pets GET list API:', () => {
    let token;
    let user;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        user = Object.assign(Object.assign({}, (0, users_3.userFactory)()), { email: 'unique.user@noveltytechnology.com.co' });
        token = yield jwt.generateAccessToken(user);
    }));
    describe('given only valid pagination params', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('returns all data with Pagination', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = new users_1.default();
            const user = (0, users_3.userFactory)();
            const createdUser = yield userRepository.createUser(user);
            const petPayload = [
                Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { userId: createdUser.id }),
                Object.assign(Object.assign({}, (0, pets_2.petFactory)()), { userId: createdUser.id })
            ];
            yield database_1.default.pet.createMany({ data: petPayload });
            const response = yield (0, supertest_1.default)(server_1.default)
                .get(`/api/v1/pets/?currentPage=1&maxRows=2`)
                .set('authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.pets.length).toBe(2);
            expect(response.body.meta).toEqual({
                totalRowCount: 3,
                totalPageCount: 2,
                perPageCount: 2,
                currentPage: 1
            });
        }));
    });
    describe('given NO authorization header is passed', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('throws unauthorized error', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/v1/pets/');
            expect(response.statusCode).toBe(401);
        }));
    });
    describe('given there no records', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield server_1.server.close();
        }));
        it('returns empty array', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/pets`).set('authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.pets.length).toBe(0);
            expect(response.body.meta).toEqual({
                totalRowCount: 0,
                totalPageCount: 0,
                perPageCount: 10,
                currentPage: 1
            });
        }));
    });
});
//# sourceMappingURL=pets.test.js.map
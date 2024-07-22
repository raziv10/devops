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
class PetRepository {
    constructor() {
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            const pet = yield database_1.default.pet.create({ data: payload });
            return pet;
        });
        this.update = (updateQueryParams, payload) => __awaiter(this, void 0, void 0, function* () {
            const { id, userId } = updateQueryParams;
            const updateQuery = { where: { id, userId } };
            const updatedResult = yield database_1.default.pet.update(Object.assign(Object.assign({}, updateQuery), { data: payload }));
            return updatedResult;
        });
        this.findWithUserId = (id, userId) => __awaiter(this, void 0, void 0, function* () {
            const pet = yield database_1.default.pet.findUnique({ where: { id, userId } });
            return pet;
        });
        this.remove = (id) => __awaiter(this, void 0, void 0, function* () {
            const deleteQuery = { where: { id } };
            const removedPet = yield database_1.default.pet.update(Object.assign(Object.assign({}, deleteQuery), { data: { available: false } }));
            return removedPet;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const pet = yield database_1.default.pet.findUnique({ where: { id } });
            return pet;
        });
    }
}
exports.default = PetRepository;
//# sourceMappingURL=pets.js.map
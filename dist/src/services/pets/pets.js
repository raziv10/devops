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
const notFoundError_1 = __importDefault(require("../../lib/notFoundError"));
class PetManager {
    constructor(petRepository) {
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pets = yield this.petRepository.create(payload);
                return pets;
            }
            catch (error) {
                throw error;
            }
        });
        this.update = (updateParameters) => __awaiter(this, void 0, void 0, function* () {
            const { id, userId, payload } = updateParameters;
            try {
                const existingPet = yield this.petRepository.findWithUserId(id, userId);
                if (!existingPet) {
                    throw new notFoundError_1.default({ message: 'Pet resource not found' });
                }
                const pets = yield this.petRepository.update({ id, userId }, payload);
                return pets;
            }
            catch (error) {
                throw error;
            }
        });
        this.remove = (deleteParameters) => __awaiter(this, void 0, void 0, function* () {
            const { id, userId } = deleteParameters;
            try {
                const existingPet = yield this.petRepository.findWithUserId(id, userId);
                if (!existingPet) {
                    throw new notFoundError_1.default({ message: 'Pet resource not found' });
                }
                const pets = yield this.petRepository.remove(id);
                return pets;
            }
            catch (error) {
                throw error;
            }
        });
        this.findDetail = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pet = yield this.petRepository.findById(id);
                if (!pet) {
                    throw new notFoundError_1.default({ message: 'Pet resource not found' });
                }
                return pet;
            }
            catch (error) {
                throw error;
            }
        });
        this.petRepository = petRepository;
    }
}
exports.default = PetManager;
//# sourceMappingURL=pets.js.map
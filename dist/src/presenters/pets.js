"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("../lib/pagination");
class PetPresenters {
    constructor() { }
    listPets(pets, paginationParams) {
        const meta = (0, pagination_1.getPaginatedMeta)(paginationParams);
        return { pets, meta };
    }
    findDetail(pet) {
        return Object.assign(Object.assign({}, pet), { extraInformation: 'This is extra information' });
    }
}
exports.default = PetPresenters;
//# sourceMappingURL=pets.js.map
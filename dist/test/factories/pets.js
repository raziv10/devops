"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petFactory = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const petFactory = () => ({
    name: faker_1.faker.lorem.word(2),
    species: client_1.Species.cat,
    birthYear: Number(faker_1.faker.string.numeric(4)),
    dateAdded: new Date(),
    photoUrl: faker_1.faker.image.url(),
    available: true
});
exports.petFactory = petFactory;
//# sourceMappingURL=pets.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFactory = void 0;
const faker_1 = require("@faker-js/faker");
const userFactory = () => ({
    id: faker_1.faker.number.int(10000),
    name: faker_1.faker.lorem.word(2),
    email: faker_1.faker.internet.email(),
    password: faker_1.faker.internet.password(),
    emailVerified: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
});
exports.userFactory = userFactory;
//# sourceMappingURL=users.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dbClient = new client_1.PrismaClient({
    errorFormat: 'minimal',
    log: ['query']
});
exports.default = dbClient;
//# sourceMappingURL=database.js.map
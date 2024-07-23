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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const generateDatabaseURL = (schema) => {
    if (!process.env.POSTGRES_DB_CONNECTION_URL) {
        throw new Error('POSTGRES_DB_CONNECTION_URL has not been defined');
    }
    return process.env.POSTGRES_DB_CONNECTION_URL + `?schema=${schema}`;
};
const schemaId = `test-${(0, uuid_1.v4)()}`;
const prismaBinary = (0, path_1.join)(__dirname, '..', '..', '..', 'node_modules', '.bin', 'prisma');
const url = generateDatabaseURL(schemaId);
const prisma = new client_1.PrismaClient({
    datasources: { db: { url } }
});
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    (0, child_process_1.execSync)(`${prismaBinary} db push`, {
        env: Object.assign(Object.assign({}, process.env), { POSTGRES_DB_CONNECTION_URL: generateDatabaseURL(schemaId) })
    });
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
    yield prisma.$disconnect();
}));
exports.default = prisma;
//# sourceMappingURL=database.js.map
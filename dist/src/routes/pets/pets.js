"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pets_1 = __importDefault(require("../../controllers/pets"));
const validate_1 = require("../../middlewares/validate");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const schema_1 = require("./schema");
const petRouter = (0, express_1.Router)();
petRouter.post('/', auth_1.default, (0, validate_1.schema)(schema_1.createSchema), pets_1.default.create);
petRouter.put('/:id', auth_1.default, (0, validate_1.schema)(schema_1.updateSchema), pets_1.default.update);
petRouter.delete('/:id', auth_1.default, pets_1.default.remove);
petRouter.get('/', auth_1.default, pets_1.default.listPets);
petRouter.get('/:id', auth_1.default, pets_1.default.findDetail);
exports.default = petRouter;
//# sourceMappingURL=pets.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
const validator_1 = require("./validator");
describe('Validates Incoming Request Payload', () => {
    describe('validate', () => {
        describe('given valid payload for validation schema', () => {
            it('validates successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                const data = {
                    firstName: 'Random Mike',
                    age: 49
                };
                const schema = Joi.object().keys({
                    firstName: Joi.string(),
                    age: Joi.number()
                });
                yield expect((0, validator_1.validate)(data, schema)).resolves.not.toBeNull();
            }));
        });
        describe('given INVALID type for payload', () => {
            it('throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                const data = {
                    firstName: 'random',
                    age: 'guess'
                };
                const schema = Joi.object().keys({
                    firstName: Joi.string(),
                    age: Joi.number()
                });
                yield expect((0, validator_1.validate)(data, schema)).rejects.toThrow();
            }));
        });
        describe('given INVALID payload', () => {
            it('throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                const data = {
                    age: 49
                };
                const schema = Joi.object().keys({
                    firstName: Joi.string().required(),
                    age: Joi.number()
                });
                yield expect((0, validator_1.validate)(data, schema)).rejects.toThrow();
            }));
        });
    });
});
//# sourceMappingURL=validator.test.js.map
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
const database_1 = __importDefault(require("../../config/database"));
const baseQuery_1 = __importDefault(require("../baseQuery"));
class PetQuery extends baseQuery_1.default {
    constructor(queryParams) {
        super(Object.assign(Object.assign({}, queryParams), { databaseModel: database_1.default.pet }));
        this.filters = queryParams.filters;
    }
    listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildPaginationQueryParams();
            return this.databaseModel.findMany(Object.assign({ where: this.filters }, this.paginationQuery));
        });
    }
}
exports.default = PetQuery;
//# sourceMappingURL=petQuery.js.map
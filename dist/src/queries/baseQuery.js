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
const pagination_1 = require("../lib/pagination");
class BaseQuery {
    constructor(queryParams) {
        var _a;
        this.databaseModel = queryParams.databaseModel;
        this.paginationParams = queryParams.paginationParams;
        this.isPaginated = (_a = queryParams.isPaginated) !== null && _a !== void 0 ? _a : true;
        this.paginationQuery = {};
        this.filterQuery = {};
    }
    query() {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildPaginationQueryParams();
            return this.databaseModel.findMany(Object.assign({ where: Object.assign({}, this.filterQuery) }, this.paginationQuery));
        });
    }
    buildPaginationQueryParams() {
        if (!this.isPaginated)
            return;
        this.paginationQuery = (0, pagination_1.getPaginationParams)(this.paginationParams);
    }
}
exports.default = BaseQuery;
//# sourceMappingURL=baseQuery.js.map
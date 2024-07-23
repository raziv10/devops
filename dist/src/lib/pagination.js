"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedMeta = exports.getPaginationParams = void 0;
const constants_1 = require("../constants/constants");
function getPaginationParams(params = {}) {
    const { maxRows = constants_1.PAGINATION_LIMIT, currentPage = constants_1.PAGINATION_CURRENT_PAGE } = params;
    const skip = (currentPage - 1) * maxRows;
    return { skip, take: maxRows };
}
exports.getPaginationParams = getPaginationParams;
function getPaginatedMeta(params) {
    const { totalRowCount, perPageCount, currentPage } = params;
    const totalPageCount = Math.ceil(totalRowCount / perPageCount);
    return {
        totalRowCount,
        totalPageCount,
        perPageCount,
        currentPage
    };
}
exports.getPaginatedMeta = getPaginatedMeta;
//# sourceMappingURL=pagination.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("./pagination");
describe('Pagination:', () => {
    describe('getPaginationParams', () => {
        describe('given no pagination params', () => {
            it('returns default pagination query parameters', () => {
                const paginationParams = (0, pagination_1.getPaginationParams)();
                expect(paginationParams).toEqual({ skip: 0, take: 10 });
            });
        });
    });
    describe('getPaginationMeta', () => {
        describe('given valid params', () => {
            it('returns correct pagination meta results', () => {
                const paginationMetaParams = { totalRowCount: 55, perPageCount: 10, currentPage: 2 };
                const paginationMeta = (0, pagination_1.getPaginatedMeta)(paginationMetaParams);
                expect(paginationMeta).toEqual({
                    totalRowCount: 55,
                    totalPageCount: 6,
                    perPageCount: 10,
                    currentPage: 2
                });
            });
        });
    });
});
//# sourceMappingURL=pagination.test.js.map
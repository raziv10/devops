"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor({ message }) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseError);
        }
    }
}
exports.default = BaseError;
//# sourceMappingURL=error.js.map
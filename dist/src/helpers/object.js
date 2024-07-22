"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.isObjectEmpty = exports.withOnlyAttrs = exports.withoutAttrs = exports.listWithoutAttrs = void 0;
function listWithoutAttrs(obj, attrsToExclude) {
    return obj.map((item) => withoutAttrs(item, attrsToExclude));
}
exports.listWithoutAttrs = listWithoutAttrs;
function withoutAttrs(obj, attrsToExclude) {
    if (Array.isArray(obj)) {
        throw new TypeError('withoutAttrs() expects first argument to be a plain object, array given.');
    }
    const result = {};
    Object.keys(obj).forEach((key) => {
        if (!attrsToExclude.includes(key)) {
            result[key] = obj[key];
        }
    });
    return result;
}
exports.withoutAttrs = withoutAttrs;
function withOnlyAttrs(obj, attrs) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        if (attrs.includes(key)) {
            result[key] = obj[key];
        }
    });
    return result;
}
exports.withOnlyAttrs = withOnlyAttrs;
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
exports.isObjectEmpty = isObjectEmpty;
function isEmpty(obj) {
    if (Array.isArray(obj)) {
        if (!obj.length) {
            return true;
        }
        return false;
    }
    return isObjectEmpty(obj);
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=object.js.map
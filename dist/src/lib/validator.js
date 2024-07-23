"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate(data, schema) {
    return new Promise((resolve, reject) => {
        const options = { abortEarly: false };
        const { error, value } = schema.validate(data, options);
        if (error) {
            reject(error);
            return;
        }
        resolve(value);
    });
}
exports.validate = validate;
//# sourceMappingURL=validator.js.map
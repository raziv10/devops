"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../test/factories/users");
const jwt_1 = require("./jwt");
describe('Generates Json Web Tokens', () => {
    const userDetail = (0, users_1.userFactory)();
    describe('generateAccessToken()', () => {
        describe('given params to generate token', () => {
            it('generates access token of type "string"', () => {
                expect(typeof (0, jwt_1.generateAccessToken)(userDetail)).toBe('string');
            });
        });
    });
    describe('generateRefreshToken()', () => {
        describe('given params to generate token', () => {
            it('generates refresh token of type "string"', () => {
                expect(typeof (0, jwt_1.generateRefreshToken)(userDetail)).toBe('string');
            });
        });
    });
    describe('decode()', () => {
        describe('given valid access_token', () => {
            it('returns the decoded data', () => {
                const decodedData = (0, jwt_1.decode)((0, jwt_1.generateAccessToken)(userDetail));
                const { iat, exp } = decodedData, decodedUserDetail = __rest(decodedData, ["iat", "exp"]);
                expect(decodedUserDetail.email).toBe(userDetail.email);
                expect(decodedData).toHaveProperty('exp');
                expect(decodedData).toHaveProperty('iat');
            });
        });
        describe('given valid refresh_token', () => {
            it('returns the valid decoded data', () => {
                const decodedData = (0, jwt_1.decode)((0, jwt_1.generateRefreshToken)(userDetail));
                const { iat, exp } = decodedData, decodedUserDetail = __rest(decodedData, ["iat", "exp"]);
                expect(decodedUserDetail.email).toEqual(userDetail.email);
                expect(decodedData).toHaveProperty('exp');
                expect(decodedData).toHaveProperty('iat');
            });
        });
    });
});
//# sourceMappingURL=jwt.test.js.map
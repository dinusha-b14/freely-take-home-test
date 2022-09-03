'use strict';
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
exports.registerUser = void 0;
const usersService = require("../services/usersService");
const registerUser = (event, _context) => __awaiter(void 0, void 0, void 0, function* () {
    const [{ Sns: { Message: snsMessage } }] = event.Records;
    console.log(snsMessage);
    const { name, email } = JSON.parse(snsMessage);
    console.log(`name: ${name}`);
    console.log(`email: ${email}`);
    const registeredUser = yield usersService.registerNewUser({ name, email });
    console.log(`registeredUser: ${JSON.stringify(registeredUser)}`);
});
exports.registerUser = registerUser;

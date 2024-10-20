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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs/promises");
var crypto = require("crypto");
var path = require("path");
var process = require("process");
var node_buffer_1 = require("node:buffer");
// 1. Membuat hash
function createHash(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, crypto.createHash('sha256').update(data).digest('hex')];
        });
    });
}
// 2. Enkripsi sederhana
function encrypt(text, password) {
    return __awaiter(this, void 0, void 0, function () {
        var algorithm, key, iv, cipher, encrypted;
        return __generator(this, function (_a) {
            algorithm = 'aes-192-cbc';
            key = crypto.scryptSync(password, 'salt', 24);
            iv = crypto.randomBytes(16);
            cipher = crypto.createCipheriv(algorithm, key, iv);
            encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return [2 /*return*/, iv.toString('hex') + ":" + encrypted];
        });
    });
}
// 3. Dekripsi sederhana
function decrypt(encryptedText, password) {
    return __awaiter(this, void 0, void 0, function () {
        var algorithm, key, parts, iv, encrypted, decipher, decrypted;
        return __generator(this, function (_a) {
            algorithm = 'aes-192-cbc';
            key = crypto.scryptSync(password, 'salt', 24);
            parts = encryptedText.split(":");
            if (parts.length !== 2) {
                throw new Error('Invalid encrypted text format.');
            }
            iv = node_buffer_1.Buffer.from(parts.shift(), 'hex');
            encrypted = parts.join(":");
            decipher = crypto.createDecipheriv(algorithm, key, iv);
            decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return [2 /*return*/, decrypted];
        });
    });
}
// 4. Fungsi untuk mencatat log
function logActivity(message) {
    return __awaiter(this, void 0, void 0, function () {
        var now, logFileName, logFilePath, logMessage, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = new Date();
                    logFileName = "".concat(now.getHours(), "_").concat(now.getMinutes(), "_").concat(now.getSeconds(), "_").concat(now.getMonth() + 1, "_").concat(now.getDate(), "_").concat(now.getFullYear(), ".log");
                    logFilePath = path.join(__dirname, logFileName);
                    logMessage = "".concat(now.toISOString(), ": ").concat(message, "\n");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs.appendFile(logFilePath, logMessage)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error writing to log file:', err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// 5. Fungsi untuk mengelola file
function manageFile(action, filePath, password) {
    return __awaiter(this, void 0, void 0, function () {
        var fullPath, data, hash, encryptedText, encryptedFilePath, encryptedData, decryptedText, originalFilePath, error_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fullPath = path.resolve(filePath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 16, , 18]);
                    if (!(action === 'encrypt')) return [3 /*break*/, 8];
                    return [4 /*yield*/, logActivity("Mulai mengenkripsi file ".concat(fullPath))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fs.readFile(fullPath, 'utf8')];
                case 3:
                    data = _a.sent();
                    return [4 /*yield*/, createHash(data)];
                case 4:
                    hash = _a.sent();
                    console.log('Hash dari file:', hash);
                    return [4 /*yield*/, encrypt(data, password)];
                case 5:
                    encryptedText = _a.sent();
                    encryptedFilePath = fullPath.replace('.txt', '_encrypted.txt');
                    return [4 /*yield*/, fs.writeFile(encryptedFilePath, encryptedText, 'utf8')];
                case 6:
                    _a.sent();
                    console.log("File '".concat(filePath, "' berhasil dienkripsi menjadi '").concat(encryptedFilePath, "'"));
                    return [4 /*yield*/, logActivity("Berhasil mengenkripsi file ".concat(fullPath))];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 8:
                    if (!(action === 'decrypt')) return [3 /*break*/, 14];
                    return [4 /*yield*/, logActivity("Mulai mendekripsi file ".concat(fullPath))];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, fs.readFile(fullPath, 'utf8')];
                case 10:
                    encryptedData = _a.sent();
                    return [4 /*yield*/, decrypt(encryptedData, password)];
                case 11:
                    decryptedText = _a.sent();
                    originalFilePath = fullPath.replace('_encrypted.txt', '.txt');
                    return [4 /*yield*/, fs.writeFile(originalFilePath, decryptedText, 'utf8')];
                case 12:
                    _a.sent();
                    console.log("File '".concat(fullPath, "' berhasil didekripsi menjadi '").concat(originalFilePath, "'"));
                    return [4 /*yield*/, logActivity("Berhasil mendekripsi file ".concat(fullPath))];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 14: throw new Error("Invalid action: ".concat(action, ". Must be 'encrypt' or 'decrypt'."));
                case 15: return [3 /*break*/, 18];
                case 16:
                    error_1 = _a.sent();
                    errorMessage = "Error ".concat(action, " file '").concat(fullPath, "': ").concat(error_1.message);
                    console.error(errorMessage);
                    return [4 /*yield*/, logActivity(errorMessage)];
                case 17:
                    _a.sent();
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    });
}
// 6. Fungsi utama
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var args, action, filePath, password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = process.argv.slice(2);
                    if (args.length < 3) {
                        console.error('Usage: ts-node index.ts <encrypt|decrypt> <filePath> <password>');
                        return [2 /*return*/];
                    }
                    action = args[0];
                    filePath = args[1];
                    password = args[2];
                    return [4 /*yield*/, manageFile(action, filePath, password)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const router = express_1.default.Router();
// Rute untuk mendapatkan semua buku
router.get('/books', bookController_1.getBooks);
// Rute untuk mendapatkan buku berdasarkan ID
router.get('/books/:id', bookController_1.getBookById);
// Rute untuk menambahkan buku baru
router.post('/books', bookController_1.createBook);
// Rute untuk memperbarui buku berdasarkan ID
router.put('/books/:id', bookController_1.updateBook);
// Rute untuk menghapus buku berdasarkan ID
router.delete('/books/:id', bookController_1.deleteBook);
exports.default = router;

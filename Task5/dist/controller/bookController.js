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
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const bookModel_1 = require("../models/bookModel");
// Mendapatkan semua buku
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookModel_1.Book.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving books' });
    }
    res.send('Get all books');
});
exports.getBooks = getBooks;
// Mendapatkan buku berdasarkan ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send('Invalid ID format');
        }
        const book = yield bookModel_1.Book.findById(req.params.id);
        if (!book)
            return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving book' });
    }
});
exports.getBookById = getBookById;
// Menambahkan buku baru
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, isbn } = req.body;
        const book = new bookModel_1.Book({ title, author, isbn });
        yield book.save();
        res.status(201).json(book);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating book' });
    }
    res.send('Book created');
});
exports.createBook = createBook;
// Memperbarui buku berdasarkan ID
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send('Invalid ID format');
        }
        const book = yield bookModel_1.Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book)
            return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating book' });
    }
});
exports.updateBook = updateBook;
// Menghapus buku berdasarkan ID
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send('Invalid ID format');
        }
        const book = yield bookModel_1.Book.findByIdAndDelete(req.params.id);
        if (!book)
            return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
    }
});
exports.deleteBook = deleteBook;

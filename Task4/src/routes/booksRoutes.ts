import express from 'express';
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from '../controller/bookController';

const router = express.Router();

// Rute untuk mendapatkan semua buku
router.get('/books', getBooks);
// Rute untuk mendapatkan buku berdasarkan ID
router.get('/books/:id', getBookById);
// Rute untuk menambahkan buku baru
router.post('/books', createBook);
// Rute untuk memperbarui buku berdasarkan ID
router.put('/books/:id', updateBook);
// Rute untuk menghapus buku berdasarkan ID
router.delete('/books/:id', deleteBook);

export default router;

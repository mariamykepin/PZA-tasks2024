// src/controller/bookController.ts
import { Request, Response } from 'express';
import { Book } from '../models/bookModel';

// Mendapatkan semua buku
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books' });
  }
};

// Mendapatkan buku berdasarkan ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // Ambil id sebagai string
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book' });
  }
};

// Menambahkan buku baru
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, isbn } = req.body;
    const book = new Book({ title, author, isbn });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book' });
  }
};

// Memperbarui buku berdasarkan ID
export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // Ambil id sebagai string
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book' });
  }
};

// Menghapus buku berdasarkan ID
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // Ambil id sebagai string
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
};

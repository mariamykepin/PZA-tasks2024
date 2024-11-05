// src/__tests__/bookController.test.ts
import { Request, Response } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controller/bookController';
import { Book } from '../models/bookModel';

// Mocking model
jest.mock('../models/bookModel');

describe('Book Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test('should get all books', async () => {
    Book.find = jest.fn().mockResolvedValue([{ title: 'Test Book', author: 'Test Author', isbn: '123456' }]);
    await getBooks(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith([{ title: 'Test Book', author: 'Test Author', isbn: '123456' }]);
  });

  // Tes untuk getBooks
  test('should get all books', async () => {
    Book.find = jest.fn().mockResolvedValue([{ title: 'Test Book', author: 'Test Author', isbn: '123456' }]);
    await getBooks(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith([{ title: 'Test Book', author: 'Test Author', isbn: '123456' }]);
  });

  // Tes untuk getBookById
  test('should get a book by ID', async () => {
    req.params = { id: '1' };
    Book.findById = jest.fn().mockResolvedValue({ title: 'Test Book', author: 'Test Author', isbn: '123456' });

    await getBookById(req as Request, res as Response);

    expect(Book.findById).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ title: 'Test Book', author: 'Test Author', isbn: '123456' });
  });

  test('should return 404 if book not found', async () => {
    req.params = { id: '2' };
    Book.findById = jest.fn().mockResolvedValue(null);

    await getBookById(req as Request, res as Response);

    expect(Book.findById).toHaveBeenCalledWith('2');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });

  // Tes untuk createBook
  test('should create a new book', async () => {
    req.body = { title: 'New Book', author: 'Author', isbn: '654321' };
    const newBook = { _id: '1', title: 'New Book', author: 'Author', isbn: '654321' };
    Book.create = jest.fn().mockResolvedValue(newBook);

    await createBook(req as Request, res as Response);

    expect(Book.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newBook);
  });

  // Tes untuk updateBook
  test('should update an existing book by ID', async () => {
    req.params = { id: '1' };
    req.body = { title: 'Updated Title' };
    const updatedBook = { _id: '1', title: 'Updated Title', author: 'Author', isbn: '654321' };
    Book.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedBook);

    await updateBook(req as Request, res as Response);

    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith('1', { title: 'Updated Title' }, { new: true });
    expect(res.json).toHaveBeenCalledWith(updatedBook);
  });

  test('should return 404 if book to update is not found', async () => {
    req.params = { id: '2' };
    req.body = { title: 'Non-existing book' };
    Book.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await updateBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });

  // Tes untuk deleteBook
  test('should delete a book by ID', async () => {
    req.params = { id: '1' };
    Book.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: '1', title: 'Book to delete' });

    await deleteBook(req as Request, res as Response);

    expect(Book.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Book deleted' });
  });

  test('should return 404 if book to delete is not found', async () => {
    req.params = { id: '2' };
    Book.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await deleteBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });
});

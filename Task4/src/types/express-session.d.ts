import express from 'express';

declare module 'express-session' {
  interface SessionData {
    user?: { id: string; username: string }; // Sesuaikan dulu
}

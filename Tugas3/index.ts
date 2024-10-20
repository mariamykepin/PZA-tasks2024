import * as fs from 'fs/promises';
import * as crypto from 'crypto';
import * as path from 'path';
import * as process from 'process';
import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 1. Membuat hash
async function createHash(data: string): Promise<string> {
    return crypto.createHash('sha256').update(data).digest('hex');
}

// 2. Enkripsi sederhana
async function encrypt(text: string, password: string): Promise<string> {
    const algorithm = 'aes-192-cbc';
    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ":" + encrypted;
}

// 3. Dekripsi sederhana
async function decrypt(encryptedText: string, password: string): Promise<string> {
    const algorithm = 'aes-192-cbc';
    const key = crypto.scryptSync(password, 'salt', 24);

    const parts = encryptedText.split(":");
    if (parts.length !== 2) {
        throw new Error('Invalid encrypted text format.');
    }

    const iv = Buffer.from(parts.shift()!, 'hex'); // Pastikan parts tidak kosong
    const encrypted = parts.join(":");

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// 4. Fungsi untuk mencatat log ke satu file (activity.log)
async function logActivity(message: string) {
  const now = new Date();
  
  // Gunakan file log utama 'activity.log'
  const logFileName = 'activity.log';
  const logFilePath = path.join(__dirname, logFileName);

  const logMessage = `${now.toISOString()}: ${message}\n`;
  
  try {
      await fs.appendFile(logFilePath, logMessage);
  } catch (err) {
      console.error('Error writing to log file:', err);
  }
}

// 5. Fungsi untuk mengelola file
async function manageFile(action: string, filePath: string, password: string) {
  const fullPath = path.resolve(filePath);

  try {
      if (action === 'encrypt') {
          await logActivity(`Mulai mengenkripsi file ${fullPath}`);
          const data = await fs.readFile(fullPath, 'utf8');
          const hash = await createHash(data);
          console.log('Hash dari file:', hash);
          const encryptedText = await encrypt(data, password);
          const encryptedFilePath = fullPath.replace('.txt', '_encrypted.txt');
          await fs.writeFile(encryptedFilePath, encryptedText, 'utf8');
          console.log(`File '${filePath}' berhasil dienkripsi menjadi '${encryptedFilePath}'`);
          await logActivity(`Berhasil mengenkripsi file ${fullPath}`);
      } else if (action === 'decrypt') {
          await logActivity(`Mulai mendekripsi file ${fullPath}`);
          const encryptedData = await fs.readFile(fullPath, 'utf8');
          const decryptedText = await decrypt(encryptedData, password);
          const decryptedFilePath = fullPath.replace('_encrypted.txt', '_decrypted.txt');
          await fs.writeFile(decryptedFilePath, decryptedText, 'utf8');
          console.log(`File '${fullPath}' berhasil didekripsi menjadi '${decryptedFilePath}'`);
          await logActivity(`Berhasil mendekripsi file ${fullPath}`);
      } else {
          throw new Error(`Invalid action: ${action}. Must be 'encrypt' or 'decrypt'.`);
      }
  } catch (error) {
      const errorMessage = `Error ketika ${action === 'encrypt' ? 'mengenkripsi' : 'mendekripsi'} file: ${(error as Error).message || 'Unknown error'}`;
      console.error(errorMessage);
      await logActivity(errorMessage);
  }
}


// 6. Fungsi utama
async function main() {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        console.error('Usage: ts-node index.ts <encrypt|decrypt> <filePath> <password>');
        return;
    }
    
    const action = args[0];
    const filePath = args[1];
    const password = args[2];

    await manageFile(action, filePath, password);
}

main();

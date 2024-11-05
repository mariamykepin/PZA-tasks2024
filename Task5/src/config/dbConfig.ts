import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useUnifiedTopology: true, // Tetap gunakan opsi ini jika diperlukan
    } as ConnectOptions); // Tentukan opsi koneksi sebagai ConnectOptions
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;

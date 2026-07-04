import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Check if Cloudinary credentials exist
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('📡 Cloudinary Config Check:');
console.log('  Cloud Name:', cloudName ? '✅ Set' : '❌ Missing');
console.log('  API Key:', apiKey ? '✅ Set' : '❌ Missing');
console.log('  API Secret:', apiSecret ? '✅ Set' : '❌ Missing');

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Cloudinary credentials missing in .env file');
  console.log('Please add:');
  console.log('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.log('  CLOUDINARY_API_KEY=your_api_key');
  console.log('  CLOUDINARY_API_SECRET=your_api_secret');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true, // ✅ Always use HTTPS
});

// ✅ Test connection
cloudinary.api.ping()
  .then(() => console.log('✅ Cloudinary connected successfully'))
  .catch((err) => {
    console.error('❌ Cloudinary connection failed:', err.message);
    console.log('Please check your Cloudinary credentials in .env');
  });

export default cloudinary;
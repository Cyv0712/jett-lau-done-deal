const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Bike = require('../models/Bike');
const { optimizeImageBuffer } = require('./imageStorage');
const { downloadImage } = require('./download');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function warmImageCache() {
  console.log('--- Cache Warmer Started ---');
  try {
    const activeBikes = await Bike.find({ status: 'Available' });
    const imageUrls = [];
    for (const bike of activeBikes) {
      if (bike.images && Array.isArray(bike.images)) {
        for (const img of bike.images) {
          if (img && img.includes('res.cloudinary.com')) {
            imageUrls.push(img);
          }
        }
      }
    }

    if (imageUrls.length === 0) {
      console.log('Cache Warmer: No Cloudinary images found to warm.');
      return;
    }

    console.log(`Cache Warmer: Found ${imageUrls.length} Cloudinary images to check.`);
    const cacheDir = path.join(__dirname, '..', 'cache');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    for (const url of imageUrls) {
      // Strip out optimization segment to match frontend request hash
      const cleanUrl = url.replace(/\/f_auto,q_auto\//g, '/');
      const md5Hash = crypto.createHash('md5').update(cleanUrl).digest('hex');
      const cachedFilePath = path.join(cacheDir, `${md5Hash}.webp`);

      if (fs.existsSync(cachedFilePath)) {
        continue;
      }

      console.log(`Cache Warmer: Warming image: ${cleanUrl}`);
      try {
        const buffer = await downloadImage(cleanUrl);
        const optimizedBuffer = await optimizeImageBuffer(buffer);
        fs.writeFileSync(cachedFilePath, optimizedBuffer);
        console.log(`Cache Warmer: Successfully warmed: ${md5Hash}.webp`);
      } catch (err) {
        console.error(`Cache Warmer: Failed to warm image ${cleanUrl}:`, err.message);
      }
      await delay(500);
    }
    console.log('--- Cache Warmer Completed ---');
  } catch (err) {
    console.error('Cache Warmer encountered an error:', err);
  }
}

module.exports = { warmImageCache };

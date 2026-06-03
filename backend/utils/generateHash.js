const bcrypt = require('bcryptjs');
const crypto = require('crypto');

function generateHash() {
  let password = process.argv[2];
  let generated = false;

  if (!password) {
    // Generate a strong random password if none is provided
    password = crypto.randomBytes(12).toString('base64')
      .replace(/\+/g, 'a')
      .replace(/\//g, 'b')
      .replace(/=/g, ''); // 16 alphanumeric-ish characters
    generated = true;
  }

  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  console.log('\n==================================================');
  console.log('         ADMIN PASSWORD HASH GENERATOR            ');
  console.log('==================================================\n');

  if (generated) {
    console.log('No password provided. Generated a secure random password:');
    console.log(`> Password: ${password}\n`);
    console.log('WARNING: Make sure to copy and save this password now!');
  } else {
    console.log(`Password to hash: ${password}\n`);
  }

  console.log('Copy this line and paste it into your backend/.env file:');
  console.log('--------------------------------------------------');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log('--------------------------------------------------\n');
  console.log('To use a custom password instead, run:');
  console.log('  npm run generate-hash <your-custom-password>\n');
}

generateHash();

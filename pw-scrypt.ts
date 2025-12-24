import crypto from 'node:crypto';

// The password you want to hash
const password = 'Asdf12345678';

// Better Auth / Node.js standard parameters
const salt = crypto.randomBytes(16).toString('hex');
const keylen = 64;

// Generate the hash
const hash = crypto.scryptSync(password, salt, keylen).toString('hex');

// This is the typical format stored in many databases (salt:hash)
console.log(`Generated String: ${salt}:${hash}`);

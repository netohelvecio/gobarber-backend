import { createConnection } from 'typeorm';

try {
  createConnection();
} catch (err) {
  console.log(err.message);
}

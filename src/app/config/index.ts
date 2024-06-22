import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.port,
  db_url: process.env.db_url,
  NODE_ENV: process.env.NODE_ENV,
};

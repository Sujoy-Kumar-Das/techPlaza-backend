import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import AppError from './app/errors/AppError';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    throw new AppError(
      404,
      'Something went wrong,please check your internet connection.',
    );
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`UnhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected , shutting down ...`);
  process.exit(1);
});

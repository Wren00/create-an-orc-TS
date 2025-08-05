import { execSync } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.test') });

export default async () => {
    console.log('Starting test DB...');
    execSync('docker compose -f ../docker-compose.test.yml up -d test_db flyway_test', { stdio: 'inherit' });

    await new Promise((res) => setTimeout(res, 3000));
};
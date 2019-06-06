import { sign, verify } from 'jsonwebtoken';
import { resolve } from 'path';

export class LoginService {
    
  create(): string {
    const name = 'admin';
    const email = 'admin@admin.com';
    const timestamp = require(resolve(__dirname, '..', '..', 'config', 'timestamp.json'));
    
    return sign({ name, email }, timestamp, {
      expiresIn: '2d',
    });
  };

  tokenIsValid(token: string): boolean {
    const timestamp = require(resolve(__dirname, '..', '..', 'config', 'timestamp.json'));
    const decoded = verify(token, timestamp) as { exp: number };
    const current_time = Date.now() / 1000;
    return !!decoded.exp && decoded.exp > current_time;
  };

  saveTimestamp(): void {
    const fs = require('fs');
    const filepath = resolve(__dirname, '..', '..', 'config', 'timestamp.json');
    const date = JSON.stringify(String(Date.now()));
    fs.writeFileSync(filepath, date);
  };
}
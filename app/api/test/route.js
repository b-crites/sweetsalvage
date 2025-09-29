import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const configPath = path.join(process.cwd(), 'config');
  const credPath = path.join(process.cwd(), 'config', 'credentials.json');
  const tokenPath = path.join(process.cwd(), 'config', 'token.json');
  
  const checks = {
    workingDirectory: process.cwd(),
    configFolderExists: fs.existsSync(configPath),
    configPath: configPath,
    credentialsPath: credPath,
    credentialsFile: fs.existsSync(credPath) ? '✅ Found' : '❌ Missing',
    tokenPath: tokenPath,
    tokenFile: fs.existsSync(tokenPath) ? '✅ Found' : '❌ Missing',
    calendarId: process.env.GOOGLE_CALENDAR_ID ? '✅ Found' : '❌ Missing',
  };
  
  // List files in config if it exists
  if (fs.existsSync(configPath)) {
    checks.filesInConfig = fs.readdirSync(configPath);
  }
  
  return NextResponse.json({ checks });
}
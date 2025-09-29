import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

const TOKEN_PATH = path.join(process.cwd(), 'config', 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'config', 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, 'utf8');
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
    access_token: client.credentials.access_token,
    token_type: client.credentials.token_type,
    expiry_date: client.credentials.expiry_date,
  });
  
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  
  if (client) {
    console.log('✅ Found token.json, loading credentials.');
    
    if (client.credentials.expiry_date && client.credentials.expiry_date < Date.now()) {
      console.log('🔄 Refreshing expired token...');
      try {
        await client.refreshAccessToken();
        await saveCredentials(client);
      } catch (error) {
        console.error('❌ Error refreshing token:', error);
        return null;
      }
    }
    return client;
  }
  
  console.log('🚨 No valid credentials found.');
  return null;
}

export async function getCalendarEvents() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  
  if (!calendarId) {
    throw new Error('❌ GOOGLE_CALENDAR_ID is not set!');
  }
  
  console.log(`📢 Using Calendar ID: ${calendarId}`);
  
  const auth = await authorize();
  
  if (!auth) {
    throw new Error('Failed to authorize with Google Calendar API');
  }
  
  try {
    console.log('🔗 Connecting to Google Calendar API...');
    const calendar = google.calendar({ version: 'v3', auth });
    
    const now = new Date();
    const timeMax = new Date();
    timeMax.setDate(timeMax.getDate() + 90);
    
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: now.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    const events = response.data.items || [];
    console.log(`📆 Retrieved ${events.length} events from Google Calendar.`);
    
    return events;
  } catch (error) {
    console.error('❌ Google API Error:', error);
    throw error;
  }
}
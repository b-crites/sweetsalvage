from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import datetime
import os
from dotenv import load_dotenv  # Load environment variables

# Load environment variables from .env
load_dotenv()

# Set paths for persistent storage
TOKEN_PATH = r"config/token.json"
CREDENTIALS_PATH = r"config/credentials.json"

SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

def get_calendar_events():
    """Fetches events up to 90 days from Google Calendar and ensures token persistence."""
    creds = None

    # Debug: Check if GOOGLE_CALENDAR_ID is loaded
    calendar_id = os.getenv("GOOGLE_CALENDAR_ID")
    if not calendar_id:
        raise ValueError("❌ GOOGLE_CALENDAR_ID is not set! Check your .env file.")

    print(f"📢 Using Calendar ID: {calendar_id}")

    # Load token.json if it exists
    if os.path.exists(TOKEN_PATH):
        print("✅ Found token.json, loading credentials.")
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    # Refresh or generate a new token if needed
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("🔄 Refreshing expired token...")
            creds.refresh(Request())
        else:
            print("🚨 No valid credentials found, running OAuth flow.")
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)

        # Store the refreshed token
        with open(TOKEN_PATH, "w") as token:
            token.write(creds.to_json())

    try:
        print("🔗 Connecting to Google Calendar API...")
        service = build("calendar", "v3", credentials=creds)
        
        now = datetime.datetime.utcnow().isoformat() + "Z"
        time_max = (datetime.datetime.utcnow() + datetime.timedelta(days=90)).isoformat() + "Z"
        
        events_result = service.events().list(
            calendarId=calendar_id,  # Now we know this is set correctly
            timeMin=now,
            timeMax=time_max,
            singleEvents=True,
            orderBy="startTime",
        ).execute()

        events = events_result.get("items", [])
        print(f"📆 Retrieved {len(events)} events from Google Calendar.")

        return events

    except HttpError as error:
        print(f"❌ Google API Error: {error}")
        return []

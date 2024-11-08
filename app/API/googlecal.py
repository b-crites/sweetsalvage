import datetime
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

def main():
    """Shows basic usage of the Google Calendar API.
    Prints the start, summary, description, location, and attendees of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)

        # Call the Calendar API
        now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
        print('Getting the upcoming 10 events')
        events_result = service.events().list(
            calendarId='c_b763cf64a206f90c95acb809cd79fce2aa86e63eb8608c407b10cc780c9fda9a@group.calendar.google.com',
            timeMin=now,
            maxResults=10,
            singleEvents=True,
            orderBy='startTime',
            fields='items(start,summary,description,location,attendees)'
        ).execute()
        events = events_result.get('items', [])

        if not events:
            print('No upcoming events found.')
            return

        for event in events:
            start = event['start'].get('dateTime', event['start'].get('date'))
            summary = event.get('summary', 'No Title')
            description = event.get('description', 'No Description')
            location = event.get('location', 'No Location')
            attendees = event.get('attendees', [])

            print(f"Start: {start}")
            print(f"Summary: {summary}")
            print(f"Description: {description}")
            print(f"Location: {location}")
            print("Attendees:")
            for attendee in attendees:
                print(f"  - {attendee.get('email', 'No Email')} (Response: {attendee.get('responseStatus', 'No Response')})")
            print("\n")

    except HttpError as error:
        print(f'An error occurred: {error}')

if __name__ == '__main__':
    main()


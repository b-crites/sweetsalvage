
import smtplib
import datetime
import os
from flask import Flask, request, jsonify
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from flask_cors import CORS
from dotenv import load_dotenv

#google Calendar imports
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


app = Flask(__name__)
CORS(app, resources={
    r"/submit-form": {"origins": "http://localhost:3000"},
    r"/events": {"origins": "http://localhost:3000"}
})

#Google Calendar API scope
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

load_dotenv()

# Email configuration
SMTP_SERVER = 'smtp.hostinger.com'
SMTP_PORT = 587
EMAIL_ADDRESS = 'colten.hallett@visionaryadvance.com'
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

def get_calendar_events():
    """Fetches events up to 90 days out from the Google Calendar."""
    creds = None
    # Check if token.json exists and load credentials
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # Refresh or create new credentials if needed
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
  
    try:
        service = build('calendar', 'v3', credentials=creds)
        now = datetime.datetime.now(datetime.timezone.utc).isoformat().replace('+00:00', 'Z')
        time_max = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=90)).isoformat().replace('+00:00', 'Z')

        events_result = service.events().list(
            calendarId='c_b763cf64a206f90c95acb809cd79fce2aa86e63eb8608c407b10cc780c9fda9a@group.calendar.google.com',  # Change to your calendar ID if needed
            timeMin=now,
            timeMax=time_max,
            singleEvents=True,
            orderBy='startTime',
            fields='items(start,summary,description,location,attendees)'
        ).execute()
        events = events_result.get('items', [])

        # Prepare event data
        event_list = []
        for event in events:
            event_data = {
                'start': event['start'].get('dateTime', event['start'].get('date')),
                'summary': event.get('summary', 'No Title'),
                'description': event.get('description', 'No Description'),
                'location': event.get('location', 'No Location'),
                'attendees': [attendee.get('email', 'No Email') for attendee in event.get('attendees', [])]
            }
            event_list.append(event_data)

        print (event_list)
        return event_list

    except HttpError as error:
        print(f'An error occurred: {error}')
        return []

@app.route('/events', methods=['GET'])
def events():
    """Api endpoint to fetch calendar events."""
    events = get_calendar_events()
    return jsonify(events)


def generate_ics(event_name, start_date):
    """Create an ICS file for the event."""
    end_date = start_date + datetime.timedelta(hours=1)
    ics_content = f"""BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:{event_name}
DTSTART:{start_date.strftime('%Y%m%dT%H%M%S')}
DTEND:{end_date.strftime('%Y%m%dT%H%M%S')}
END:VEVENT
END:VCALENDAR"""
    return ics_content

@app.route('/submit-form', methods=['POST'])
def submit_form():
    """Send the desired email"""
    try:
        data = request.json
        print("Received form data:", data)

        # Choose the correct email function based on form type
        selected_value = data.get('selectedValue')
        if selected_value == "band":
            msg = send_band_email(data)
        elif selected_value == "wedding":
            msg = send_wedding_email(data)
        elif selected_value == "contact":
            msg = send_contact_email(data)
        else:
            return jsonify({"status": "Error", "error": "Unknown form type"}), 400

        # Send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, "critesabrandon@gmail.com", msg.as_string())
            print("Email sent successfully.")

        return jsonify({"status": "Email sent successfully!"})

    except Exception as e:
        print("An error occurred:", e)
        return jsonify({"status": "Error", "error": str(e)}), 500

def send_band_email(data):
    """Handles email sending for band inquiries."""
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = "critesabrandon@gmail.com"
    msg['Subject'] = 'Band Inquiry Submission'

    # Parse the date or set a default date
    start_date = datetime.datetime.strptime(data['selectedDate'], '%Y-%m-%d') if data.get('selectedDate') else datetime.datetime.now()
 
    # Generate ICS file specific to band performances
    ics_content = generate_ics(data['stagename'], start_date)
    email_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">Band Inquiry</h2>
            <hr style="border: none; border-top: 2px solid #4CAF50; margin-bottom: 20px;">
            
            <h3>Contact Information:</h3>
            <p><strong>First Name:</strong> {data['firstName']}</p>
            <p><strong>Last Name:</strong> {data['lastName']}</p>
            <p><strong>Email:</strong> <a href="mailto:{data['email']}" style="color: #4CAF50;">{data['email']}</a></p>
            <p><strong>Phone:</strong> {data['phoneNumber']}</p>
            
            <h3>Performance Details:</h3>
            <p><strong>Date:</strong> {data['selectedDate']}</p>
            <p><strong>Stage Name:</strong> {data['stagename']}</p>
            <p><strong>Genre:</strong> {data['genreOfMusic']}</p>
            <p><strong>Length of Set:</strong> {data['setLength']}</p>
            <p><strong>Type of Music:</strong> {data['typeOfMusic']}</p>
            <p><strong>Number of Members:</strong> {data['selectedMembers']}</p>
            <p><strong>Power Requirements:</strong> {data['power']}</p>

            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">{data['message']}</p>

            <hr style="border: none; border-top: 2px solid #4CAF50; margin-top: 20px;">
            <p style="text-align: center; font-size: 12px; color: #999;">
                This is an automated email from your contact form.
            </p>
        </div>
    </body>
    </html>
    """


    msg.attach(MIMEText(email_body, 'html'))
    ics_part = MIMEApplication(ics_content, Name="event.ics")
    ics_part['Content-Disposition'] = 'attachment; filename="event.ics"'
    msg.attach(ics_part)
    return msg

def send_contact_email(data):
    """Handles email sending for general contact form submissions."""
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS
    msg['Subject'] = 'Contact Form Submission'

# HTML formatted email body
    email_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">General Inquiry</h2>
            <hr style="border: none; border-top: 2px solid #4CAF50; margin-bottom: 20px;">
            
            <h3>Contact Information:</h3>
            <p><strong>First Name:</strong> {data['firstName']}</p>
            <p><strong>Last Name:</strong> {data['lastName']}</p>
            <p><strong>Email:</strong> <a href="mailto:{data['email']}" style="color: #4CAF50;">{data['email']}</a></p>
            <p><strong>Phone:</strong> {data['phoneNumber']}</p>

            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">{data['message']}</p>

            <hr style="border: none; border-top: 2px solid #4CAF50; margin-top: 20px;">
            <p style="text-align: center; font-size: 12px; color: #999;">
                This is an automated email from your contact form.
            </p>
        </div>
    </body>
    </html>
    """

    msg.attach(MIMEText(email_body, 'html'))
    return msg

def send_wedding_email(data):
    """Handles email sending for wedding inquiries."""
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS
    msg['Subject'] = 'Wedding Inquiry Submission'

    start_date = datetime.datetime.strptime(data['selectedDate'], '%Y-%m-%d') if data.get('selectedDate') else datetime.datetime.now()
    ics_content = generate_ics("Wedding Event", start_date)
    # HTML formatted email body
    email_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">Wedding Inquiry</h2>
            <hr style="border: none; border-top: 2px solid #4CAF50; margin-bottom: 20px;">
            
            <h3>Contact Information:</h3>
            <p><strong>First Name:</strong> {data['firstName']}</p>
            <p><strong>Last Name:</strong> {data['lastName']}</p>
            <p><strong>Email:</strong> <a href="mailto:{data['email']}" style="color: #4CAF50;">{data['email']}</a></p>
            <p><strong>Phone:</strong> {data['phoneNumber']}</p>

            <h3>Event Details:</h3>
            <p><strong>Date:</strong> {data['selectedDate']}</p>
            <p><strong>Event Type:</strong> {data.get('eventType', 'N/A')}</p>
            <p><strong>Open Bar:</strong> {data.get('drinks', 'N/A')}</p>
            
            <h3>Additional Message:</h3>
            <p style="white-space: pre-wrap;">{data.get('message', 'None')}</p>

            <hr style="border: none; border-top: 2px solid #4CAF50; margin-top: 20px;">
            <p style="text-align: center; font-size: 12px; color: #999;">
                This is an automated email from your wedding inquiry form.
            </p>
        </div>
    </body>
    </html>
    """

    msg.attach(MIMEText(email_body, 'html'))
    ics_part = MIMEApplication(ics_content, Name="event.ics")
    ics_part['Content-Disposition'] = 'attachment; filename="event.ics"'
    msg.attach(ics_part)
    return msg

if __name__ == '__main__':
    app.run(debug=True)

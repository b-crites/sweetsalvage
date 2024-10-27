
import smtplib
import datetime
import os
from flask import Flask, request, jsonify
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from flask_cors import CORS
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app, resources={r"/submit-form": {"origins": "http://localhost:3000"}})

load_dotenv()

# Email configuration
SMTP_SERVER = 'smtp.hostinger.com'
SMTP_PORT = 587
EMAIL_ADDRESS = 'colten.hallett@visionaryadvance.com'
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

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
            server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, msg.as_string())
            print("Email sent successfully.")

        return jsonify({"status": "Email sent successfully!"})

    except Exception as e:
        print("An error occurred:", e)
        return jsonify({"status": "Error", "error": str(e)}), 500

def send_band_email(data):
    """Handles email sending for band inquiries."""
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS
    msg['Subject'] = 'Band Inquiry Submission'

    # Parse the date or set a default date
    start_date = datetime.datetime.strptime(data['selectedDate'], '%Y-%m-%d') if data.get('selectedDate') else datetime.datetime.now()
 
    # Generate ICS file specific to band performances
    ics_content = generate_ics("Band Performance", start_date)
    email_body = f"""
    Band Inquiry:
    First Name: {data['firstName']}
    Last Name: {data['lastName']}
    Email: {data['email']}
    Phone: {data['phoneNumber']}
    Date: {data['selectedDate']}
    Type of Music: {data.get('typeOfMusic', 'N/A')}
    Message: {data.get('message', 'None')}
    """

    msg.attach(MIMEText(email_body, 'plain'))
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
    email_body = f"""
    Wedding Inquiry:
    First Name: {data['firstName']}
    Last Name: {data['lastName']}
    Email: {data['email']}
    Phone: {data['phoneNumber']}
    Date: {data['selectedDate']}
    Event Type: {data.get('eventType', 'N/A')}
    Drinks: {data.get('drinks', 'N/A')}
    Message: {data.get('message', 'None')}
    """

    msg.attach(MIMEText(email_body, 'plain'))
    ics_part = MIMEApplication(ics_content, Name="event.ics")
    ics_part['Content-Disposition'] = 'attachment; filename="event.ics"'
    msg.attach(ics_part)
    return msg

if __name__ == '__main__':
    app.run(debug=True)

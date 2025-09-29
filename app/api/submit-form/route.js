import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Build email content based on form type
    let emailContent = '';
    let subject = '';

    if (formData.selectedValue === 'band') {
      subject = `Band Inquiry from ${formData.firstName} ${formData.lastName}`;
      emailContent = `
        <h2>New Band Inquiry</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
        <hr />
        <h3>Band Information</h3>
        <p><strong>Band/Stage Name:</strong> ${formData.stagename}</p>
        <p><strong>Genre:</strong> ${formData.genreOfMusic}</p>
        <p><strong>Type of Music:</strong> ${formData.typeOfMusic}</p>
        <p><strong>Number of Members:</strong> ${formData.selectedMembers}</p>
        <p><strong>Set Length:</strong> ${formData.setLength}</p>
        <p><strong>Power Needed:</strong> ${formData.power}</p>
        <p><strong>Performance Date:</strong> ${formData.selectedDate}</p>
        ${formData.message ? `<p><strong>Additional Notes:</strong> ${formData.message}</p>` : ''}
      `;
    } else if (formData.selectedValue === 'wedding') {
      subject = `Wedding Inquiry from ${formData.firstName} ${formData.lastName}`;
      emailContent = `
        <h2>New Wedding Inquiry</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
        <hr />
        <h3>Wedding Information</h3>
        <p><strong>Event Type:</strong> ${formData.eventType}</p>
        <p><strong>Open Bar:</strong> ${formData.drinks}</p>
        <p><strong>Wedding Date:</strong> ${formData.selectedDate}</p>
        ${formData.message ? `<p><strong>Additional Notes:</strong> ${formData.message}</p>` : ''}
      `;
    } else if (formData.selectedValue === 'contact') {
      subject = `Contact Form from ${formData.firstName} ${formData.lastName}`;
      emailContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `;
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'no-reply@mail.visionaryadvance.com',
      to: ['sweetsalvagejt@gmail.com'],
      subject: subject,
      html: emailContent,
    });

    console.log('Email sent successfully:', data);

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      id: data.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email', 
        message: error.message 
      },
      { status: 500 }
    );
  }
}
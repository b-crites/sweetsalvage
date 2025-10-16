import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.businessName || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Insert vendor data into Supabase
    const { data: vendorData, error: supabaseError } = await supabase
      .from('vendor_requests')
      .insert([
        {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          business_name: formData.businessName.trim(),
          email: formData.email.trim().toLowerCase(),
          message: formData.message.trim()
        }
      ])
      .select();

    if (supabaseError) {
      console.error('Error inserting vendor data:', supabaseError);
      return NextResponse.json(
        {
          error: 'Failed to save vendor request',
          message: supabaseError.message
        },
        { status: 500 }
      );
    }

    console.log('Vendor data saved to database:', vendorData);

    // Build email content
    const subject = `Vendor Request from ${formData.businessName}`;
    const emailContent = `
      <h2>New Vendor Request - Christmas Fair 2025</h2>
      <hr />
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Business Name:</strong> ${formData.businessName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <hr />
      <h3>Message</h3>
      <p>${formData.message.replace(/\n/g, '<br>')}</p>
      <hr />
      <p style="color: #666; font-size: 12px;">
        Submitted on: ${new Date().toLocaleString('en-US', {
          timeZone: 'America/New_York',
          dateStyle: 'full',
          timeStyle: 'short'
        })}
      </p>
    `;

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'no-reply@mail.visionaryadvance.com',
      to: ['sweetsalvagejt@gmail.com'],
      subject: subject,
      html: emailContent,
    });

    console.log('Vendor request email sent successfully:', emailData);

    return NextResponse.json({
      success: true,
      message: 'Vendor request submitted successfully',
      id: emailData.id,
      vendorId: vendorData[0].id
    });

  } catch (error) {
    console.error('Error sending vendor request email:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send vendor request',
        message: error.message
      },
      { status: 500 }
    );
  }
}

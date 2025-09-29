import { NextResponse } from 'next/server';
import { getCalendarEvents } from '@/lib/calendar_utils';

export async function GET(request) {
  try {
    console.log('✅ API route /api/events called');
    
    const events = await getCalendarEvents();
    
    const formattedEvents = events
      .map((event) => {
        const startTime = event.start?.dateTime;
        if (startTime) {
          return {
            start: startTime,
            summary: event.summary || '',
            description: event.description || '',
            location: event.location || '',
          };
        }
        return null;
      })
      .filter(Boolean);
    
    return NextResponse.json({ events: formattedEvents });
  } catch (error) {
    console.error('❌ Error in API route:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { 
        error: 'Failed to fetch calendar events', 
        message: error.message,
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
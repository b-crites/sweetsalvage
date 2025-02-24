"""Main module for FastAPI application."""
print("✅ FastAPI is starting...")

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # 👈 Import CORS Middleware
from src.calendar_utils import get_calendar_events

app = FastAPI()

# 👇 Add this middleware clearly here:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/events")
async def fetch_events():
    events = get_calendar_events()

    formatted_events = []
    for event in events:
        start_time = event.get("start", {}).get("dateTime")
        if start_time:
            formatted_events.append({
                "start": start_time,  # Already ISO formatted
                "summary": event.get("summary"),
                "description": event.get("description"),
                "location": event.get("location"),
            })

    return {"events": formatted_events}


if __name__ == "__main__":
    print("🚀 Running FastAPI on 0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)

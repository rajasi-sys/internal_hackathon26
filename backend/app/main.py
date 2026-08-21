from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, profile, emissions, solutions, leaderboard
from app.database import engine, Base

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EcoQuest API",
    description="Backend services for carbon emission tracking, gamification, and profiling.",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # wherever you serve your frontend from
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all module routers
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(emissions.router)
app.include_router(solutions.router)
app.include_router(leaderboard.router)

@app.get("/")
def root():
    return {"message": "EcoQuest Backend API is up and running!"}
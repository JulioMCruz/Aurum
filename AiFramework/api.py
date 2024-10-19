# import the necessary packages
from flask import Flask, request, jsonify
from swarm import Swarm, Agent  
import os
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

# get Api Key from .env file
api_key = os.getenv("OPENAI_API_KEY")

# Initialize Flask application
app = Flask(__name__)

# Initialize Client Object
client = Swarm()

# Save User History for ML Memory
user_histories = {}

# Create Main Agent
main_agent = Agent(
    name="Main Event",
    instructions=(
        "You are a helpful agent, writing in TELEGRAM"  
    ),
    functions=[],
)

# Crate Multi-Language Agent
multi_language_agent = Agent(
    name="Multi-Language",
    instructions=(
        "You are a helpful agent, that knows multiple languages"  
    ),
    functions=[],
)
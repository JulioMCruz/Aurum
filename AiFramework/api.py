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

# multi agent return
def muilti_agent():
    return multi_language_agent

# Create Main Agent
main_agent = Agent(
    name="Main Event",
    instructions=(
        "You are a helpful agent, writing in TELEGRAM"  
    ),
    functions=[muilti_agent],
)

# Crate Multi-Language Agent
multi_language_agent = Agent(
    name="Multi-Language",
    instructions=(
        "You are a helpful agent, that knows multiple languages"  
    ),
    functions=[],
)

# Handle Message
def handle_message(message : str, user_id : int) -> str:
    response = None
    # TODO : Add logic to handle message
    return response

# Route To Handle Api Call To Main Agent
@app.route('/api/agent', methods=['POST'])
def agent():
    # Get Content From Request
    content = request.json.get('content')
    
    # Get Answer From Main Agent ( P.S , Main agent calls all other agents )
    returnedAnswer = handle_message(message=content, user_id=1)

    # Return Answer
    return jsonify({'message': returnedAnswer })
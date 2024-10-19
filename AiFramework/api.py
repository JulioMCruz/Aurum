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
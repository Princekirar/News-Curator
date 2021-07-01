from news import get_news
from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/<string:query>/<int:offset>', methods=['GET'])
def news(query, offset):
  return jsonify(get_news(q=query, offset=offset))

@app.route('/api/top', methods=['GET'])
def top():
  url = "https://trends.google.com/trends/hottrends/visualize/internal/data"
  headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'}
  response = requests.get(url, headers=headers, timeout=20)
  return jsonify(response.content.decode('utf8'))

@app.route('/')
def home():
  return 'News Reporter'

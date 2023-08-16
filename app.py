from flask import Flask, render_template, request, jsonify
from bardapi import Bard
import os

os.environ["_BARD_API_KEY"] = "Zwgdrpi8hkvaoMEylsSyuCpTG2ygEMlayjYkG4QG5_nAqLRlTeG_2R9Npstk57EIP9ZJGQ."
   
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json['user_input']
    # Add your chatbot logic here to generate a response
    response = (Bard().get_answer(str(user_input))['content'])
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')

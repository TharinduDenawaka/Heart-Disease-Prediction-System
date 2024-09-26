from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model and scaler
model = pickle.load(open('Heart.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = [
        data['age'], data['sex'], data['cp'], data['trestbps'],
        data['chol'], data['fbs'], data['restecg'], data['thalach'],
        data['exang'], data['oldpeak'], data['slope'], data['ca'], data['thal']
    ]
    features = np.array(features).reshape(1, -1)
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load the model
model = pickle.load(open('scaler.pkl', 'rb'))
scaler = StandardScaler()


@app.route('/predict', methods=['POST'])
def predict():
    # Get input features from the form
    features = [float(x) for x in request.form.values()]

    # Scale the features
    scaled_features = scaler.fit_transform([features])

    # Make prediction
    prediction = model.predict(scaled_features)

    # Return the result
    return render_template('index.html', prediction_text='Heart Disease Prediction: {}'.format(prediction[0]))


if __name__ == "__main__":
    app.run(debug=True)

import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load the saved model
model = pickle.load(open(r"C:\Users\thari\Downloads\FP NEW _ Kaggle\Heart.pkl", 'rb'))

# Load the scaler used during training
scaler = pickle.load(open(r"C:\Users\thari\Downloads\FP NEW _ Kaggle\scaler.pkl", 'rb'))

# Collect input data
age = int(input("Enter Age: "))
sex = int(input("Enter Sex [0 for male, 1 for female]: "))
cp = int(input("chest pain type (4 values): "))
trestbps = int(input("Enter resting blood pressure: "))
chol = int(input("Enter serum cholestoral in mg/dl: "))
fbs = int(input("Enter fasting blood sugar > 120 mg/dl: "))
restecg = int(input("Enter resting electrocardiographic results (values 0,1,2): "))
thalach = int(input("Enter maximum heart rate achieved: "))
exang = int(input("Enter exercise induced angina: "))
oldpeak = float(input("Enter  ST depression induced by exercise relative to rest: "))
slope = int(input("Enter the slope of the peak exercise ST segment: "))
ca = int(input("Enter number of major vessels (0-3) colored by flourosopy: "))
thal = int(input("Enter thal: 0 = normal; 1 = fixed defect; 2 = reversable defect: "))

# Prepare the input data as a numpy array
input_data = np.array([[age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]])

# Scale the input data using the same scaler used for training
input_data_scaled = scaler.transform(input_data)

# Make a prediction using the trained model
pred = model.predict(input_data_scaled)

# Display the prediction result
if pred == 0:
    print("** No disease **")
elif pred == 1:
    print("** disease **")


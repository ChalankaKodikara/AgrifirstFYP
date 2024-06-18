from flask import Flask, request, jsonify, send_file
from flask_mysqldb import MySQL
from PIL import Image
import numpy as np
import os
import tensorflow as tf
import secrets
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root123'
app.config['MYSQL_DB'] = 'plant_disease_db'

mysql = MySQL(app)

CORS(app, origins="http://localhost:3000", allow_headers=["Content-Type", "Authorization"])

# Load your Keras model
model = tf.keras.models.load_model('model/PD_new_model.h5')

# Define your classes for classification
classes = ['Aloevera___healthy_leaf', 'Aloevera___rot', 'Aloevera___rust', 'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Background_without_leaves', 'Cherry___healthy', 'Cherry___Powdery_mildew', 'Corn___Cercospora_leaf_spot Gray_leaf_spot', 'Corn___Common_rust', 'Corn___healthy', 'Corn___Northern_Leaf_Blight', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___healthy', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___healthy', 'Potato___Late_blight', 'Rose___Healthy_Leaf', 'Rose___Rust', 'Rose___sawfly_Rose_slug', 'Strawberry___healthy', 'Strawberry___Leaf_scorch', 'Tea___algal leaf', 'Tea___Anthracnose', 'Tea___bird eye spot', 'Tea___brown blight', 'Tea___gray light', 'Tea___healthy', 'Tea___red leaf spot', 'Tea___white spot', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___healthy', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_mosaic_virus', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus'] 
# Function to process the uploaded image
def process_image(image):
    img = Image.open(image)
    img = img.resize((224, 224))  # Resize image as required
    img_array = np.asarray(img)
    return np.expand_dims(img_array, axis=0)

# Function to generate a PDF report with a headline
def generate_pdf(report_headline, prediction, treatment):
    file_name = f"{prediction}_report.pdf"
    pdf_path = os.path.join('reports', file_name)

    # Create a PDF document
    c = canvas.Canvas(pdf_path, pagesize=letter)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, 800, report_headline)
    c.setFont("Helvetica", 12)
    c.drawString(100, 750, f"Prediction: {prediction}")
    c.drawString(100, 730, f"Treatment: {treatment}")
    c.save()

    return pdf_path

@app.route('/predict', methods=['POST'])
def predict_and_generate_pdf():
    if 'file' not in request.files:
        return jsonify({'prediction': "No file uploaded"})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'prediction': "No file selected"})

    # Extract user ID and location from request
    user_id = request.form.get('userId')
    location = request.form.get('location')  # Get location from the request
    print("User ID:", user_id)
    print("Location:", location)

    # Generate a unique filename for each uploaded file
    filename = secrets.token_hex(8) + '.jpg'
    file_path = os.path.join('uploads', filename)
    file.save(file_path)
    input_image = process_image(file_path)

    # Make predictions
    predict_result = model.predict(input_image)
    prediction_index = np.argmax(predict_result[0])
    prediction = classes[prediction_index]

    # Fetch treatment information from the database
    cur = mysql.connection.cursor()
    cur.execute("SELECT treatment_text FROM treatments WHERE disease_id = (SELECT id FROM diseases WHERE name = %s)", (prediction,))
    treatment_data = cur.fetchone()
    cur.close()

    treatment = treatment_data[0] if treatment_data else "No treatment required because it is healthy"

    report_headline = "Plant Disease Diagnosis Report"

    # Generate the PDF report
    pdf_path = generate_pdf(report_headline, prediction, treatment)

    # Save prediction, user ID, and location to the database
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO user_predictions (user_id, prediction, treatment, file_path, location) VALUES (%s, %s, %s, %s, %s)", (user_id, prediction, treatment, file_path, location))
    mysql.connection.commit()
    cur.close()

    return jsonify({'prediction': prediction, 'treatment': treatment, 'pdf_path': pdf_path})

@app.route('/download-pdf/<path:filename>', methods=['GET'])
def download_pdf(filename):
    return send_file(filename, as_attachment=True)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    if not os.path.exists('reports'):
        os.makedirs('reports')
    app.run(debug=True)

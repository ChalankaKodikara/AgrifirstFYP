from flask import Flask, request, jsonify, send_file
from flask_mysqldb import MySQL
from PIL import Image
import numpy as np
import os
import tensorflow as tf
import secrets
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root1234'
app.config['MYSQL_DB'] = 'plant_disease_db'

mysql = MySQL(app)

# Load your Keras model
model = tf.keras.models.load_model('model/efficientnetv2s_PLANT_DISEASE_new_new.h5')

# Define your classes for classification
classes = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']

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

# Route to handle image classification and treatment retrieval and generate PDF
@app.route('/predict', methods=['POST'])
def predict_and_generate_pdf():
    if 'file' not in request.files:
        return jsonify({'prediction': "No file uploaded"})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'prediction': "No file selected"})

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

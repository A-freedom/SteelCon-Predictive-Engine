import pickle

import tensorflow as tf
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  # Import CORS from flask_cors module
import sys
sys.path.append('model_work/R_CFST_NM')
from prediction import *
loaded_model = tf.keras.models.load_model('model_work/R_CFST_NM/my_model/best_model.h5')
with open('model_work/R_CFST_NM/my_model/data_scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict_R_CFST', methods=['POST'])
def predict():
    data = request.form

    # Define ranges for each parameter
    param_ranges = {
        'b': (40, 360),
        'h': (40, 360),
        't': (0.7, 15),
        'L': (100, 4500),
        'fy': (115, 835),
        'fc': (10, 160)
    }

    # Check if all parameters are present in the request
    if not all(param in data for param in param_ranges.keys()):
        return jsonify({'error': 'Missing parameters'}), 400

    # Validate each parameter
    for param, (min_val, max_val) in param_ranges.items():
        param_value = data.get(param)
        if param_value is None:
            return jsonify({'error': f'Missing value for parameter {param}'}), 400
        try:
            param_float = float(param_value)
            if not (min_val <= param_float <= max_val):
                return jsonify(
                    {'error': f'Parameter {param} must be in the range between {min_val} and {max_val}.'}), 400
        except ValueError:
            return jsonify({'error': f'Parameter {param} must be castable to double.'}), 400

    # Extract parameters for prediction
    prediction_params = {param: float(data[param]) for param in param_ranges.keys()}

    # Perform prediction
    df = create_data_frame(**prediction_params)
    prediction = {
        'ANN': int(predict_ann(df)),
        'ASIC': int(predict_aisc(df).loc[0]),
        'Hand Calculation': int(predict_hand(df).loc[0])
    }

    return str(prediction), 200


if __name__ == '__main__':
    # Run the app on port 80 and make it accessible on LAN IP
    app.run(host='0.0.0.0', port=8080, debug=False)

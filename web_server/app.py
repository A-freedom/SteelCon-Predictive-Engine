import pickle
import tensorflow as tf
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from model_work.R_CFST_NM.prediction import create_data_frame, predict_ann, predict_aisc

# Load the model and scaler
loaded_model = tf.keras.models.load_model('model_work/R_CFST_NM/my_model/best_model.h5')
with open('model_work/R_CFST_NM/my_model/data_scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# Initialize Flask app
app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

# Define parameter ranges
param_ranges = {
    'b': (40, 360),
    'h': (40, 360),
    't': (0.7, 15),
    'L': (100, 4500),
    'fy': (115, 835),
    'fc': (10, 160)
}


def validate_params(data):
    """Validate input parameters."""
    for param, (min_val, max_val) in param_ranges.items():
        param_value = data.get(param)
        if param_value is None:
            return f'Missing value for parameter {param}'
        try:
            param_float = float(param_value)
            if not (min_val <= param_float <= max_val):
                return f'Parameter {param} must be in the range between {min_val} and {max_val}.'
        except ValueError:
            return f'Parameter {param} must be castable to double.'
    return None


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict_R_CFST', methods=['POST'])
def predict():
    data = request.form

    # Validate input parameters
    error = validate_params(data)
    if error:
        return jsonify({'error': error}), 400

    # Extract parameters for prediction
    prediction_params = {param: float(data[param]) for param in param_ranges.keys()}

    # Perform prediction
    df = create_data_frame(**prediction_params)
    prediction = {
        'ANN': int(predict_ann(df)),
        'ASIC': int(predict_aisc(df).loc[0])
    }

    return jsonify(prediction), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=False)

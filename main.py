#%%
import tensorflow as tf
import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
os.environ["CUDA_VISIBLE_DEVICES"] = ""  # Limit TensorFlow to CPU only
from my_data import get_traing_and_testing_data
# from my_data import random_seed
from my_tools import evaluate_and_plot
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, TensorBoard


# Load the dataset
X_train, X_test, y_train, y_test, X, y = get_traing_and_testing_data()

# Model design
model = tf.keras.Sequential([
    tf.keras.layers.Dense(7, activation='elu'),
    tf.keras.layers.Dense(25, activation='elu'),
    tf.keras.layers.Dense(40, activation='elu'),
    tf.keras.layers.Dense(25, activation='elu'),
    tf.keras.layers.Dense(5, activation='elu'),
    tf.keras.layers.Dense(1, activation='elu')  # Output layer for regression
])

# Compile the model
custom_optimizer = tf.keras.optimizers.Adam(learning_rate=0.001,)
model.compile(optimizer=custom_optimizer,loss='mse', metrics=["mape", "mse"])

# Define callbacks
# Early stopping callback
# early_stopping = EarlyStopping(monitor='val_mse', patience=1000, restore_best_weights=True)
# Model checkpoint callback
checkpoint = ModelCheckpoint("my_model/best_model.h5", save_best_only=True)
# TensorBoard callback for profiling
tensorboard = TensorBoard(log_dir="logs/")

# Train the model
model.fit(X_train, y_train, epochs=60000, batch_size=len(X_train), verbose=2, validation_data=(X_test, y_test),
          callbacks=[checkpoint, tensorboard])

# Save the model
model.save('my_model')

# Evaluate the model on testing data
model.evaluate(X_test, y_test)

model = tf.keras.models.load_model('my_model/best_model.h5')

evaluate_and_plot(X_test, y_test, model, 'test data')

evaluate_and_plot(X, y, model, 'All data')

#%%

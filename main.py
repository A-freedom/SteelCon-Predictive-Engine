# %%
import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, TensorBoard
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
from my_data import *


# %% Set a random seed for reproducibility
tf.random.set_seed(random_seed)
# For TensorFlow GPU determinism
if tf.config.experimental.list_physical_devices('GPU'):
    tf.config.experimental.set_memory_growth(tf.config.experimental.list_physical_devices('GPU')[0], True)
    tf.config.experimental.set_virtual_device_configuration(
        tf.config.experimental.list_physical_devices('GPU')[0],
        [tf.config.experimental.VirtualDeviceConfiguration(memory_limit=6144)])  # Adjust the memory limit as needed
    tf.config.threading.set_intra_op_parallelism_threads(1)
    tf.config.threading.set_inter_op_parallelism_threads(1)

# %% # Load the dataset
X_train, X_test, y_train, y_test ,X , y = getData()

# %% modle desngin  
model = tf.keras.Sequential([
    tf.keras.layers.Dense(75,activation='tanh'),
    tf.keras.layers.Dense(75,activation='tanh'),
    tf.keras.layers.Dense(25),
    tf.keras.layers.Dense(1)  # Output layer for regression
])

# Compile the model
custom_optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
model.compile(optimizer=custom_optimizer, loss='mse',  metrics=["mape","mse"])

#calls back
# Early stopping callback
early_stopping = EarlyStopping(monitor='val_mse', patience=1000, restore_best_weights=True)
# Model checkpoint callback
checkpoint = ModelCheckpoint("my_model/best_model.h5", save_best_only=True)
# TensorBoard callback for profiling
tensorboard = TensorBoard(log_dir="logs/")


# %% Train the model
model.fit(X_train, y_train, epochs=50000, batch_size=50000, verbose=2, validation_data=(X_test, y_test), callbacks=[early_stopping, checkpoint, tensorboard])


# Evaluate the model on training testing
# %% evaluate the modle
model.evaluate(X_test, y_test)

# Save the model
# %% save the modle 
model.save('my_model')

# %% 

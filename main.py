# %%
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, TensorBoard
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

# Load the dataset
# %%
df = pd.read_csv('DATA/data_R_FCST.csv', header=0)
X = df[['b (mm)','h (mm)','t (mm)','L (mm)','fy (MPa)','fc (MPa)']]
y = df['N Test (kN)']

# Scale features
# %%
scaler = StandardScaler()
X = scaler.fit_transform(X)

#data spliting 
# %%
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1,random_state=20)

#modle desngin  
# %%
model = tf.keras.Sequential([
    tf.keras.layers.Dense(75, activation='tanh'),
    tf.keras.layers.Dense(75),
    tf.keras.layers.Dense(1)  # Output layer for regression
])

# Compile the model
# %%
custom_optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
model.compile(optimizer=custom_optimizer, loss='mse',  metrics=["mape","mse"])

#calls back
# %%
# Early stopping callback
early_stopping = EarlyStopping(monitor='val_mse', patience=5000, restore_best_weights=True)
# Model checkpoint callback
checkpoint = ModelCheckpoint("my_model/best_model.h5", save_best_only=True)
# TensorBoard callback for profiling
tensorboard = TensorBoard(log_dir="logs/")

# Train the model
# %%
model.fit(X_train, y_train, epochs=50000, batch_size=50000, verbose=2, validation_split=0.2, callbacks=[early_stopping,checkpoint, tensorboard])

# Evaluate the model on training data
# %%
model.evaluate(X_train, y_train)

# Evaluate the model on training testing
# %%
print("TESTING DATA")
model.evaluate(X_test, y_test)

# Save the model
model.save('my_model')
# %%

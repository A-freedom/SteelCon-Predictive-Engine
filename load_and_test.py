# %%
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import pandas as pd
from sklearn.model_selection import train_test_split
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

# %%
loaded_model = tf.keras.models.load_model('my_model/best_model.h5')


# %%
# Set a random seed for reproducibility
tf.random.set_seed(42)
df = pd.read_csv('DATA/data_R_FCST.csv', header=0)

# Check and swap values if 'b (mm)' is less than 'h (mm)'
mask = df['b (mm)'] < df['h (mm)']
df.loc[mask, ['b (mm)', 'h (mm)']] = df.loc[mask, ['h (mm)', 'b (mm)']].values

X = df[['b (mm)','h (mm)','t (mm)','fy (MPa)','fc (MPa)']]
y = df['N Test (kN)']

scaler = StandardScaler()
X = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15,random_state=20)
X_test, X_val, y_test, y_val = train_test_split(X_test, y_test, test_size=0.2,random_state=20)



# evaluate and status for testing data
# %%
loaded_model.evaluate(X_test, y_test)
y_pre = loaded_model.predict(X_test)
y_pre = [i[0] for i in y_pre]
pd.DataFrame(y_pre).to_csv('predicts.cvs',index_label=False,index=False)
error = (y_test - y_pre)/y_test *100
error = error.abs().sort_values()
# error.to_csv('error.csv', index=False,index_label=False)
error.describe()


# evaluate and status for testing All data
# %%
loaded_model.evaluate(X, y)
y_pre = loaded_model.predict(X)
y_pre = [i[0] for i in y_pre]
pd.DataFrame(y_pre).to_csv('predicts.cvs',index_label=False,index=False)
error = (y - y_pre)/y *100
error = error.abs().sort_values()
# error.to_csv('error.csv', index=False,index_label=False)
error.describe()



# %%
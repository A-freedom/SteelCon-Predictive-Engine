# %%
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import pandas as pd
from sklearn.model_selection import train_test_split
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
import matplotlib.pyplot as plt

# %%
loaded_model = tf.keras.models.load_model('my_model/best_model.h5')


# %%
# Set a random seed for reproducibility
tf.random.set_seed(42)
df = pd.read_csv('DATA/data_R_FCST.csv', header=0)

#Check for non-null values in the specified column
df = df[df['Ea (Gpa)'].notna()]

threshold = 197  # thresshold for 'Ea (Gpa)'
df = df[df['Ea (Gpa)'] >= threshold]

# Check and swap values if 'b (mm)' is less than 'h (mm)'
mask = df['b (mm)'] < df['h (mm)']
df.loc[mask, ['b (mm)', 'h (mm)']] = df.loc[mask, ['h (mm)', 'b (mm)']].values



X = df[['b (mm)','h (mm)','t (mm)','fy (MPa)','fc (MPa)']]
y = df['N Test (kN)']

scaler = StandardScaler()
X = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15,random_state=20)
X_test, X_val, y_test, y_val = train_test_split(X_test, y_test, test_size=0.2,random_state=20)



# evaluate for testing data
# %%
loaded_model.evaluate(X_test, y_test)
y_pre = loaded_model.predict(X_test)
y_pre = [i[0] for i in y_pre]
pd.DataFrame(y_pre).to_csv('predicts.cvs',index_label=False,index=False)
error = (y_pre)/y_test *100
# error.to_csv('error.csv', index=False,index_label=False)
error.describe()



# %% ploting 
plt.scatter(y_test, y_pre, marker='o', s=5)
# Adding labels and title
plt.xlabel('testing real data')
plt.ylabel('data')
plt.title('testing real data vs preducation')
plt.show()



# %% export
# exportData = {'real data': y_test, 'preducation data': y_pre}
# pandaDataFram = pd.DataFrame(exportData)
# pandaDataFram.to_csv('testing_data.csv', index=False)


# %%



# %% evaluate and for All data
loaded_model.evaluate(X, y)
y_pre = loaded_model.predict(X)
y_pre = [i[0] for i in y_pre]
pd.DataFrame(y_pre).to_csv('predicts.cvs',index_label=False,index=False)
error = (y_pre)/y *100
# error.to_csv('error.csv', index=False,index_label=False)
error.describe()

# %% ploting 
plt.scatter(y, y_pre, marker='o', s=5)
# Adding labels and title
plt.xlabel('All real data')
plt.ylabel('preducation')
plt.title('All data vs preductions')
plt.show()

# %% export evaluate and status for All data
# exportData = {'real data': y, 'preducation data': y_pre}
# pandaDataFram = pd.DataFrame(exportData)
# pandaDataFram.to_csv('testing_data.csv', index=False)


# %%

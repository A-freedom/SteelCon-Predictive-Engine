# %%
import tensorflow as tf
from my_data import *
from sklearn.preprocessing import StandardScaler
import pandas as pd
from sklearn.model_selection import train_test_split
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
import matplotlib.pyplot as plt

# %%
tf.random.set_seed(random_seed)
loaded_model = tf.keras.models.load_model('my_model')


# %% 
X_train, X_test, y_train, y_test ,X , y = getData()



# evaluate for testing data
# %%
loaded_model.evaluate(X_test, y_test)
y_test_pre = loaded_model.predict(X_test)
y_test_pre = [i[0] for i in y_test_pre]
pd.DataFrame(y_test_pre).to_csv('predicts.cvs',index_label=False,index=False)
error = (y_test_pre)/y_test *100
# error.to_csv('error.csv', index=False,index_label=False)
error.describe()



# %% ploting 
plt.gca().set_aspect('equal', adjustable='box')
plt.scatter(y_test, y_test_pre, marker='o', s=5)
# Adding labels and title
plt.xlabel('testing data')
plt.ylabel('preducation')
plt.title('testing data vs preducation')
plt.show()



# %% export
# exportData = {'data': y_test, 'preducation data': y_pre}
# pandaDataFram = pd.DataFrame(exportData)
# pandaDataFram.to_csv('testing_data.csv', index=False)


# %%



# %% evaluate and for All data
loaded_model.evaluate(X, y)
y_all_pre = loaded_model.predict(X)
y_all_pre = [i[0] for i in y_all_pre]
pd.DataFrame(y_all_pre).to_csv('predicts.cvs',index_label=False,index=False)
error = (y_all_pre)/y *100
# error.to_csv('error.csv', index=False,index_label=False)
error.describe()

# %% ploting 
plt.gca().set_aspect('equal', adjustable='box')
plt.scatter(y, y_all_pre, marker='o', s=5)
# Adding labels and title
plt.xlabel('All data')
plt.ylabel('preducation')
plt.title('All data vs preductions')
plt.show()

# %% export evaluate and status for All data
# exportData = {'data': y, 'preducation data': y_pre}
# pandaDataFram = pd.DataFrame(exportData)
# pandaDataFram.to_csv('testing_data.csv', index=False)


# %%

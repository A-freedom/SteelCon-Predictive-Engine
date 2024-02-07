# %%
import tensorflow as tf
from my_data import *
import pandas as pd
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
from my_tools import evaluate_and_plot
# %%
tf.random.set_seed(random_seed)
loaded_model = tf.keras.models.load_model('my_model')


    
# %% 
X_train, X_test, y_train, y_test ,X , y = get_traing_and_testing_data(testing_index=1)

print('+++++ model evaluate +++++')
loaded_model.evaluate(X_test,y_test)

evaluate_and_plot(X_test,y_test,loaded_model,'test data')

evaluate_and_plot(X,y,loaded_model,'All data')


# %%
# %%
import os
import pickle

import pandas as pd
from sklearn.preprocessing import StandardScaler

from filtering import outlier_filter


class DataPreprocessor:

    def __init__(self, denormalize_data=False):
        self.df = pd.DataFrame
        self.denormalize_data = denormalize_data
        self.random_seed = 6518906
        self.default_number_of_parts = 5
        self.testing_index = 3
        self.csv_file_path = 'DATA/3208 R_CFST_NM.csv'
        self.csv_file_index = 4
        self.columns_names = ['b (mm)', 'h (mm)', 't (mm)', 'L (mm)', 'fy (MPa)', 'fc (MPa)', 'N Test (kN)']

        self.read_file()
        self.prepare_data_frame()

    def read_file(self):
        # # Get the current directory of the script
        # current_directory = os.path.dirname(__file__)
        #
        # # Navigate to the directory one level above
        # parent_directory = os.path.abspath(os.path.join(current_directory, os.pardir))
        #
        # file_path = os.path.join(parent_directory, self.csv_file_path)
        # Read the data
        self.df = pd.read_csv(self.csv_file_path, header=self.csv_file_index)

    # this function is used to do all the processing of the data
    def prepare_data_frame(self):
        # Choosing only the relevant columns
        self.df = self.df[self.columns_names]

        self.df = self.df.loc[self.df['N Test (kN)'] < 10000]

        # Check and swap values if 'b (mm)' is less than 'h (mm)'
        mask = self.df['b (mm)'] < self.df['h (mm)']
        self.df.loc[mask, ['b (mm)', 'h (mm)']] = self.df.loc[mask, ['h (mm)', 'b (mm)']].values

        # Normalize
        scaler = StandardScaler()
        self.df = pd.DataFrame(scaler.fit_transform(self.df), columns=self.df.columns)
        # Save the fitted scaler object to a file
        with open('model_work/my_model/data_scaler.pkl', 'wb') as f:
            pickle.dump(scaler, f)
        # Save original index , use this only for debugging
        # df['original_index'] = df.index

        print(f'All data before filtering : {len(self.df)}')

        # removing outlay values
        self.df = outlier_filter(self.df)
        print(f'data total after outlier_filter : {len(self.df)}')

        if self.denormalize_data:
            # Denormalize the all columns'
            self.df = pd.DataFrame(scaler.inverse_transform(self.df), columns=self.df.columns)
        else:
            # Denormalize the scaled 'N Test (kN)'
            self.df['N Test (kN)'] = scaler.inverse_transform(self.df)[:, -1]

        # Shuffle the DataFrame randomly
        self.df = self.df.sample(frac=1, random_state=self.random_seed).reset_index(drop=True)

    def get_data_parts(self):
        # Divide the data into parts and store them in an array of pandas DataFrames
        data_parts = []
        part_size = len(self.df) // self.default_number_of_parts
        for i in range(self.default_number_of_parts):
            if i == self.default_number_of_parts - 1:
                data_parts.append(self.df.iloc[i * part_size:])
            else:
                data_parts.append(self.df.iloc[i * part_size: (i + 1) * part_size])
        return data_parts
        # Now data_parts is an array containing the divided parts of the DataFrame

    def get_training_and_testing_data(self):
        # Assuming you have a function called get_data_parts() that returns a list of data parts
        data_parts = self.get_data_parts()

        # Pop out the testing set from data_parts
        testing = data_parts.pop(self.testing_index)

        # Concatenate the remaining parts into the training set
        training = pd.concat(data_parts)

        # Split training and testing sets into features (X) and target variable (y)
        X_train = training.drop('N Test (kN)', axis=1)
        y_train = training['N Test (kN)']
        X_test = testing.drop('N Test (kN)', axis=1)
        y_test = testing['N Test (kN)']

        # Concatenate all data parts into the complete dataset
        X = pd.concat([X_train, X_test])
        y = pd.concat([y_train, y_test])
        return X_train, X_test, y_train, y_test, X, y

    def save_files(self, file_name='3208_R_CFST_NM'):
        data_parts = self.get_data_parts()
        for i, part in enumerate(data_parts):
            part.to_csv(os.path.join('DATA/normalised', f'{file_name}_part_{i + 1}.csv'), index=False)
# %%

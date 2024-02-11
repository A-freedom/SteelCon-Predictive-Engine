# %%
import os
import pandas as pd
from sklearn.preprocessing import StandardScaler
from filtering import distance_filter
from filtering import outlier_filter

random_seed = 6518906
defualt_number_of_parts = 5
testing_index = 3


# this funcation is used to do all the prossing of the data
def get_data_fram():
    # Read the data
    df = pd.read_csv('DATA/3208 R_CFST_NM.csv', header=4)

    # Choosing only the relevant columns
    df = df[['b (mm)', 'h (mm)', 't (mm)', 'L (mm)', 'fy (MPa)', 'fc (MPa)', 'N Test (kN)']]

    df = df.loc[df['N Test (kN)'] < 10000]

    # Check and swap values if 'b (mm)' is less than 'h (mm)'
    mask = df['b (mm)'] < df['h (mm)']
    df.loc[mask, ['b (mm)', 'h (mm)']] = df.loc[mask, ['h (mm)', 'b (mm)']].values

    # Normalize
    scaler = StandardScaler()
    df.iloc[:, :7] = pd.DataFrame(scaler.fit_transform(df.iloc[:, :7].values))
    # Save original index
    # df['original_index'] = df.index

    # print(f'data total zise : {len(df)}')

    # # removing real close or smailer valuse
    print(f'All data before filtering : {len(df)}')

    # df = distance_filter(df)
    print(f'data total after distance_filter : {len(df)}')

    # removing outlayer valuse
    df = outlier_filter(df)
    print(f'data total after outlier_filter : {len(df)}')

    # Denormalize the scaled 'N Test (kN)'
    df['N Test (kN)'] = pd.DataFrame(scaler.inverse_transform(df.iloc[:, :7].values))[6].values

    # Shuffle the DataFrame randomly
    df = df.sample(frac=1 ,random_state=random_seed).reset_index(drop=True)
    return df


def get_data_parts(num_parts=defualt_number_of_parts):
    df = get_data_fram()
    # Divide the data into parts and store them in an array of pandas DataFrames
    data_parts = []
    part_size = len(df) // num_parts
    for i in range(num_parts):
        if i == num_parts - 1:
            data_parts.append(df.iloc[i * part_size:])
        else:
            data_parts.append(df.iloc[i * part_size: (i + 1) * part_size])
    return data_parts
    # Now data_parts is an array containing the divided parts of the DataFrame


def get_traing_and_testing_data(num_parts=defualt_number_of_parts):
    # Assuming you have a function called get_data_parts() that returns a list of data parts
    data_parts = get_data_parts(num_parts=num_parts)

    # Pop out the testing set from data_parts
    testing = data_parts.pop(testing_index)

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


def save_files(num_parts=defualt_number_of_parts, fileName='3208_R_CFST_NM'):
    data_parts = get_data_parts(num_parts=num_parts)
    for i, part in enumerate(data_parts):
        part.to_csv(os.path.join('DATA/normalised', f'{fileName}_part_{i + 1}.csv'), index=False)
# %%

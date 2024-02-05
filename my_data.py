import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
random_seed= 98192
def getData():
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
    return X_train, X_test, y_train, y_test ,X , y

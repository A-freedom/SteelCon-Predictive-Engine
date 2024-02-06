import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
random_seed= 51980
def getData():
    df = pd.read_csv('DATA/data_R_FCST.csv', header=0)

     # this is only for test
    df = df.drop(246)

    # Filter rows where 'Ea (Gpa)' column is not NaN
    df = df[df['Ea (Gpa)'].notna()]  # Ea (Gpa) != NaN

    # Filter rows where 'Ea (Gpa)' column values are greater than or equal to 197
    df = df[df['Ea (Gpa)'] >= 197]  # Ea (Gpa) ≥ 197

    # Filter rows where 'Ea (Gpa)' column values are less than or equal to 210
    # df = df[df['Ea (Gpa)'] <= 210]  # Ea (Gpa) ≤ 210

    # Filter rows where 't (mm)' column values are less than 10 and greater than 2
    df = df[(df['t (mm)'] < 10) & (df['t (mm)'] > 2)]  # 2 < t (mm) < 10

    # Filter rows where the ratio of 'h (mm)' to 'b (mm)' is between 0.8 and 1.5
    df = df[(df['h (mm)'] / df['b (mm)'] < 1.5) & (df['h (mm)'] / df['b (mm)'] > 0.8)]  # 0.8 < h (mm) / b (mm) < 1.5

    # Filter rows where 'L (mm)' column values are less than 1000
    df = df[df['L (mm)'] < 1000]  # L (mm) < 1000

    # Filter rows where 'fc (MPa)' column values are less than 100
    df = df[df['fc (MPa)'] < 100]  # fc (MPa) < 100

    # Filter rows where 'N Test (kN)' column values are less than 8000
    df = df[df['N Test (kN)'] < 8000]  # N Test (kN) < 8000

   

    # Check and swap values if 'b (mm)' is less than 'h (mm)'
    mask = df['b (mm)'] < df['h (mm)']
    df.loc[mask, ['b (mm)', 'h (mm)']] = df.loc[mask, ['h (mm)', 'b (mm)']].values



    X = df[['b (mm)','h (mm)','t (mm)','fy (MPa)','fc (MPa)']]
    y = df['N Test (kN)']

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15,random_state=20)
    return X_train, X_test, y_train, y_test ,X , y

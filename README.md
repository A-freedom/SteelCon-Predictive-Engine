# Graduation Project

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-518065.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

This is an Artificial Neural Network (ANN) developed by students at the University of Basra, College of Civil Engineering. It predicts the compressive strength of Rectangular Concrete-Filled Steel Tubes (R_CFST).

## Overview

This is an Artificial Neural Network (ANN) developed by students at the University of Basra, College of Civil Engineering. It predicts the compressive strength of Rectangular Concrete-Filled Steel Tubes (R_CFST).

### Download the Project

```bash
git clone https://github.com/A-freedom/SteelCon-Predictive-Engine.git
cd SteelCon-Predictive-Engine
```
## Installation using docker

To set up the web server for running this project on Linux servers, follow these steps:

### Prerequisites

Ensure you have `git` and `docker` installed on your system.

### Build and Run the Docker Container
```bash
docker build -t steel_concrete .
docker run -p 8080:8080 steel_concrete
```
if you want to Replace 8080 with your desired port number. The application will be accessible at http://localhost:8080 .

## Local Installation for Linux `"ubuntu"`
### Prerequisites

Ensure you have `python3-full` and `git` installed on your system.
```bash
# install python.
sudo apt install python3-full    
# create python virtual environment.
python3 -m venv .venv   
# create enter the virtual environment.
source .venv/bin/activate     
# install the requirements from the requirements.txt file .
# if you wish only to run the serve you could use server_requirements.txt file instead.
python -m pip install --no-cache-dir -r requirements.txt
# link the web_client to be served by the web_server.
ln -s ../web_client/build/web web_server/static
```

# Local Installation for Windows

# Project Setup Guide

## Local Installation for Windows

### Prerequisites

Ensure you have `python3` and `git` installed on your system.

### Setup Instructions
#### If you are going to use `pycharm` you could skip the 1,2 .
1. **Download and Install Python:**  
   Download Python from the [official website](https://www.python.org/downloads/windows/) and follow the installation instructions. Make sure to check the option to add Python to PATH during installation.

2. **Install `Git` :**  
   Download and install Git for Windows from the [official website](https://git-scm.com/download/win).

3. **Install `icrosoft Visual C++` :**   
   Download from the [official website](https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170)

4. **Create a Virtual Environment:**

   Open Command Prompt as administrator and navigate to your project directory. Then, create and activate a virtual environment by running the script blow.
```bash
# create python virtual environment.
python -m venv .venv  
# create enter the virtual environment.
.venv\Scripts\activate    
# install the requirements from the requirements.txt file .
# if you wish only to run the serve you could use server_requirements.txt file instead.
python -m pip install --no-cache-dir -r requirements.txt
```
5. **If you want to run the web_server you will need to run the flowing command .** 
```bash
# link the web_client to be served by the web_server.
copy web_client\build\web web_server\static -r
```
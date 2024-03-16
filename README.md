# Graduation Project

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-518065.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)


This is an Artificial Neural Network (ANN) developed by students at the University of Basra, College of civil
Engineering . It predicts the compressive strength of Rectangular Concrete-Filled Steel Tubes (R_CFST).

## Overview

This is an Artificial Neural Network (ANN) developed by students at the University of Basra, College of Civil
Engineering. It predicts the compressive strength of Rectangular Concrete-Filled Steel Tubes (R_CFST).

## Installation

To run this project on Linux servers, ensure you have `git` and `docker` installed.

### Download the Project

```bash
git clone https://github.com/A-freedom/SteelCon-Predictive-Engine.git
cd SteelCon-Predictive-Engine
```

### build and run the docker container

```bash
docker build -t steel_concrete .
docker run -p 8080:80 steel_concrete
```

Replace 8080 with the desired port number. The application will be accessible at http://localhost:80.

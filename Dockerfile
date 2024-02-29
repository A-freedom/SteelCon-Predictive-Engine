# Use an official Python runtime as a parent image
FROM python:3.10.12-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the built Flutter web app to the web_server/static directory
COPY web_client/build/web web_server/static/web

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "web_server/app.py"]
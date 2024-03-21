FROM python:3.10.12-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip3 install --no-cache-dir -r server_requirements.txt

# Copy the built Flutter web app to the web_server/static directory
COPY web_client/build/web /app/web_server/static


# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run app.py when the container launchese
CMD ["python", "run_web_service.py"]
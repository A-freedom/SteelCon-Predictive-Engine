FROM python:3.10.12-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN apt install python3-full
RUN python3 -m venv .venv
RUN source .venv/bin/activate
RUN ln -s ../web_client/build/web web_server/static
RUN pip3 install --no-cache-dir -r server_requirements.txt

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run app.py when the container launches
CMD ["python", "run_web_service.py"]
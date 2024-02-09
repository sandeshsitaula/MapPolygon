# Use the official Python image as the base image
FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Install system dependencies for GDAL
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libgdal-dev wget unzip \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /opt
RUN wget https://dl.google.com/android/repository/platform-tools-latest-linux.zip && \
    unzip platform-tools-latest-linux.zip -d android-sdk && \
    rm platform-tools-latest-linux.zip

# Add adb to the PATH
ENV PATH="/opt/android-sdk/platform-tools:${PATH}"

RUN adb devices
# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy the Django project into the container
COPY . /app/


# Run migrations

# Expose the port the app runs on (optional, as it is already specified in docker-compose.yml)
EXPOSE 8000
EXPOSE 5037
RUN ls -l /app
# Start script that includes migrations
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
CMD ["/docker-entrypoint.sh"]

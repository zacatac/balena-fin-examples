FROM resin/raspberrypi3-node:8-slim

# Defines our working directory in container
WORKDIR /usr/src/app

# Copy the package.json first for better cache on later pushes
COPY ./app/package.json package.json

# Install the building dependencies - we will get rid of them contextually so no additional size will be added to our layer
RUN apt-get update && apt-get install -yq --no-install-recommends \
  build-essential \
  python-dev \
  git \
  curl \
  wget \
  && JOBS=MAX npm install --unsafe-perm --production && npm cache clean --force && rm -rf /tmp/* \
  && apt-get purge -y \
    build-essential \
    python-dev \
    git \
    curl \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Move our scripts in the root to the working directory in the container
COPY ./app/ ./

# Start app
CMD ["npm", "start"]

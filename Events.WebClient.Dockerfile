FROM node:12

ENV PORT 3000

# Set environment variables
ARG NEXT_PUBLIC_EVENT_API_URL=''
ENV NODE_ENV=production
ENV NEXT_PUBLIC_EVENT_API_URL=$NEXT_PUBLIC_EVENT_API_URL

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY ./frontend/simple/package*.json .
RUN yarn install

# Copying source files
COPY . /usr/src/app
COPY ./frontend/simple/ /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "yarn" "start"
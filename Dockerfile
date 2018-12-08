FROM node:10.13-alpine

LABEL maintainer "Jason Yeh <jason@yehs.us>"

# Install prerequisites
RUN apk update && apk add --no-cache bash coreutils grep sed yarn python g++ make postgresql

# Set the working directory
ADD . /code
WORKDIR /code

# Install Node.js dependencies (only production)
RUN ["chmod", "+x", "wait-for-postgres.sh"]
RUN ["yarn", "--production"]

# Init Docker command
EXPOSE 3000
CMD ["yarn", "start"]

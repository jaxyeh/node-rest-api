FROM node:10.13-alpine

LABEL maintainer "Jason Yeh <jason@yehs.us>"

# Install prerequisites
RUN apk update && apk add --no-cache bash coreutils grep sed yarn python g++ make

# Set the working directory
ADD . /code
WORKDIR /code

# Install Node.js dependencies (only production)
RUN yarn --production

EXPOSE 3000

CMD ["yarn", "start"]

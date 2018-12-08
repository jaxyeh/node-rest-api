#!/bin/sh

yarn install
yarn run db:latest

if [ "$NODE_ENV" == "production" ] ; then
  yarn start
else
  yarn run dev
fi

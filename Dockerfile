FROM node:12.18.4

ENV LANG C.UTF-8
ENV TZ Asia/Ho_Chi_Minh

# set the working directory in the container
WORKDIR /app

# COPY the package json and package json lock files
COPY ./package*.json .
# COPY ./.env.${NODE_ENV} ./.env

# perform install
RUN yarn install --silent

# copy all files to the work directory
COPY . .

# run the command
RUN yarn build

# expose 3000 on container
EXPOSE 3001

# start the app
CMD ["yarn", "start" ]
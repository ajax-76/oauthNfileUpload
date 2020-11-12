FROM node:latest

LABEL Ankit Seth

#ENV MONGO_URL=mongodb://mongo:27017/HASHED_URL
ENV MONGO_URL=mongodb://mongo:27017/OAUTH_DB
ENV MONGO_DATABASE=OAUTH_DB
ENV SERVER_PORT=4001
ENV SALT_ROUNDS=10
# ENV SMTP_HOST=SMTP_HOST,
# ENV SMTP_PORT=SMTP_PORT,
# ENV SMTP_USERNAME=SMTP_USERNAME,
# ENV SMTP_PASSWORD=SMTP_PASSWORD,
# ENV API_URL='https=//debug-api.qart.in'


WORKDIR /var/www/api/auth_server

COPY . /var/www/api/auth_server

# RUN npm install bcrypt
RUN npm install


EXPOSE ${SERVER_PORT}

ENTRYPOINT  [ "node" ,"index.js"]
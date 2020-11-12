FROM node:latest

LABEL Ankit Seth

#ENV MONGO_URL=mongodb://mongo:27017/HASHED_URL
# ENV SMTP_HOST=SMTP_HOST,
# ENV SMTP_PORT=SMTP_PORT,
# ENV SMTP_USERNAME=SMTP_USERNAME,
# ENV SMTP_PASSWORD=SMTP_PASSWORD,
# ENV API_URL='https=//debug-api.qart.in'

ENV MONGO_URL=mongodb://mongo:27017/APP_DB
ENV MONGO_DATABASE=APP_DB
ENV SERVER_PORT=5001
ENV SALT_ROUNDS=10
ENV JWT_SECRET=#ede$%!1
ENV AUTH_SERVER=http://143.110.189.158

WORKDIR /var/www/api/app_server

COPY . /var/www/api/app_server

# RUN npm install bcrypt

RUN npm install


EXPOSE ${SERVER_PORT}

ENTRYPOINT  [ "node" ,"index.js"]
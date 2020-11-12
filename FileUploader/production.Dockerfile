FROM node:latest

LABEL Ankit Seth

#ENV MONGO_URL=mongodb://mongo:27017/HASHED_URL
ENV MONGO_URL=mongodb://mongo:27017/FILE_DB
ENV MONGO_DATABASE=FILE_DB
ENV SERVER_PORT=6001
ENV BUCKET_NAME=qartstorage
ENV SPACE_ACCESS_ID=7DYWWL5SHJKCEVYNBZOP
ENV SPACE_SECRET_KEY=INRJc3YXeIbA4/79waw5CplRlDeq4349b05L/1bL4EA
ENV BUCKET_URL=https://yellowbacks.ams3.digitaloceanspaces.com/
ENV STORAGE_NAME=qartexceldatauploads
ENV STORAGE_URL=https://qartstorage.sfo2.digitaloceanspaces.com
# ENV SMTP_HOST=SMTP_HOST,
# ENV SMTP_PORT=SMTP_PORT,
# ENV SMTP_USERNAME=SMTP_USERNAME,
# ENV SMTP_PASSWORD=SMTP_PASSWORD,
# ENV API_URL='https=//debug-api.qart.in'


WORKDIR /var/www/api/file_uploader

COPY . /var/www/api/file_uploader

# RUN npm install bcrypt

RUN npm install


EXPOSE ${SERVER_PORT}

ENTRYPOINT  [ "node" ,"index.js"]
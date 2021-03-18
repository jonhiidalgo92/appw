# we take the image of ngix in its latest version
FROM nginx:latest

# we copy the files of our api inside actual folder and send inside container folder
COPY ./build /usr/share/nginx/html/ 

WORKDIR /etc/nginx/conf.d

COPY ./default.conf .

# we open the port 80
EXPOSE 80
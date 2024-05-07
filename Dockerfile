FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y mysql-server

ENV MYSQL_DATABASE=blog_db 
ENV MYSQL_USER=mon21699
ENV MYSQL_PASSWORD=passwordblog2024
ENV MYSQL_ROOT_PASSWORD=root_password

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 3306

CMD ["mysqld"]
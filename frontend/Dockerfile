FROM node:18

WORKDIR /app/frontend

RUN npm install -g create-vite

RUN create-vite . --template react

COPY . /app/frontend/

RUN ls -l
EXPOSE 3000
ENV HOST=0.0.0.0
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
CMD ["/docker-entrypoint.sh"]

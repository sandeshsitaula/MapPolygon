FROM node:16

WORKDIR /app/frontend

RUN npm install -g create-vite

RUN create-vite . --template react


COPY . /app/frontend/

RUN ls -l
RUN npm install

EXPOSE 5173

ENV HOST=0.0.0.0
RUN ls -l
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
CMD ["/docker-entrypoint.sh"]

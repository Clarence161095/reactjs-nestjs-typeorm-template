FROM node:16-alpine as back_end

WORKDIR /back_end

COPY ./back_end .

RUN npm install

EXPOSE 3000

# CMD [ "npm", "run", "start:prod" ]
CMD [ "npm", "run", "dev" ]

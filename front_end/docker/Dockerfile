FROM node:16-alpine as front_end

WORKDIR /front_end

COPY ./front_end .

RUN npm install

EXPOSE 4000

# CMD [ "npm", "run", "start:prod" ]
CMD [ "npm", "run", "dev" ]

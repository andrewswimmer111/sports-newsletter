
FROM node:14
WORKDIR /app

ADD package.json .
ADD package-lock.json .
RUN npm install

RUN echo "npm start running..."
CMD ["npm", "start"]
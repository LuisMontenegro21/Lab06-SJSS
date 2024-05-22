FROM node:14

# Create directory
WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
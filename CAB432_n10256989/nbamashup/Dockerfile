FROM node:boron

#Copy app source
COPY . /app

#Set working directory to source
WORKDIR /app

#Install app dependenicies
RUN npm install

#Expose port to the outside world
EXPOSE 3000

#Start command as per package.json
CMD [ "npm","start" ]


FROM node:current-alpine3.10

WORKDIR /project

COPY . .

RUN npm install && npm install -g typescript@latest

RUN cd client && npm install && yarn build

RUN tsc

EXPOSE 3000 5001

CMD ["npm", "run",  "devdock"]

#Commands to build image and run container:
#docker build --tag iou .
#docker run -p 3000:3000 -p 5001:5001 --name iou iou
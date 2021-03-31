FROM node:15.0.1
RUN set APP_ENV=prod
RUN export APP_ENV=prod
ARG APP_ENV=prod
ENV APP_ENV $APP_ENV
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
RUN npm install -g @angular/cli
COPY . /app
EXPOSE 4000
CMD npm run ssr:prod
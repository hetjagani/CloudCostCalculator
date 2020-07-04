FROM node:10.19.0-alpine AS compile-image
WORKDIR /opt/ng

COPY . ./
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --prod

FROM nginx
COPY --from=compile-image /opt/ng/dist/CloudCostCalculator /usr/share/nginx/html

FROM node:18 AS client-build
WORKDIR /usr/src/app
COPY calculator_client/ ./calculator_client/
RUN cd calculator_client && npm install && npm run build

FROM node:18 AS server-build
WORKDIR /root/
COPY --from=client-build /usr/src/app/calculator_client/build ./calculator_client/build
COPY calculator_server/ ./calculator_server/
RUN cd calculator_server && npm install && npx tsc
COPY calculator_server/ ./calculator_server/

EXPOSE 4000

CMD ["node", "./calculator_server/index.js"]
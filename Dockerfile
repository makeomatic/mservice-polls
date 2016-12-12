FROM makeomatic/node:$NODE_VERSION

ENV NCONF_NAMESPACE=MSERVICE_POLLS \
    NODE_ENV=$NODE_ENV

WORKDIR /src

COPY package.json .

RUN apk --no-cache add --virtual .buildDeps \
    build-base \
    python \
    git \
    curl \
    openssl

RUN npm install --production

# RUN npm dedupe

RUN apk del \
    .buildDeps \
    wget

RUN rm -rf \
    /tmp/* \
    /root/.node-gyp \
    /root/.npm

COPY . /src
RUN  chown -R node /src
USER node

EXPOSE 3000

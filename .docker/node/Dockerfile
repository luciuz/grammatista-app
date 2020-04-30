#
#--------------------------------------------------------------------------
# Image Setup
# $REF: $
#--------------------------------------------------------------------------
#

FROM node:10.14.2

USER root
WORKDIR /root

COPY ./su-node.sh /sbin/su-node
RUN sed -i 's/\r//'  /sbin/su-node

RUN apt-get -qy update \
    && apt-get -qy install bash sudo \
                 curl nano wget

RUN wget --no-check-certificate -q -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.10/gosu-amd64" \
  && chmod +x /usr/local/bin/gosu

RUN ln -s /usr/local/bin/gosu /usr/local/bin/su-exec

RUN npm i -g npm@6.4.1 \
    && npm i -g gulp-cli yarn \
    && npm i -g cross-env   \
    && chmod +x /usr/local/lib/node_modules/yarn/bin/yarn.js \
    && rm -rf /root/.npm    \
    && echo "cache=/tmp/.npm" >> /.npmrc \
    && echo "prefix=/tmp" >> /.npmrc     \
    && chmod +x /sbin/su-node

EXPOSE 3000

WORKDIR /var/www

COPY ./wait.sh /sbin/wait.sh
RUN sed -i 's/\r//'  /sbin/wait.sh && chmod +x /sbin/wait.sh

CMD ["/sbin/wait.sh"]

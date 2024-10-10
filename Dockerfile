FROM ubuntu:22.04

ENV NVM_DIR $TMP_STORE/nvm
ENV NODE_VERSION 18.12.1

RUN apt-get update

RUN apt-get -y upgrade

RUN apt-get -y install curl

RUN apt-get -y install nano vim git

ENV NVM_DIR /root/.nvm
ENV NODE_VERSION lts/*
RUN mkdir $HOME/.nvm && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash && \
    chmod +x $HOME/.nvm/nvm.sh && \
    . $HOME/.nvm/nvm.sh && \
    nvm install --latest-npm "$NODE_VERSION" && \
    nvm alias default "$NODE_VERSION" && \
    nvm use default && \
    DEFAULT_NODE_VERSION=$(nvm version default) && \
    ln -sf /root/.nvm/versions/node/$DEFAULT_NODE_VERSION/bin/node /usr/bin/nodejs && \
    ln -sf /root/.nvm/versions/node/$DEFAULT_NODE_VERSION/bin/node /usr/bin/node && \
    ln -sf /root/.nvm/versions/node/$DEFAULT_NODE_VERSION/bin/npm /usr/bin/npm


WORKDIR /project

CMD /bin/bash
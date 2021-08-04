ARG CODE_VERSION=16.04


FROM ubuntu:${CODE_VERSION}

RUN apt update -y

CMD ["zsh"]


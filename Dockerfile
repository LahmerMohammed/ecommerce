ARG CODE_VERSION=20.04
FROM ubuntu:${CODE_VERSION}

LABEL Creator: "Lahmer Mohammed"


RUN apt update -y


EXPOSE 80

CMD ["bash"]


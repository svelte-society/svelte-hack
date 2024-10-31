FROM golang:1.23-alpine

RUN apk add --no-cache curl

WORKDIR /app
COPY . .

RUN go build
RUN ./svelte-hack-pb migrate up

CMD ["./svelte-hack-pb", "serve", "--http", "0.0.0.0:8090"]

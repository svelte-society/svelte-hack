FROM golang:1.23-alpine

WORKDIR /app
COPY . .

RUN go build
RUN ./svelte-hack-pb migrate up

CMD ["./svelte-hack-pb", "serve"]

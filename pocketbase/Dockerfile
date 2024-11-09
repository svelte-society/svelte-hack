FROM golang:1.23-alpine

RUN apk add --no-cache curl

WORKDIR /app
COPY . .

RUN go build
RUN ./svelte-hack-pb migrate up

HEALTHCHECK --interval=10s --timeout=5s --retries=6 \
    CMD curl -sf http://127.0.0.1:8090/api/health || exit 1

VOLUME /app/pb_data

EXPOSE 8090

CMD ["./svelte-hack-pb", "serve", "--http", "0.0.0.0:8090"]

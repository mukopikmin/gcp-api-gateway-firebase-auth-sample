
FROM node:15.5.0 AS client-builder
WORKDIR /work
COPY client/package.json client/yarn.lock ./
RUN yarn
COPY client/ .
RUN yarn build

FROM golang:1.15.6 AS server-builder
WORKDIR /work
COPY ./ .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app -v

FROM alpine:3.12.3
WORKDIR /app
COPY --from=client-builder /work/out/ ./assets
COPY --from=server-builder /work/app ./bin

CMD ["/app/bin"]
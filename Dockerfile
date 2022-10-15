FROM k33g/capsule-launcher:0.2.8
ADD index.wasm ./
ADD *.md ./
EXPOSE 8080
CMD ["/capsule", "-wasm=./index.wasm", "-mode=http", "-httpPort=8080"]

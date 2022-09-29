build-lambda:
	GOOS=linux GOARCH=amd64 go build -mod=vendor -o ./bootstrap
	cp ./bootstrap $(ARTIFACTS_DIR)/.

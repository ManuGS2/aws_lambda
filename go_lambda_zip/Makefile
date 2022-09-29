build-lambda:
	GOOS=linux GOARCH=amd64 go build -mod=vendor -o /asset-output/bootstrap
	echo $GOOS

build-lambda-2:
	GOOS=linux GOARCH=amd64 go build -mod=vendor -o ./bootstrap
	cp ./bootstrap $(ARTIFACTS_DIR)/.

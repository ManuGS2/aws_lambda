build-vendor:
	go mod vendor

build-lambda:
	GOOS=linux GOARCH=amd64 go build -mod=vendor -o /asset-output/bootstrap
	echo $(ARTIFACTS_DIR)

build-lambda-2:
	GOOS=linux GOARCH=amd64 go build -mod=vendor -o ./bootstrap
	cp ./bootstrap $(ARTIFACTS_DIR)/.

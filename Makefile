#!make
.DEFAULT_GOAL := build

registry = registry.pentusha.com

install_emulators:
	docker run --privileged --rm tonistiigi/binfmt --install all

build: install_emulators
	docker buildx build \
		--file ./Dockerfile \
		--pull \
		--push \
		--platform linux/amd64,linux/arm64 \
		--tag $(registry)/magnet/web:latest \
		.

deploy: build
	helm upgrade magnet \
		./helm \
		--create-namespace \
		--namespace magnet \
		--values helm/values.yaml \
		--set image.tag=latest \
		--atomic \
		--timeout 3m0s \
		--install \
		--cleanup-on-fail \
		--debug
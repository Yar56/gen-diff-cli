install:
	npm install
publish:
	npm publish --dry-runt
lint:
	npx eslint .

.PHONY: test
<div align="center">
  <br>
  <h1>Difference Calculator<img align="center" src="https://img.icons8.com/nolan/64/compare.png" alt='Logo of the project'></h1>
  <h3>Command line app to search for differences between two files</h3>
</div>
<br>


### Hexlet tests and linter status:
[![Actions Status](https://github.com/Yar56/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Yar56/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/df52d864992d3856d142/maintainability)](https://codeclimate.com/github/Yar56/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/df52d864992d3856d142/test_coverage)](https://codeclimate.com/github/Yar56/frontend-project-lvl2/test_coverage)

## What is Mind Games?
A difference calculator is a program that determines the difference between two data structures. This is a popular task, for which there are many online services, e.g. [JSON Diff](https://jsondiff.org/)

### Features of the utility:
  - Supports different input formats: yaml, json
  - Report generation as plain text, stylish and json

## Prerequisite
You need [Node.js](https://nodejs.org) installed on your machine. ( node-version: __[14.x]__ )

## Installing / Getting started

```shell
make install
make publish
npm link
```

## Flat files 
### json vs json or yaml vs yaml or json vs yaml
```bash
$ genfiff filepath1 filepath2
```
___The function takes paths to flat files and returns the difference in plain text.___

*JSON*

[![asciicast](https://asciinema.org/a/GoSCVL2KwXSG8sxkyGKH1MCQJ.svg)](https://asciinema.org/a/GoSCVL2KwXSG8sxkyGKH1MCQJ)

*YAML*

[![asciicast](https://asciinema.org/a/388890.svg)](https://asciinema.org/a/388890)

## Nested files

### json vs json or yaml vs yaml or json vs yaml
```bash
$ genfiff filepath1 filepath2
```
__The function takes paths to nested files and returns the difference in stylish format.__

*JSON and YML*

[![asciicast](https://asciinema.org/a/99Qo2PLkgX4yxtPlW9YrBlDqn.svg)](https://asciinema.org/a/99Qo2PLkgX4yxtPlW9YrBlDqn)

## Formats

### stylish (default format)
```bash
$ genfiff filepath1 filepath2
```
### plain
```bash
$ genfiff -f plain filepath1 filepath2
```

__Examples of formats.__

*stylish and plain*

[![asciicast](https://asciinema.org/a/KDWMIglTTOXFVclQlZMFSLeRP.svg)](https://asciinema.org/a/KDWMIglTTOXFVclQlZMFSLeRP)
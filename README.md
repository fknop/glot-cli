# glot-cli

`glot-cli` is a CLI tool for [https://glot.io](https://glot.io). 

## Install

```
$ [sudo] npm install -g glot-cli
```

## Options

Only one option is available for now:

### `snippet`

```
$ glot snippet [files] [--title] [--language]
```

The title by default will be `Uploaded by CLI`.
The language, if not specified, will be determined from the first file passed in arguments (for now at least).

Once the snippet has been uploaded to [https://glot.io](https://glot.io), it will copy the url to the clipboard.

For now it only supports a list of files, wildcard will be coming soon.
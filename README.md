# glot-cli

[![NPM Version](https://img.shields.io/npm/v/glot-cli.svg)](https://npmjs.org/package/glot-cli)


`glot-cli` is a CLI tool for [https://glot.io](https://glot.io). 

## Install

```
$ [sudo] npm install -g glot-cli
```

## Files

`glot-cli` uses two files. These files can be found in the home folder under the `.glot` folder.

* `.glotrc`: JSON configuration file.
* `.glothistory`: JSON history file.

**If you modify these files yourself and made a JSON error, the file will be reset by the next command.**

## Commands

Only one option is available for now:

### `snippet`

Creates a snippet with the files specified in arguments.

```
$ glot snippet [files...] 
```

#### Options

* `--title` (`-t`) - Sets the title of the snippet
* `--language` (`-l`) - Sets the language of the snippet
* `--private` (`-p`) - **Not yet supported**
* `--token` (`-T`) - **Not yet supported**

The title by default will be `Uploaded by CLI`.
The language, if not specified, will be determined from the first file passed in arguments (for now at least).

Once the snippet has been uploaded to [https://glot.io](https://glot.io), it will copy the url to the clipboard.

For now it only supports a list of files. **Terminals without wildcard support will not be able to use wildcards**

### `history`

Shows the history of snippet links.

```
$ glot history [number]
```

#### Options

Without the `number` argument, the command will show the ten last links. 

* `number`: Shows the last `<number>` links created.
* `--copy` (`-c`): Copies to the clipboard the `<number>` link (starts from the end of history)`
* `--position` (`-p`): To use with `--copy`. `number` will start from the beginning of history instead of the end.


#### Subcommand

* `reset`: Clears the history.
``` 
$ glot history reset
```


### `config`

Update the configuration.

#### Subcommand

**NOT YET SUPPORTED**

* `token`: Saves the API token for private usage. 
```
$ glot config token <token>
```


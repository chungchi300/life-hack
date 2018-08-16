# Goal

**An hackable script for my daily task**

- Mail(annual leave,sick leave,code share,deployment notification) - Interactive Cli

```
Mailing
lfMail  --recipient Jeff --to chungchi300@hotmail.com --body reason=testing,speedUp=20x
```

# Requirement

Node that support async await(>7.6)

# Installation

```
//1. git fork this repo
//2. clone it
npm install life-hack -g
```

# Hacking

## Development,Updating command implementation

Just upgrade the script,it will `automatically` upgrade system command implementation

## Publish to global,updating commands interface

1. Change your `package.json` - `bin` field
2. `npm install life-hack` again,which create symlink

# Advantage

- write by nodejs,using `async await for async task` and `more readable`
- Sharable by version control
- Easy to hack,it is written by **commander** and **inquirer**,formatted by `chalk`
- Support mail to Microsoft Mail Server

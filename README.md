# BF extension

A simple language server based VSCode Extension for the (Branflakes?) (BrainFuck?) BF language. You can also execute your code and see its output.

![BF](./assets/screenshot.png)

## Functionality

- Syntax Highlighting
- Execution
- Autocomplete suggestions


### Execution

Use the command to execute the code. 
Issue is, because BF is a **turing complete** language, there is no way to know if the program will terminate or not. Hence for now, the command may lead to infinite execution.
If the program requires input, it will be requested as a prompt.

TODO: Implement a timeout.

### Changelog

#### 0.2.1

- Change category
- Small bugfix for brackets validation

#### 0.2.0

- Cycle input pointer on overflow/underflow
- Refactoring code

#### 0.1.0

- Request input as required during execution
- Using array-based indexing. This implies that only positive indices upto 30k are supported.


### Building it

1. `npm i` - Install all dependencies
2. `npm i -g @vscode/vsce` - Install VSCode Command line CLI
3. `vsce package` - Package to VSIX
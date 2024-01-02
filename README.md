# BF extension

A simple language server based VSCode Extension for the ~~Branflakes~~ BF language. You can also execute your code and see its output.

![BF](https://kekvrose.me/static/projects/screenshots/bf-server.png)
## Functionality

- [X] Syntax
- [X] Bracket matching
- [X] Autocomplete suggestions
- [X] Extension icon
- [X] Execution
  - [ ] Timeout




### Execution

Use the command to execute the code. 
Issue is, because BF is a *turing complete* language, there is no way to know if the program will terminate or not. Hence for now, the command may lead to infinite execution. 
If the program requires input, it will be requested as a prompt.

TODO: Implement a timeout.

### Changelog

#### 0.5.0

- Request input as required during execution
- Using array-based indexing. This implies that only positive indices upto 30k are supported.
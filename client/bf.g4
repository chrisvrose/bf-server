grammar bf;

program
    : statements EOF;

statements
    : eligibleStmt*;

eligibleStmt
    : stmt
    | numberedStmt
    ;

numberedStmt
    : stmt NUMBER
    ;

stmt
    : basicStmt
    | loopStmt
    ;


loopStmt
    : LOOPSTART statements LOOPEND 
    ;

basicStmt 
    : INC # ptrIncr
    | DEC # ptrDecr
    | LEFT # ptrLeft
    | RIGHT # ptrRight
    | INPUT # inputStmt
    | OUTPUT # outputStmt
    ;


LOOPSTART: '[';
LOOPEND:']';
NUMBER: [0-9]+;
INPUT: ',';
OUTPUT: '.';
DEC: '-';
INC: '+';
LEFT: '<';
RIGHT: '>';
EVERYTHING_ELSE: . ->channel(HIDDEN);
WS: [ \r\n] -> skip;


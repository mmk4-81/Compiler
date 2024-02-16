export enum NonTerminal {
  PROG = 'prog',
  ID = 'id',
  ALFA_NUM = 'alphaNum',
  DEC_LIST = 'dec_list',
  DEC = 'dec',
  MORE_DEC = 'moreDec',
  TYPE = 'type',
  STAT_LIST = 'stat_list',
  MORE_STAT = 'moreStat',
  STAT = 'stat',
  WRITE = 'write',
  ASSIGN = 'assign',
  EXPR = 'expr',
  EXPR_PRIME = 'exprPrime',
  TERM = 'term',
  TERM_PRIME = 'termPrime',
  FACTOR = 'factor',
  NUMBER = 'number',
  MORE_DIGITS = 'moreDigits',
  SIGN = 'sign',
  DIGIT = 'digit',
  LETTER = 'letter'
}

export enum Terminal {
  PROGRAM = 'program',
  VAR = 'var',
  BEGIN = 'begin',
  END = 'end',
  INTEGER = 'integer',
  SHOW = 'show',
  SEMICOLON = ';',
  COLON = ':',
  COMMA = ',',
  LEFT_PAREN = '(',
  RIGHT_PAREN = ')',
  EQUALS = '=',
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  ZERO = '0',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
  E = 'e'
}

export type ProductionRule = (Terminal | NonTerminal)[][];

export const grammer: { [key in NonTerminal]: ProductionRule } = {
  [NonTerminal.PROG]: [
    [Terminal.PROGRAM, NonTerminal.ID, Terminal.SEMICOLON, Terminal.VAR, NonTerminal.DEC_LIST, Terminal.BEGIN, NonTerminal.STAT_LIST, Terminal.END]
  ],
  [NonTerminal.ID]: [
    [NonTerminal.LETTER, NonTerminal.ALFA_NUM]
  ],
  [NonTerminal.ALFA_NUM]: [
    [NonTerminal.LETTER, NonTerminal.ALFA_NUM],
    [NonTerminal.DIGIT, NonTerminal.ALFA_NUM],
    []
  ],
  [NonTerminal.DEC_LIST]: [
    [NonTerminal.DEC, Terminal.COLON, NonTerminal.TYPE, Terminal.SEMICOLON]
  ],
  [NonTerminal.DEC]: [
    [NonTerminal.ID, NonTerminal.MORE_DEC]
  ],
  [NonTerminal.MORE_DEC]: [
    [NonTerminal.DEC],
    []
  ],
  [NonTerminal.TYPE]: [
    [Terminal.INTEGER]
  ],
  [NonTerminal.STAT_LIST]: [
    [NonTerminal.STAT, NonTerminal.MORE_STAT]
  ],
  [NonTerminal.STAT]: [
    [NonTerminal.ASSIGN],
    [NonTerminal.WRITE],
  ],
  [NonTerminal.MORE_STAT]: [
    [NonTerminal.STAT_LIST],
    []
  ],
  [NonTerminal.WRITE]: [
    [Terminal.SHOW, Terminal.LEFT_PAREN, NonTerminal.ID, Terminal.RIGHT_PAREN, Terminal.SEMICOLON]
  ],
  [NonTerminal.ASSIGN]: [
    [NonTerminal.ID, Terminal.EQUALS, NonTerminal.EXPR, Terminal.SEMICOLON]
  ],
  [NonTerminal.EXPR]: [
    [NonTerminal.TERM, NonTerminal.EXPR_PRIME],
  ],
  [NonTerminal.EXPR_PRIME]: [
    [Terminal.PLUS, NonTerminal.TERM, NonTerminal.EXPR_PRIME],
    [Terminal.MINUS, NonTerminal.TERM, NonTerminal.EXPR_PRIME],
    []
  ],
  [NonTerminal.TERM]: [
    [NonTerminal.FACTOR, NonTerminal.TERM_PRIME]
  ],
  [NonTerminal.TERM_PRIME]: [
    [Terminal.MULTIPLY, NonTerminal.FACTOR, NonTerminal.TERM_PRIME],
    [Terminal.DIVIDE, NonTerminal.FACTOR, NonTerminal.TERM_PRIME],
    []
  ],
  [NonTerminal.FACTOR]: [
    [NonTerminal.ID],
    [NonTerminal.NUMBER],
    [Terminal.LEFT_PAREN, NonTerminal.EXPR, Terminal.RIGHT_PAREN]
  ],
  [NonTerminal.NUMBER]: [
    [NonTerminal.DIGIT, NonTerminal.MORE_DIGITS],
    [NonTerminal.SIGN, NonTerminal.DIGIT, NonTerminal.MORE_DIGITS],
  ],
  [NonTerminal.MORE_DIGITS]: [
    [NonTerminal.DIGIT, NonTerminal.MORE_DIGITS],
    []
  ],
  [NonTerminal.SIGN]: [
    [Terminal.PLUS],
    [Terminal.MINUS],
    []
  ],
  [NonTerminal.DIGIT]: [
    [Terminal.ZERO], [Terminal.ONE], [Terminal.TWO], [Terminal.THREE], [Terminal.FOUR],
    [Terminal.FIVE], [Terminal.SIX], [Terminal.SEVEN], [Terminal.EIGHT], [Terminal.NINE]
  ],
  [NonTerminal.LETTER]: [
    [Terminal.A], [Terminal.B], [Terminal.C], [Terminal.D], [Terminal.E]
  ]
};

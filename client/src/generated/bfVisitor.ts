// Generated from bf.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { PtrIncrContext } from "./bfParser";
import { PtrDecrContext } from "./bfParser";
import { PtrLeftContext } from "./bfParser";
import { PtrRightContext } from "./bfParser";
import { InputStmtContext } from "./bfParser";
import { OutputStmtContext } from "./bfParser";
import { ProgramContext } from "./bfParser";
import { StatementsContext } from "./bfParser";
import { EligibleStmtContext } from "./bfParser";
import { NumberedStmtContext } from "./bfParser";
import { StmtContext } from "./bfParser";
import { LoopStmtContext } from "./bfParser";
import { BasicStmtContext } from "./bfParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `bfParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface bfVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `ptrIncr`
	 * labeled alternative in `bfParser.basicStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPtrIncr?: (ctx: PtrIncrContext) => Result;

	/**
	 * Visit a parse tree produced by the `ptrDecr`
	 * labeled alternative in `bfParser.basicStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPtrDecr?: (ctx: PtrDecrContext) => Result;

	/**
	 * Visit a parse tree produced by the `ptrLeft`
	 * labeled alternative in `bfParser.basicStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPtrLeft?: (ctx: PtrLeftContext) => Result;

	/**
	 * Visit a parse tree produced by the `ptrRight`
	 * labeled alternative in `bfParser.basicStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPtrRight?: (ctx: PtrRightContext) => Result;

	/**
	 * Visit a parse tree produced by the `inputStmt`
	 * labeled alternative in `bfParser.basicStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInputStmt?: (ctx: InputStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `outputStmt`
	 * labeled alternative in `bfParser.basicStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutputStmt?: (ctx: OutputStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `bfParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `bfParser.statements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatements?: (ctx: StatementsContext) => Result;

	/**
	 * Visit a parse tree produced by `bfParser.eligibleStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEligibleStmt?: (ctx: EligibleStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `bfParser.numberedStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberedStmt?: (ctx: NumberedStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `bfParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;

	/**
	 * Visit a parse tree produced by `bfParser.loopStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopStmt?: (ctx: LoopStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `bfParser.basicStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBasicStmt?: (ctx: BasicStmtContext) => Result;
}


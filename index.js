"use strict"

const codeFrame = require("babel-code-frame")
const parser = require("./parser")

module.exports = function parse(text, opts) {

    let parseFunction

    switch (opts.parser) {
        case "typescript-eslint-parser":
            parseFunction = parser.parseWithTypeScriptESLintParser
            break
        case "babylon-plugin-typescript":
            parseFunction = parser.parseWithBabylonPluginTypescript
            break
        default:
            throw new Error(`Please provide a valid parser: either "typescript-eslint-parser" or "babylon-plugin-typescript"`)
    }

    try {
        return parseFunction(text)
    } catch (error) {
        const loc = error.loc
        if (loc) {
            error.codeFrame = codeFrame(text, loc.line, loc.column + 1, {
                highlightCode: true
            })
            error.message += "\n" + error.codeFrame
        }
        throw error
    }

}
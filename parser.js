"use strict"

function createError(message, line, column) {
    // Construct an error similar to the ones thrown by Babylon.
    const error = new SyntaxError(message + " (" + line + ":" + column + ")")
    error.loc = {
        line,
        column
    }
    return error
}

function parseWithBabylonPluginTypescript(text) {
    const babylon = require("babylon")
    return babylon.parse(text, {
        sourceType: "script",
        ranges: true,
        plugins: [
            "typescript",
            "objectRestSpread",
            "estree"
        ]
    })
}

function parseWithTypeScriptESLintParser(text) {
    const parser = require("typescript-eslint-parser")
    try {
        return parser.parse(text, {
            loc: true,
            range: true,
            tokens: false,
            comment: false,
            ecmaFeatures: {
                jsx: true
            }
        })
    } catch (e) {
        throw createError(
            e.message,
            e.lineNumber,
            e.column
        )
    }
}

module.exports = {
    parseWithBabylonPluginTypescript,
    parseWithTypeScriptESLintParser
}

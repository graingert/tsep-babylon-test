"use strict"

const fs = require("fs")
const testUtils = require('./utils')
const parse = require("../")

const generateAST = (source, options) => testUtils.normalizeNodeTypes(parse(source, options))

/**
 * - Babylon wraps the "Program" node in an extra "File" node, normalize this for simplicity for now...
 * - Remove "start" and "end" values from Babylon nodes to reduce unimportant noise in diffs ("loc" data will still be in
 * each final AST and compared).
 */
const preprocessBabylonAST = (ast) => testUtils.omitDeep(ast.program, ['start', 'end'])

function run_spec(dirname) {

    const sourceFiles = fs.readdirSync(dirname)

    sourceFiles.forEach(filename => {

        if (!(filename.endsWith(".js") || filename.endsWith(".ts")) || filename === "jsfmt.spec.js") {
            return
        }

        const path = dirname + "/" + filename
        const source = fs.readFileSync(path, "utf8").replace(/\r\n/g, "\n")

        /**
         * Parse with typescript-eslint-parser
         */
        const typeScriptESLintParserAST = generateAST(source, {
            parser: 'typescript-eslint-parser'
        })

        /**
         * Parse the source with babylon typescript-plugin, and perform some extra formatting steps
         */
        const babylonTypeScriptPluginAST = preprocessBabylonAST(generateAST(source, {
            parser: 'babylon-plugin-typescript'
        }))

        /**
         * Assert the two ASTs match
         */
        test(`${path}`, () => {
            expect(babylonTypeScriptPluginAST).toEqual(typeScriptESLintParserAST)
        })

    })

}

global.run_spec = run_spec

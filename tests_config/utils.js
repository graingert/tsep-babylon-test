const omit = require('lodash.omit')
const isObject = require('lodash.isobject')

/**
 * By default, pretty-format (within Jest matchers) retains the names/types of nodes from the babylon AST,
 * quick and dirty way to avoid that is to JSON.stringify and then JSON.parser the
 * ASTs before comparing them with pretty-format
 */
const normalizeNodeTypes = (ast) => JSON.parse(JSON.stringify(ast))

const omitDeep = (obj, keysToOmit = []) => {
    for (const key in obj) {
        const val = obj[key]
        if (isObject(val)) {
            omitDeep(val, keysToOmit)
        } else if (Array.isArray(val)) {
            for (const i of val) {
                omitDeep(i, keysToOmit)
            }
        } else if (keysToOmit.includes(key)) {
            delete obj[key]
        }
    }
    return obj
}

module.exports = {
    normalizeNodeTypes,
    omitDeep
}
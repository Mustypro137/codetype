// Syntax colours: a small regex highlighter for each language.
// It does not change the code. It only says which type each character is:
// "comment", "string", "keyword", "number" or null (normal text).

// ===== Shared patterns =====

// These are regex texts (not RegExp objects), so we can join them together.
// Use only (?: ) groups inside, never ( ), because the numbered groups are ours.
const DOUBLE_QUOTED = '"(?:\\\\.|[^"\\\\\\n])*"';
const SINGLE_QUOTED = "'(?:\\\\.|[^'\\\\\\n])*'";
const LINE_COMMENT = "//.*";
const BLOCK_COMMENT = "/\\*[\\s\\S]*?\\*/";
const NUMBER = "\\b\\d+(?:\\.\\d+)?\\b";

// Turns ["if", "for"] into a pattern that finds only whole words.
function wordsPattern(words) {
    return "\\b(?:" + words.join("|") + ")\\b";
}

// ===== Rules for each language =====

// The order of TOKEN_TYPES matters: a comment wins over a string,
// a string wins over a keyword, and so on.
const TOKEN_TYPES = ["comment", "string", "keyword", "number"];

const HIGHLIGHT_RULES = {
    JavaScript: {
        comment: LINE_COMMENT + "|" + BLOCK_COMMENT,
        string: DOUBLE_QUOTED + "|" + SINGLE_QUOTED + "|`(?:\\\\.|[^`\\\\])*`",
        keyword: wordsPattern(["const", "let", "var", "function", "return", "if", "else",
            "for", "while", "of", "in", "new", "class", "extends", "this", "true", "false",
            "null", "undefined", "async", "await", "try", "catch", "throw", "typeof",
            "switch", "case", "break", "continue", "default", "import", "export"]),
        number: NUMBER
    },
    Python: {
        comment: "#.*",
        string: '(?:\\b[rbfRBF]{1,2})?(?:"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|' +
            DOUBLE_QUOTED + "|" + SINGLE_QUOTED + ")",
        keyword: wordsPattern(["def", "return", "if", "elif", "else", "for", "while", "in",
            "not", "and", "or", "is", "import", "from", "as", "class", "self", "True",
            "False", "None", "try", "except", "finally", "with", "lambda", "pass",
            "break", "continue", "yield", "raise", "global"]),
        number: NUMBER
    },
    HTML: {
        comment: "<!--[\\s\\S]*?-->",
        string: '"[^"]*"|\'[^\']*\'',
        keyword: "</?[a-zA-Z][\\w-]*|/?>", // tag names like <div and </div>
        number: null
    },
    CSS: {
        comment: BLOCK_COMMENT,
        string: DOUBLE_QUOTED + "|" + SINGLE_QUOTED,
        // @media and property names like "color" in "color: red;"
        keyword: "@[\\w-]+|[\\w-]+(?=\\s*:[^;{}]*;)",
        // 12px, 1.5rem, 50%, and colours like #f5b942
        number: "#[0-9a-fA-F]{3,8}\\b|\\b\\d+(?:\\.\\d+)?(?:px|rem|em|vh|vw|fr|deg|ms|s|%)?"
    },
    Java: {
        comment: LINE_COMMENT + "|" + BLOCK_COMMENT,
        string: DOUBLE_QUOTED + "|" + SINGLE_QUOTED,
        keyword: wordsPattern(["public", "private", "protected", "static", "final", "class",
            "interface", "extends", "implements", "new", "return", "if", "else", "for",
            "while", "do", "void", "int", "long", "double", "float", "boolean", "char",
            "String", "this", "true", "false", "null", "try", "catch", "throw", "throws",
            "switch", "case", "break", "continue", "default", "import", "package"]),
        number: NUMBER
    },
    C: {
        comment: LINE_COMMENT + "|" + BLOCK_COMMENT,
        string: DOUBLE_QUOTED + "|" + SINGLE_QUOTED,
        keyword: "#\\w+|" + wordsPattern(["int", "char", "float", "double", "long", "short",
            "unsigned", "void", "const", "static", "struct", "typedef", "enum", "return",
            "if", "else", "for", "while", "do", "switch", "case", "break", "continue",
            "default", "sizeof", "NULL"]),
        number: NUMBER
    },
    PHP: {
        comment: LINE_COMMENT + "|#.*|" + BLOCK_COMMENT,
        string: DOUBLE_QUOTED + "|" + SINGLE_QUOTED,
        keyword: "<\\?php|\\?>|" + wordsPattern(["function", "return", "if", "else",
            "elseif", "foreach", "for", "while", "as", "echo", "print", "class", "new",
            "public", "private", "protected", "static", "true", "false", "null", "array",
            "isset", "empty", "require", "include"]),
        number: NUMBER
    }
};

// ===== Finding the tokens =====

// Joins the rules of one language into one big RegExp:
// group 1 = comment, group 2 = string, group 3 = keyword, group 4 = number.
// A rule with no pattern gets "(?!)", which never matches.
function buildHighlightPattern(rules) {
    const groups = TOKEN_TYPES.map((type) => "(" + (rules[type] || "(?!)") + ")");
    return new RegExp(groups.join("|"), "g");
}

// Returns a list with one type (or null) for each character of the code.
// For an unknown language (for example custom code) every type is null.
function getTokenTypes(code, language) {
    const types = new Array(code.length).fill(null);
    const rules = HIGHLIGHT_RULES[language];
    if (!rules) {
        return types;
    }

    for (const match of code.matchAll(buildHighlightPattern(rules))) {
        const groupIndex = match.findIndex((text, i) => i > 0 && text !== undefined);
        const type = TOKEN_TYPES[groupIndex - 1];

        for (let i = match.index; i < match.index + match[0].length; i++) {
            types[i] = type;
        }
    }
    return types;
}

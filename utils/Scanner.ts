/**
 * 
 * @param {type} input The string input to be split
 * @param {type} includeTokensInOutput If true, the tokens are retained in the splitted output.
 * @param {type} tokens The tokens to be employed in splitting the original string.
 * @returns {Scanner}
 */
export class Scanner {
    input: string;
    includeTokensInOutput: boolean;
    tokens: string[];

    constructor(input: string, includeTokensInOutput: boolean, tokens: string[]) {
        this.input = input;
        this.includeTokensInOutput = includeTokensInOutput;
        this.tokens = tokens;
    }

    scan() {
        var inp = this.input;

        var parse = [];
        this.tokens.sort(function (a, b) {
            return b.length - a.length; //ASC, For Descending order use: b - a
        });
        for (var i = 0; i < inp.length; i++) {


            for (var j = 0; j < this.tokens.length; j++) {

                var token = this.tokens[j];
                var len = token.length;
                if (len > 0 && i + len <= inp.length) {
                    var portion = inp.substring(i, i + len);
                    if (portion === token) {
                        if (i !== 0) {//avoid empty spaces
                            parse[parse.length] = inp.substring(0, i);
                        }
                        if (this.includeTokensInOutput) {
                            parse[parse.length] = token;
                        }
                        inp = inp.substring(i + len);
                        i = -1;
                        break;
                    }

                }

            }

        }
        if (inp.length > 0) {
            parse[parse.length] = inp;
        }

        return parse;
    }
}
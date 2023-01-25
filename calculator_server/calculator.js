"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = void 0;
function calculator(tab) {
    try {
        if (tab.length == 1) {
            return {
                code: isNaN(tab[0]) ? 500 : tab[0] == Infinity || tab[0] == -Infinity ? 500 : 200,
                result: isNaN(tab[0]) ? "Expression not valid" : tab[0] == Infinity || tab[0] == -Infinity ? "Expression not valid" : tab[0]
            };
        }
        else {
            var operators = {
                "*": function (first, second) { return first * second; },
                "+": function (first, second) { return first + second; },
                "-": function (first, second) { return first - second; },
                "/": function (first, second) { return first / second; }
            };
            var decoded_tab = [];
            for (var _i = 0, tab_1 = tab; _i < tab_1.length; _i++) {
                var elt = tab_1[_i];
                if (isNaN(elt)) {
                    if (elt === "*" || elt === "/") {
                        decoded_tab.push("F");
                    }
                    else {
                        decoded_tab.push("L");
                    }
                }
                else {
                    decoded_tab.push(elt);
                }
            }
            var first = decoded_tab.indexOf("F");
            if (first == -1) {
                first = decoded_tab.indexOf("L");
            }
            var generated_tab = [];
            generated_tab = tab.slice(0, first - 1);
            var first_number = parseFloat(decoded_tab[first - 1]);
            var second_number = parseFloat(decoded_tab[first + 1]);
            generated_tab.push(operators[tab[first]](first_number, second_number));
            generated_tab = generated_tab.concat(tab.slice(first + 2, tab.length));
            return calculator(generated_tab);
        }
    }
    catch (error) {
        throw new Error("Expression not valid");
    }
}
exports.calculator = calculator;

function calculator(tab) {
    try {
        if (tab.length == 1) {
            return { 
                code: isNaN(tab[0]) ? 500 : tab[0]== Infinity || tab[0]== -Infinity ? 500 : 200,
                result: isNaN(tab[0]) ? "Expression not valid" : tab[0]== Infinity || tab[0]== -Infinity ? "Expression not valid" : tab[0]
            }

        } else {
            let operators = {
                first: "0",
                second: "0",
                "*": function () {
                    return parseFloat(this.first) * parseFloat(this.second);
                },
                "+": function () {
                    return parseFloat(this.first) + parseFloat(this.second);
                },
                "-": function () {
                    return parseFloat(this.first) - parseFloat(this.second);
                },
                "/": function () {
                    return parseFloat(this.first) / parseFloat(this.second);
                }
            };

            let decoded_tab = [] 
            for (let elt of tab) {
                if (isNaN(elt)) {
                    if (elt === "*" || elt === "/") {
                        decoded_tab.push("F")
                    } else {
                        decoded_tab.push("L")
                    }
                } else {
                    decoded_tab.push(elt)
                }
            }

            let first = decoded_tab.indexOf("F")
            if (first == -1) {
                first = decoded_tab.indexOf("L")
            }
            let generated_tab = []

            generated_tab = tab.slice(0, first - 1)
            operators.first = decoded_tab[first - 1]
            operators.second = decoded_tab[first + 1]
            generated_tab.push(operators[tab[first]]())
            generated_tab = generated_tab.concat(tab.slice(first + 2, tab.length))

            return calculator(generated_tab)
        }
    } catch (error) {
        throw new Error("Expression not valid")
    }
}

module.exports = calculator;
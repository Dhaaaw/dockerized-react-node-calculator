export function calculator(tab: any):any {
    try {
        if (tab.length == 1) {
            return { 
                code: isNaN(tab[0]) ? 500 : tab[0]== Infinity || tab[0]== -Infinity ? 500 : 200,
                result: isNaN(tab[0]) ? "Expression not valid" : tab[0]== Infinity || tab[0]== -Infinity ? "Expression not valid" : tab[0]
            }

        } else {
            let operators: {[key: string]: (first: number, second: number) => number} = {
                "*": (first: number, second: number) => first * second,
                "+": (first: number, second: number) => first + second,
                "-": (first: number, second: number) => first - second,
                "/": (first: number, second: number) => first / second
            };

            let decoded_tab: string[] = [] 
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
            let first_number = parseFloat(decoded_tab[first - 1])
            let second_number = parseFloat(decoded_tab[first + 1])
            generated_tab.push(operators[tab[first]](first_number, second_number))
            generated_tab = generated_tab.concat(tab.slice(first + 2, tab.length))

            return calculator(generated_tab)
        }
    } catch (error) {
        throw new Error("Expression not valid")
    }
}

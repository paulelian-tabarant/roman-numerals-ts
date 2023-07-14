module RomanNumeralsConverter {
    const I = 1
    const III = 3
    const V = 5
    const X = 10
    const L = 50

    const romans = new Map([
        [I, 'I'],
        [V, 'V'],
        [X, 'X'],
        [L, 'L'],
    ])

    class Symbol {
        decimalValue: number
        countFunction: (decimalNumber: number) => number

        constructor(decimalValue: number, countFunction: (decimalNumber: number) => number) {
            this.decimalValue = decimalValue
            this.countFunction = countFunction
        }
    }


    export function toRoman(decimalNumber: number): string {
        let roman = ''

        const numberOfI = getNumberOfI(decimalNumber)
        roman = prependSymbols(I, numberOfI, roman)


        const symbols: Array<Symbol> = [
            new Symbol(V, getNumberOfV),
            new Symbol(X, getNumberOfX),
            new Symbol(L, getNumberOfL)
        ]

        symbols.forEach((symbol) => {
            const romanPartOfSymbol = getRomanPartWithSymbol(symbol, decimalNumber)

            roman = prependChar(romanPartOfSymbol, roman)
        })

        return roman
    }

    function getRomanPartWithSymbol(symbol: Symbol, decimalNumber: number) {
        let romanPartWithSymbol = ''
        if (shouldBePrefixed(decimalNumber, symbol.decimalValue)) {
            romanPartWithSymbol = prependSymbol(symbol.decimalValue, romanPartWithSymbol)
            romanPartWithSymbol = prependSymbol(I, romanPartWithSymbol)
        }

        const symbolCount = symbol.countFunction(decimalNumber)
        romanPartWithSymbol = prependSymbols(symbol.decimalValue, symbolCount, romanPartWithSymbol)

        return romanPartWithSymbol
    }

    function shouldBePrefixed(decimalNumber: number, numeralValue: number) {
        return decimalNumber % X === numeralValue - I
    }

    function toRomanSymbol(decimal: number): string {
        const numeral = romans.get(decimal)

        if (numeral === undefined) return ''

        return numeral
    }

    function prependSymbol(symbolDecimalValue: number, roman: string) {
        const romanSymbol = toRomanSymbol(symbolDecimalValue)

        return prependChar(romanSymbol, roman)
    }

    function prependSymbols(symbolDecimalValue: number, times: number, roman: string) {
        for (let n = 0; n < times; n++) {
            roman = prependSymbol(symbolDecimalValue, roman)
        }

        return roman
    }

    function prependChar(char: string, input: string) {
        return `${char}${input}`
    }

    function getNumberOfI(decimal: number) {
        const remainingAfterV = decimal % V

        if (remainingAfterV <= III) return remainingAfterV

        return 0
    }

    function getNumberOfV(decimal: number): number {
        const remainingAfterX = decimal % X

        return remainingAfterX >= V && remainingAfterX < X - I ? 1 : 0
    }

    function getNumberOfX(decimal: number): number {
        let valueOfSymbolsAfterX = decimal - getNumberOfL(decimal) * L 

        return integerDivide(valueOfSymbolsAfterX, X)
    }

    function getNumberOfL(decimalNumber: number) {
        return decimalNumber >= L ? 1 : 0
    }

    function integerDivide(decimal: number, divider: number) {
        return Math.floor(decimal / divider)
    }
}

export default RomanNumeralsConverter.toRoman
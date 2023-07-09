const I = 1
const III = 3
const V = 5
const X = 10

module RomanNumeralsConverter {
    const romans = new Map([
        [I, 'I'],
        [V, 'V'],
        [X, 'X'],
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
            new Symbol(X, getNumberOfX)
        ]

        symbols.forEach((symbol) => {
            const romanPartOfSymbol = getRomanPartForSymbol(symbol, decimalNumber)

            roman = prependChar(romanPartOfSymbol, roman)
        })

        return roman
    }

    function getRomanPartForSymbol(symbol: Symbol, decimalNumber: number) {
        let romanPartOfSymbol = ''
        if (shouldBePrefixed(decimalNumber, symbol.decimalValue)) {
            romanPartOfSymbol = prependSymbol(symbol.decimalValue, romanPartOfSymbol)
            romanPartOfSymbol = prependSymbol(I, romanPartOfSymbol)
        }

        const symbolCount = symbol.countFunction(decimalNumber)
        romanPartOfSymbol = prependSymbols(symbol.decimalValue, symbolCount, romanPartOfSymbol)

        return romanPartOfSymbol
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

        return remainingAfterX >= V && remainingAfterX < X - 1 ? 1 : 0
    }

    function getNumberOfX(decimal: number): number {
        return integerDivide(decimal, X)
    }

    function integerDivide(decimal: number, divider: number) {
        return Math.floor(decimal / divider)
    }
}

export default RomanNumeralsConverter.toRoman
class RomanNumeralsConverter {
    I = 1
    III = 3
    V = 5
    X = 10

    romans = new Map([
        [this.I, 'I'],
        [this.V, 'V'],
        [this.X, 'X'],
    ])

    public toRoman(decimalNumber: number): string {
        let roman = ''

        // TODO: remove redundance below
        const numberOfI = this.getNumberOfI(decimalNumber)
        const symbolForI = this.toRomanSymbol(this.I)
        roman = this.prependNumeral(symbolForI, numberOfI, roman)

        const numberOfV = this.getNumberOfV(decimalNumber)
        const symbolForV = this.toRomanSymbol(this.V)
        roman = this.prependNumeral(symbolForV, numberOfV, roman)

        const numberOfX = this.getNumberOfX(decimalNumber)
        const symbolForX = this.toRomanSymbol(this.X)
        roman = this.prependNumeral(symbolForX, numberOfX, roman)

        return roman
    }

    private toRomanSymbol(decimal: number): string {
        const numeral = this.romans.get(decimal)

        if (numeral === undefined) return ''

        return numeral
    }

    private prependNumeral(numeral: string, times: number, roman: string) {
        for (let n = 0; n < times; n++) {
            roman = this.prependChar(numeral, roman)
        }

        return roman
    }

    private prependChar(char: string, input: string) {
        return `${char}${input}`
    }

    private getNumberOfI(decimal: number) {
        const remainingAfterV = decimal % this.V

        if (remainingAfterV <= this.III) return remainingAfterV

        return 0
    }

    private getNumberOfV(decimal: number) {
        const remaningAfterX = decimal % this.X

        return remaningAfterX >= this.V ? 1 : 0
    }

    private getNumberOfX(decimal: number) {
        return this.integerDivide(decimal, this.X)
    }

    private integerDivide(decimal: number, divider: number) {
        return Math.floor(decimal / divider)
    }
}

export default RomanNumeralsConverter
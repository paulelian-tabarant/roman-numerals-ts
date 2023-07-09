import RomanNumeralsConverter from "../src/roman-numerals-converter"

let converter = new RomanNumeralsConverter()

class TestCase {
    decimal: number
    roman: string

    constructor(decimal: number, roman: string) {
        this.decimal = decimal
        this.roman = roman
    }
}

const toTestCase = (decimal: number, roman: string): TestCase => {
    return new TestCase(decimal, roman)
}

describe('roman numerals converter', () => {

    it('should return an empty string', () => {
        expect(converter.toRoman(0)).toBe('')
    })

    it('should append I, II or III when appropriate', () => {
        let testCases: Array<TestCase> = [
            toTestCase(1, 'I'),
            toTestCase(2, 'II'),
            toTestCase(3, 'III'),
        ]

        testCases.forEach(testCase => {
            expect(converter.toRoman(testCase.decimal)).toBe(testCase.roman)
        })
    })

    it('should return X, XV, XX, XXV, XXX, XXXV when appropriate', () => {
        let testCases: Array<TestCase> = [
            toTestCase(10, 'X'),
            toTestCase(15, 'XV'),
            toTestCase(20, 'XX'),
            toTestCase(25, 'XXV'),
            toTestCase(30, 'XXX'),
            toTestCase(35, 'XXXV'),
        ]

        testCases.forEach(testCase => {
            expect(converter.toRoman(testCase.decimal)).toBe(testCase.roman)
        })
    })

    it('should combine I, II, III with prefixes when necessary', () => {
        let testCases: Array<TestCase> = [
            toTestCase(6, 'VI'),
            toTestCase(7, 'VII'),
            toTestCase(8, 'VIII'),
            toTestCase(11, 'XI'),
            toTestCase(12, 'XII'),
            toTestCase(13, 'XIII'),
            toTestCase(16, 'XVI'),
            toTestCase(17, 'XVII'),
            toTestCase(18, 'XVIII'),
            toTestCase(32, 'XXXII'),
            toTestCase(27, 'XXVII'),
        ]

        testCases.forEach(testCase => {
            expect(converter.toRoman(testCase.decimal)).toBe(testCase.roman)
        })
    })
})
import toRoman from "../src/roman-numerals-converter"

class TestCase {
    decimal: number
    roman: string

    constructor(decimal: number, roman: string) {
        this.decimal = decimal
        this.roman = roman
    }
}

const assert = (decimal: number, roman: string): TestCase => {
    return new TestCase(decimal, roman)
}

describe('roman numerals converter', () => {

    it('should return an empty string', () => {
        // WHEN THEN
        expect(toRoman(0)).toBe('')
    })

    it('should append I, II or III when appropriate', () => {
        // GIVEN
        let testCases: Array<TestCase> = [
            assert(1, 'I'),
            assert(2, 'II'),
            assert(3, 'III'),
        ]

        testCases.forEach(testCase => {
            // WHEN
            const actualRoman = toRoman(testCase.decimal)

            // THEN
            expect(actualRoman).toBe(testCase.roman)
        })
    })

    it('should return X, XV, XX, XXV, XXX, XXXV when appropriate', () => {
        // GIVEN
        let testCases: Array<TestCase> = [
            assert(10, 'X'),
            assert(15, 'XV'),
            assert(20, 'XX'),
            assert(25, 'XXV'),
            assert(30, 'XXX'),
            assert(35, 'XXXV'),
        ]

        testCases.forEach(testCase => {
            // WHEN
            const actualRoman = toRoman(testCase.decimal)

            // THEN
            expect(actualRoman).toBe(testCase.roman)
        })
    })

    it('should combine I, II, III with prefixes when necessary', () => {
        // GIVEN
        let testCases: Array<TestCase> = [
            assert(6, 'VI'),
            assert(7, 'VII'),
            assert(8, 'VIII'),
            assert(11, 'XI'),
            assert(12, 'XII'),
            assert(13, 'XIII'),
            assert(16, 'XVI'),
            assert(17, 'XVII'),
            assert(18, 'XVIII'),
            assert(32, 'XXXII'),
            assert(27, 'XXVII'),
        ]

        testCases.forEach(testCase => {
            // WHEN
            const actualRoman = toRoman(testCase.decimal)

            // THEN
            expect(actualRoman).toBe(testCase.roman)
        })
    })

    it('should prefix with I when number ends with 4 or 9', () => {
        // GIVEN
        let testCases: Array<TestCase> = [
            assert(4, 'IV'),
            assert(9, 'IX'),
            assert(29, 'XXIX'),
            assert(34, 'XXXIV'),
        ]

        testCases.forEach(testCase => {
            // WHEN
            const actualRoman = toRoman(testCase.decimal)

            // THEN
            expect(actualRoman).toBe(testCase.roman)
        })
    })
})
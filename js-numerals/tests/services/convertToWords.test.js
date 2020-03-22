const convertToWords = require('../../services/convertToWords')

test('should return a type of string', () => {
    expect(typeof convertToWords(1234)).toBe("string")
})

test('should return a proper number conversions', () => {
    expect(convertToWords(7)).toBe('seven')
    expect(convertToWords(42)).toBe('forty-two')
    expect(convertToWords(2001)).toBe('two thousand, and one')
    expect(convertToWords(1999)).toBe('one thousand, nine hundred and ninety-nine')
    expect(convertToWords(17999)).toBe('seventeen thousand, nine hundred and ninety-nine')
})
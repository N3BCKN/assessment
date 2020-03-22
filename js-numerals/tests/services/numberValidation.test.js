const {  isNotValid  } = require('../services/numberValidation')

test('should return string values as true', () => {
    expect(isNotValid("Lorem Ipsum").isError).toBe(true)
    expect(isNotValid("Lorem Ipsum").errorMsg).toBe("Please provide a valid number.")
})

test('should return null values as true', () => {
    expect(isNotValid(null).isError).toBe(true)
    expect(isNotValid(null).errorMsg).toBe("Field cannot be empty.")
})

test('should return number exceeds stack as true', () => {
    expect(isNotValid("9999999999999").isError).toBe(true)
    expect(isNotValid("9999999999999").errorMsg).toBe("Number is too big. Try with smaller ones.")
})

test('should return proper number as false', () => {
    expect(isNotValid("7")).toBe(false)
    expect(isNotValid("42")).toBe(false)
    expect(isNotValid("2001")).toBe(false)
    expect(isNotValid("1999")).toBe(false)
    expect(isNotValid("17999")).toBe(false)
})
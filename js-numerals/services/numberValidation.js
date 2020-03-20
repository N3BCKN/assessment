module.exports.isNotValid = function(number) {
    const error = {
        errorMsg: "",
        isError: true
    }

    if (isNaN(number)) {
        error.errorMsg = "Please provide a valid number."
        return error
    } else if (number == null) {
        error.errorMsg = "Number cannot be empty."
        return error
    } else if (number.length > 12) {
        error.errorMsg = "Number is too big. Try with smaller once."
        return error
    }

    return false
}
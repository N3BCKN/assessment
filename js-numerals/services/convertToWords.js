const range = {
    "TEN"          : 10,
    "ONE_HUNDRED"  : 100,
    "ONE_THOUSAND" : 1000,
    "ONE_MILLION"  : 1000000,
    "ONE_BILLION"  : 1000000000,
    "ONE_TRILLION" : 1000000000000
}


const LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
]

const TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
]


function removeDecimals(number) {
    return Number.parseInt(number)
}

function createWords(number) {
    let turns, word,
        words = arguments[1]

    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '')
    }

    if (!words) {
        words = []
    }

    if (number < 0) {
        words.push('minus')
        number = Math.abs(number)
    }

    if (number < 20) {
        turns = 0
        word = LESS_THAN_TWENTY[number]

    } else if (number < range["ONE_HUNDRED"]) {
        turns = number % range["TEN"]
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / range["TEN"])]
        if (turns) {
            word += '-' + LESS_THAN_TWENTY[turns]
            turns = 0
        }

    } else if (number < range["ONE_THOUSAND"]) {
        turns = number % range["ONE_HUNDRED"]
        word = createWords(Math.floor(number / range["ONE_HUNDRED"])) + ' hundred'

    } else if (number < range["ONE_MILLION"]) {
        turns = number % range["ONE_THOUSAND"]
        word = createWords(Math.floor(number / range["ONE_THOUSAND"])) + ' thousand,'

    } else if (number < range["ONE_BILLION"]) {
        turns = number % range["ONE_MILLION"]
        word = createWords(Math.floor(number / range["ONE_MILLION"])) + ' million,'

    } else if (number < range["ONE_TRILLION"]) {
        turns = number % range["ONE_BILLION"]
        word = createWords(Math.floor(number / range["ONE_BILLION"])) + ' billion,'
    }

    words.push(word)
    return createWords(turns, words)
}

function appendConjuction(words, number) {

    if (number > 100 && !(number < 1000 && number % 100 == 0) && !(number % 1000 == 0)) {
        words = words.split(' ')
        if (number % 100 == 0) {
            words.splice(words.length - 2, 0, 'and')
        } else {
            words.splice(words.length - 1, 0, 'and')
        }
        return words.join(' ')
    }

    return words
}

module.exports = function(number) {

    // remove if decimals
    number = removeDecimals(number)

    // generate words
    let words = createWords(number)

    // add conjuction
    words = appendConjuction(words, number)

    return words
}
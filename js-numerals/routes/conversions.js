const express = require('express')
const router = express.Router()
const convertToWords = require('../services/convertToWords')
const {isNotValid}  = require('../services/numberValidation')


router.get('/', (req, res) => {
    res.render('index')
})

router.post('/convert', (req, res) => {
    const {number} = req.body
    const notValidatedNumber = isNotValid(number)
    let  words = ''

    if (notValidatedNumber) {
        return res
        .status(400).json({
            "response": notValidatedNumber.errorMsg
        })
    }

    words = convertToWords(number)
    res.json({
        "response": words
    })

})

module.exports = router
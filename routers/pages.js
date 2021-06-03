const express = require('express')
const config = require('../global-settings')
const contactSettings = require('../settings-contact-page')
const aboutSettings = require('../settings-about-page')
const ppSettings = require('../settings-privacyPolicy-page')
const termOfUseSettings = require('../setting-termOfUse-page')

const pages = express.Router()

//contact page
pages.get('/contact', (req, res) => {
    res.render('contact', {
        config,
        contactSettings
    })
})

//about page
pages.get('/about', (req, res) => {
    res.render('about', {
        config,
        aboutSettings

    })
})

//privacy-policy page
pages.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy', {
        config,
        ppSettings
    })
})

//term of use page
pages.get('/term-of-use', (req, res) => {
    res.render('term-of-use', {
        config,
        termOfUseSettings
    })
})

module.exports = pages
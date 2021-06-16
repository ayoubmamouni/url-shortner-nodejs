//Website settings
let websiteName = 'Shortner' //Website name
let currentYear = new Date().getFullYear()
let copyRightYear = 2021 //if you want to change copyRightYear every year automaticly just change 2021 value to currentYear example => let copyRightYear = currentYear
let shortURL_max = 20 //if a URL less than 20 we will return Error, if you want to return it Off just change allow_to_short_shorterURL to true, You can find this option below..
let config = {
    appName: websiteName,
    title: 'Short URL app',
    showNavbar: true, // turn off if you want to hide navigation bar
    showPublicLinks: true, // turn off if you want to hide public links
    maxLength_PublicLinks: 50, // maximum you want to desplay in public links
    RandomText_length: 5, //How many random latters you wand to generate for short URL
    user_can_Add_Adults_Link: false, //false = no, true = yes
    allows_user_to_create_URL: true, //false = no, true = yes 
    allow_to_short_shorterURL: false, //false = no, true = yes
    allow_to_short_shorterURL_Number_Length: shortURL_max,
    //message text
    Not_found_title: 'Link Not Found',
    Not_found_description: 'This Link doesn\'t exist on our database or may be has been deleted',
    when_user_add_unsupported_URL_message: 'OOPs! This URL is not supported! Try another one.',
    when_create_a_URL_is_disabled_message: "You can't create a URL, Admin disabled this feature at the moment, Try again later",
    user_full_URL_is_already_shorter_message: `OOPs! This is already short URL, URL should be greater than ${shortURL_max}`,
    link_created_successful_message: 'Short URL created successfully',
    recent_URL_Not_found_message: 'Cannot find recent URL',
    link_updated_successful_message: 'Short URL updated successfully',
    when_user_post_text_not_URL: 'This field should be a URL!',
    when_user_post_nothing_message: 'input field is required, Please Enter Full URL!',
    links_Not_Supported: [
        //Type just name of the website, make sure all urls are lowercase
        //Google as example
        "http://www.google.com",
        "https://www.google.com",
        "http://google.com",
        "https://google.com",
        //another website
        "http://www.example.com",
        "https://www.example.com",
        "http://example.com",
        "https://example.com",
        //another website
        "http://www.xxx.com",
        "https://www.xxx.com",
        "http://xxx.com",
        "https://xxx.com",
        //another website
        "http://www.xvid.com",
        "https://www.xvid.com",
        "http://xvid.com",
        "https://xvid.com",
        //another website
        "http://www.adults.com",
        "https://www.adults.com",
        "http://adults.com",
        "https://adults.com",
        //Also you can add words
        //example.
        "badword",
        "example",
        "shit"
    ],
    showAds: true, // change it to false if you want to hide ads from website.
    showAd1: true, //Ad banner in top
    showAd2: true, //Ad banner in middle
    showAd3: true, //Ad banner in bottom
    websitePages: [{
            linkName: 'Home',
            linkURL: '/',
        },
        //End docs page
        {
            linkName: 'Contact',
            linkURL: '/pages/contact',
        },
        {
            linkName: 'About',
            linkURL: '/pages/about',
        },
        {
            linkName: 'Privacy Policy',
            linkURL: '/pages/privacy-policy',
        },
        {
            linkName: 'Term of Use',
            linkURL: '/pages/term-of-use',
        },
    ],
    //whill shown on navigation bar as exernal links
    externalLinks: [{
            linkName: 'ExternalLink1',
            linkURL: 'https://example.com',
        },
        {
            linkName: 'ExternalLink2',
            linkURL: 'https://example.com',
        },
    ],
    show_mainTitle: true,
    mainTitle: `<h1>Free URL shortner </h1>`,
    show_description: true,
    description: 'Short any URL at anytime without login',
    //basic SEO
    metaDescription: 'Short any full URL at anytime without login', //For search engine.. Add you custom description
    //#TODO
    //Error Page Title
    errorTitle: `Page not Found (404) - ${websiteName}`,
    footerText: `<span id="site">${websiteName}</span> Coded with ❤ by Ayoub-Mamouni (v1.0.0)<br/> Copyright © All rights reserved ${copyRightYear}`
}

module.exports = config;
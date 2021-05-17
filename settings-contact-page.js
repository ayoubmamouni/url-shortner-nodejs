const Contact = {
    title: 'Contact Page',
    description: 'You can contact us anytime you want, We will contact you soon as posible.',

    //Email
    ShowEmail_section: true,
    Email_title:'Emails',
    Emails:[
        //____item start____
        {
            thisEmailFor: 'Contact our team on this Email',
            Email: 'contact@example.com',
        },
        //____item end_____
        {
            thisEmailFor: 'Personal Email',
            Email: 'me@example.com',
        },
        {
            thisEmailFor: 'Support Email',
            Email: 'support@example.com',
        },
        //...
    ],
    
    //Phone Numbers
    ShowPhoneNumbers_section: true,
    PhoneNumbers_title:'Phone Numbers',
    Numbers: [
        {
            thisNumberFor: 'For Support',
            NumberPhone: '+1 223 443 434'
        },
        {
            thisNumberFor: 'For Advetisment',
            NumberPhone: '+1 223 xxx 988'
        },
        {
            thisNumberFor: 'Whatsapp Number',
            NumberPhone: '+1 223 222 988'
        },
    ],

    //Address
    ShowAddress_section: true,
    Address_title: 'Address',
    Address:[
        {
            addressName: 'Address 1',
            address: '243 Main Street, Suite 330',
        },
        {
            addressName: 'Address 2',
            address: '999 Main Street, example 5000',
        }
    ],

    //Websites
    ShowWebSites_section: true,
    Website_title: 'Websites',
    websites: [
        {
            websiteName: 'Google',
            website:'http://google.com',
        },
        {
            websiteName: 'Facebook',
            website:'http://Facebook.com',
        },
        {
            websiteName: 'Twitter',
            website:'http://twitter.com',
        },
    ]
}

module.exports = Contact
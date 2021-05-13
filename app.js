const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const str = require('@supercharge/strings')

//require shortSchema
const ShortURL = require('./model/shortSchema')

const app = express()

//in development mode, We dont need those (dotenv & morgan) in production mode!
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    const logger = require('morgan')
    app.use(logger('dev'))
}

//connected to mongodb using mongoose
mongoose.connect(process.env.URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() =>  console.log('Successfully connected to MongoDb'))
    .catch(err => console.error(err))

//setup view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//setup public folder
app.use(express.static(path.join(__dirname, 'public')))

//use body parser - To read informations from clinet
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/',  async (req, res) => {
    const urls = await ShortURL.find({
        showInPublicLinks : true,
    }).sort({ postedOn: -1})
    res.render('home', {data : urls})
})

app.post('/', async (req, res) => {

    //A user can change type of url to text with inspect elements in browser, So we will return Error..
    let findProtocolInURL = await req.body.fullURL.match('http') || req.body.fullURL.match('HTTP')
    if(findProtocolInURL === null || findProtocolInURL.index !== 0){
        return res.json({
            msg: 'error',
            txt: 'This field should be a URL!',
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3100
        })
    }


    //  A user can send us nothing from url input, 
    //  We did the same in client side but user can change front-end code and he can send us nothing
    //  so this code wil return him an error message
    if(req.body.fullURL === '' || req.body.fullURL === undefined) {
        return res.json({
            msg: 'error',
            txt: 'input field is required, Please Enter Full URL!',
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000
        })
    }

    
    console.log(req.body.showInPublicLinks)
    //else..
    // You can change the value of random function as you want
    let randomTXT = str.random(5)
    
    const short_URL  = async (shortRandomTxt)=>{
        const data = {
            showInPublicLinks : req.body.showInPublicLinks,
            fullURL : req.body.fullURL,
            shortURL: shortRandomTxt
        }
        const newURL = await ShortURL.create(data)
        res.json({
            msg: 'Short URL created successfully',
            icon: 'success',
            btnTxt: 'copy to clipboard',
            showCancelButton: true,
            showConfirmButton: true,
            timer: 60*1000,
            id: newURL._id,
            fullURL: newURL.fullURL,
            short_URL : newURL.shortURL,
            views: newURL.views,
            time: newURL.postedOn.toLocaleDateString(),
        })
    }

    //check if there an existing url already in db
    const checkExistURL = await ShortURL.findOne({shortURL : randomTXT})
    //if true . thats mean no url already in db with that short txt
    if( checkExistURL === undefined || 
        checkExistURL === null || 
        checkExistURL === '') {
            short_URL(randomTXT)
        }
        // if else thats mean there is an exist shorturl in db, so lets generate new rndm txt
        else{
            newRandomTXT = str.random(5)
            short_URL(newRandomTXT)
        }
})

//get shortUrl 
app.get('/:id', async (req, res) => {
    const result = await ShortURL.findOne({shortURL: req.params.id})
    if(result == null) {
        return res.redirect('/')
    }
    //new view
    await result.views++;
    await result.save()
    res.redirect(result.fullURL)
})

//-----
app.get('/checkNewClicks/:id', async (req, res)=>{
    const result = await ShortURL.findOne({shortURL: req.params.id})
    if(result == null) {
        return res.redirect('/')
    }
    res.json(result)
})

//Get recent url
app.get('/getRecentURL/:id', async (req, res) => {
    const recentURL = await ShortURL.findById(req.params.id)
    if(recentURL == null) {
        return res.json({message: 'Cannot find recent URL'})
    }
    res.json({
        showInPublicLinks: recentURL.showInPublicLinks,
        fullURL: recentURL.fullURL,
        short_URL : recentURL.shortURL,
        views: recentURL.views,
        date: recentURL.postedOn.toLocaleDateString(),
    })
})

//Update user Link
app.put('/updateRecentURL/:id', async (req, res) => {
    let recentURL_id = req.params.id
    let userUpdate = req.body.showInPublicLinks
    const updateRecentURL = await ShortURL.findByIdAndUpdate(recentURL_id,{
        showInPublicLinks : userUpdate
    })
    if(updateRecentURL == null) {
        return res.redirect('/')
    }
    res.json({
        msg: 'Successfuly Link Updated'
    })
})

let port =  process.env.PORT || 3000
app.listen(port, () => console.log(`Server started at ${port}`))
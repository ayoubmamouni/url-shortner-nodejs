let form = document.querySelector('form')
let fullURL = document.querySelector('#fullURL')
let submitBtn = document.querySelector('#submit-button')
let shortUrlWebsite = document.querySelectorAll('.current-website')
let showLinksBtnToggle = document.querySelector('#show-public-links')
let urlsBox = document.querySelector('#urls-box')
let urlDiv = document.querySelector('#url')
let updatePublicPrivateLinkButton = document.querySelector('#updatePublicPrivateLink')
let recentLink = document.querySelector('#recent-link')
let submitButton = document.querySelector('#submit-button')
let ErrorMsg = document.querySelector('#msg-error');
let userUrls = document.querySelector('.user-urls')

let copy = document.querySelectorAll('.copy')

//Get website URL
let currentWebsite = `${window.location.protocol}//${window.location.host}`
shortUrlWebsite.forEach(site => site.innerText = currentWebsite+'/')


let recentUserLink = localStorage.getItem("recentUrlId")

//Copy short url to clipboard
//On click on copy button
copy.forEach(copyLink => {
    let SHORT_URL = copyLink.dataset.shortUrl
    copyLink.dataset.clipboardText = currentWebsite+'/'+SHORT_URL
    copyToClipboard(copyLink)
})


function copyToClipboard(btn){
    var clipboard = new ClipboardJS(btn)
    clipboard.on('success', e => {
        showToats('center', 'Successfuly Short URL copied', 'success', false, 1600, true, false)
        e.clearSelection()
    })
    clipboard.on('error', e =>  showToats('center', 'Cannot copy Link to clipboard', 'error', false, 1600, true, false))
}

function updateUserLink(updateLinkButton){
    let LinkPoblicPrivateValue = document.querySelector('#LinkPoblicPrivateValue')
    let updatePublicPrivateIcon = document.querySelector('#update-icon')
    updatePublicPrivateIcon.classList.add('rotateRefreshIcon')
    updateLinkButton.classList.add('disabledClick')
    setTimeout(() => {
        fetch(`/updateRecentURL/${recentUserLink}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                showInPublicLinks: LinkPoblicPrivateValue.value,
            })
            })
            .then((res) => res.json())
            .then((data) =>{
                updatePublicPrivateIcon.classList.remove('rotateRefreshIcon')
                updateLinkButton.classList.remove('disabledClick')
                swal.fire({
                    icon: 'success',
                    toast: true,
                    timer: 2100,
                    text: data.msg,
                    position: 'center',
                    showConfirmButton: false,
                }).then(()=>window.location.reload())
            }).catch((err) =>console.log(err))
    }, 1200)
}

//When a user click on refresh btn
function checkNewClicks(refreshButton){
    let refreshIcon = document.querySelector('#refresh-icon')
    let clicksCount = document.querySelector('#clicksCount')
    refreshIcon.classList.add('rotateRefreshIcon')
    refreshButton.classList.add('disabledClick')
    //Show refresh animation for 1,2s
    setTimeout(() => {
        fetch(`/getRecentURL/${recentUserLink}`, {
            method: 'GET'
            }).then((res) => res.json())
            .then((data) =>{
                clicksCount.innerText = data.views
                refreshIcon.classList.remove('rotateRefreshIcon')
                refreshButton.classList.remove('disabledClick')
            }).catch((err) =>console.log(err))
    }, 1200)
}

if(recentUserLink === undefined || recentUserLink === null){
    recentLink.innerHTML = `<div class="url-item"><h3 style="padding: 1.4rem 0; text-align: center; color: aqua;">No recent URL found </h3></div>`
 }else{
    fetch(`/getRecentURL/${recentUserLink}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {

        let checkPublicOrPrivate
        let OtherChoice
        let BooleanValue
        let AnotherBooleanValue
        if(data.showInPublicLinks){
            checkPublicOrPrivate = 'Public'
            OtherChoice = 'Private'
            BooleanValue = true
            AnotherBooleanValue = false
        }else{
            checkPublicOrPrivate = 'Private'
            OtherChoice = 'Public'
            BooleanValue = false
            AnotherBooleanValue = true
        }
        recentLink.innerHTML = `
            <div class="url-item">
                <h2 style="padding: .7rem .5rem;">Your recent link</h2>
                <div class="url fullUrl">
                    <label>Full URL</label>
                    <br>
                    <a href="${data.fullURL}">${data.fullURL}</a>
                </div>
                <hr>
                <div class="url shortUrl">
                    <label>Short URL</label>
                    <br>
                    <a href="/${data.short_URL}" target="_blank">${currentWebsite}/${data.short_URL}</a>
                    <br>
                    <br>
                    <button data-clipboard-text="${currentWebsite}/${data.short_URL}" class="copyRecentURL">Copy</button>
                </div>
                <hr>
                <div class="url ">
                    <div class="publicOrPrivate">
                        <div class="public-Privat">
                            <label>Your Link state</label>
                            <div id="updatePublicPrivateLink">
                                <select id="LinkPoblicPrivateValue">
                                    <option value="${BooleanValue}">${checkPublicOrPrivate}</option>
                                    <option value="${AnotherBooleanValue}">${OtherChoice}</option>
                                </select> 
                                <div id="updatePublicPrivateLink" onclick="updateUserLink(this)">Update 
                                    <div id="update-icon">
                                        <div class="animatioDivs">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="url views">
                    <div class="row-clicks">
                        <label>Clicks ⇾ </label>
                        <div id="clicksCount">${data.views}</div> 
                        <div id="refresh-clicks" onclick="checkNewClicks(this)">
                            Refresh 
                        <!-- <div id="refresh-icon">↻</div></div> -->
                        <div id="refresh-icon">
                            <div class="animatioDivs">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/>
                <!-- QRCode start-->
                <label id="qrcode-label">QRCode</label>
                <div id="qrcode"></div>
                <!-- QRCode End-->

                <div class="url time">
                    <code style="color:yellow; opacity: 0.5;">${data.date}</code>
                </div>
            </div>
        `
        new QRCode(document.getElementById("qrcode"), {
            text: `${currentWebsite}/${data.short_URL}`,
            width: 150,
            height: 150,
            colorDark : "#000",
            colorLight : "#fff",
            correctLevel : QRCode.CorrectLevel.H
        })
        let copyRecentURL = document.querySelector('.copyRecentURL')
        copyToClipboard(copyRecentURL)
    })
 }

form.addEventListener('submit', e => {
    e.preventDefault()
    submitButton.classList.add('disabledClick')
    submitBtn.value = 'Loading..'
    let fURL = fullURL.value
    if(fURL === '' || fURL === undefined) {
        //position, text, icon, showConfirmButton, timer
        return showToats('center', 'Pleas enter URL', 'error', false, 2000, false)
    }
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            showInPublicLinks: showInPublicLinks.value,
            fullURL : fURL
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.msg === 'error') {
            return showToats('center', data.txt, 'error', false, 2000, false)
        }
        else if(data.msg === 'error-url-not-supported'){
            //position, text, icon, showConfirmButton, timer, toast, reloadPage
            // fullURL.value = ''
            submitButton.classList.remove('disabledClick')
            submitBtn.value = 'Try again'
            setTimeout(() => {
                ErrorMsg.innerHTML = ''
            }, 2500)
            return ErrorMsg.innerHTML = `<p>${data.txt}</p>`
        }
        let ShortURL
        if( data.short_URL !== undefined) {
                ShortURL = `<a href="/${data.short_URL}">${currentWebsite}/${data.short_URL}</a>`
        }else{
            ShortURL = '<h2 style="color: red;"> No URL to show! </h2>'
        }
        showToats('center', data.msg, data.icon, false, data.timer, true, true)
        localStorage.setItem("recentUrlId", data.id)
        fullURL.value =''
    })
    .catch(() => showToats('center', 'Error to short a url, Try again Later', 'error', false, 3100, false))
})

//Show Public links button..
showLinksBtnToggle.addEventListener('click', e => {
    // urlsBox.classList.toggle('urls-box')
    e.target.classList.toggle('closeShowLinksBtn')
    if(e.target.innerText === 'Show public links'){
        e.target.innerText = 'Close public links'
    }else{
        e.target.innerText = 'Show public links'
    } 
})

//I used just these two lines of jquery because I don't know jquery yet. I know easy to learn it, I will lrean it later <3
$("#show-public-links").click(function(){
    $("#urls-box").slideToggle();
});

function showToats(position, text, icon, showConfirmButton, timer, toast, reloadPage) {
    Swal.fire({
        position: position,
        icon: icon,
        title: text,
        showConfirmButton: showConfirmButton,
        timer: timer,
        toast: toast,
    }).then(()=>{
        if(reloadPage){
            window.location.reload();
        }else{return}
    })
}

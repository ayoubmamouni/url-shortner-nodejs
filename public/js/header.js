let navToggle = document.querySelector('#nav-toggle')
let overlay = document.querySelector('.overlay')

//________________________________________________________________
let line1 = document.querySelector('#line1')
let line2 = document.querySelector('#line2')
let line3 = document.querySelector('#line3')
let loader = document.querySelector('.loader')
window.addEventListener("load", () => loader.classList.add("hideLoader")) //we can say loader.display = "none"
//_______________________________________________________________
//onclick on the brand .. go to home page
let logo = document.querySelector('.logo')
logo.addEventListener('click',()=> window.location.href = '/'); 
//_______________________________________________________________


overlay.addEventListener('click',()=> navToggle.click());

if(navToggle === null || navToggle === undefined){
    // return console.log('No nav toggle specified')
}else{
    let navUl = document.querySelector('#nav-ul')
    navToggle.addEventListener('click',()=> {
        navUl.classList.toggle('menu-list')
        line1.classList.toggle('top')
        line2.classList.toggle('middle')
        line3.classList.toggle('bottom')
        overlay.classList.toggle('showOverlay')
    })
}
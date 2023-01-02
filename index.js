import { catsData } from '/data.js'

const emotionsRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')



/* event listener on the emotions radios */
emotionsRadios.addEventListener("change", highlightCheckedOption)

/* event listener on the close button of the modal */
memeModalCloseBtn.addEventListener("click", closeModal)

/* event listener on the get image button */
getImageBtn.addEventListener("click", renderCat)




    
/* highlight checked option of the radio */
function highlightCheckedOption(e) {
    const radioArray = document.getElementsByClassName('radio') // array of all items that have the radio class (HTMLCollectionOfElements)
    for(let radio of radioArray) { // iteration over the array
        radio.classList.remove('highlight') // remove the class from each one
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight') // add the highlight class
}

/* function that close the modal */
function closeModal() {
    memeModal.style.display = 'none'
}

/* function that will use the cat object provided by getSingleCastObject to create HTML string which it will render it to the DOM */
function renderCat() {
    const catObject = getSingleCatObject()
    memeModal.style.display = 'flex'
    memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
    `
}

/* function that will return a single cat object selected from the array provided by getMatchingCatsArray */
function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1) {
        return catsArray[0]
    } else {
        let rand = Math.floor(Math.random()*catsArray.length) // return a random object when there is more than one cat
        return catsArray[rand]
    }
}

/* function that returns an array of cat objects thats matches the user's critteria */
function getMatchingCatsArray(e) {
    if(document.querySelector('input[type="radio"]:checked')) { // only run the two lines of codes if an emotion has been selected
        const checkedRadioInputValue = document.querySelector('input[type="radio"]:checked').value
        const isGifChecked = gifsOnlyOption.checked // const to get a boolean from if gif is select or not
        const emotionMatchArray = catsData.filter(function(cat) {
            if(isGifChecked) {
                return cat.emotionTags.includes(checkedRadioInputValue) && cat.isGif // return an array with only gif inside if gif only is checked
            } else {
            return cat.emotionTags.includes(checkedRadioInputValue) // create an array of selected emotionTags
            }
        })
        return emotionMatchArray
    } 
}


/* Create an array for emotionTags */
function getEmotionsArray(cats){
    const emotionArray = []
    for(let cat of cats) {
        for(let emotion of cat.emotionTags) {
            if(!emotionArray.includes(emotion)) { // ! makes it inverse
                emotionArray.push(emotion)
            } 
        }
    }
    return emotionArray
}

/* function to render emotions */
function renderEmotionsRadios(cats) {
    let radiosItems = ``
    const emotions = getEmotionsArray(cats)
    for(let emotion of emotions) {
        radiosItems += `
        <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
        </div>
        `
    }
    emotionsRadios.innerHTML = radiosItems
}

renderEmotionsRadios(catsData)
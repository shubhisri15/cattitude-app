import { catEmotions } from '/data.js'
import { getCatGifByEmotion } from '/getGif.js'

// access elements from DOM
const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const pg13OnlyOption = document.getElementById('pg13-only-option')

emotionRadios.addEventListener('change', highlightCheckedOption)
memeModalCloseBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', async function() {
    const selectedRadio = document.querySelector('input[name="emotions"]:checked')
    if (selectedRadio) {
        const gifData = await getCatGifByEmotion(selectedRadio.value, pg13OnlyOption.checked)
        if (gifData) {
            renderCat(gifData)
        }
    } else {
        console.log("No emotion selected.")
    }
})

function closeModal(){
    memeModal.style.display = 'none'
}

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function renderCat(img){
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="${img.src}"
        alt="${img.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

function renderEmotionsRadios() {
    let radioItems = ``
    const emotions = catEmotions.sort()
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion.toUpperCase()}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios()
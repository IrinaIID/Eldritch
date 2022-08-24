// import difficulties from './data/difficulties.js';
// console.log(difficulties)
import ancientsData from './data/ancients.js';
console.log (ancientsData)

import cardsDataBlue from './data/mythicCards/blue/index.js'
import cardsDataBrown from './data/mythicCards/brown/index.js'
import cardsDataGreen from './data/mythicCards/green/index.js'



const allAncientsCards = document.querySelectorAll('.ancients-cards img');
const cardAzath = document.querySelector('.card-azathoth');
const cardCthul = document.querySelector('.card-cthulthu');
const cardIog = document.querySelector('.card-iogSothoth');
const cardShub = document.querySelector('.card-shubNiggurath');



cardAzath.addEventListener('click', playAzath);
cardCthul.addEventListener('click', playCthul);
cardIog.addEventListener('click', playIog);
cardShub.addEventListener('click', playShub);

let playAncient;
let playDifficult;
let tracker;
let diff;

function playAzath() {
    playAncient = 'Azath';
    changeColorAncient(cardAzath);
    showTracker(ancientsData[0]);
}

function playCthul() {
    playAncient = 'Cthul';
    changeColorAncient(cardCthul);
    showTracker(ancientsData[1]);
}

function playIog() {
    playAncient = 'Iog';
    changeColorAncient(cardIog);
    showTracker(ancientsData[2]);
}

function playShub() {
    playAncient = 'Shub';
    changeColorAncient(cardShub);
    showTracker(ancientsData[3]);
}


function changeColorAncient(card) {
    allAncientsCards.forEach(img => {
        img.classList.remove('ancients-cards-active');
    });
    card.classList.add('ancients-cards-active');
}


//  tracker
const stage1Circles = document.querySelectorAll('.stage1 .number');
const stage2Circles = document.querySelectorAll('.stage2 .number');
const stage3Circles = document.querySelectorAll('.stage3 .number');

function showTracker(card) {

    tracker = 1;

    stage1Circles[0].innerHTML = card.firstStage.greenCards;
    stage1Circles[1].innerHTML = card.firstStage.brownCards;
    stage1Circles[2].innerHTML = card.firstStage.blueCards;

    stage2Circles[0].innerHTML = card.secondStage.greenCards;
    stage2Circles[1].innerHTML = card.secondStage.brownCards;
    stage2Circles[2].innerHTML = card.secondStage.blueCards;

    stage3Circles[0].innerHTML = card.thirdStage.greenCards;
    stage3Circles[1].innerHTML = card.thirdStage.brownCards;
    stage3Circles[2].innerHTML = card.thirdStage.blueCards;

    let sumStage1 = card.firstStage.greenCards + card.firstStage.brownCards + card.firstStage.blueCards;
    let sumStage2 = card.secondStage.greenCards + card.secondStage.brownCards + card.secondStage.blueCards;
    let sumStage3 = card.thirdStage.greenCards + card.thirdStage.brownCards + card.thirdStage.blueCards;

    let sumGreen = card.firstStage.greenCards + card.secondStage.greenCards + card.thirdStage.greenCards;
    let sumBrown = card.firstStage.brownCards + card.secondStage.brownCards + card.thirdStage.brownCards;
    let sumBlue = card.firstStage.blueCards + card.secondStage.blueCards + card.thirdStage.blueCards;
}


// difficulty

// const diff0 = document.querySelector('.diff0');
// const diff1 = document.querySelector('.diff1');
// const diff2 = document.querySelector('.diff2');
// const diff3 = document.querySelector('.diff3');
// const diff4 = document.querySelector('.diff4');

const allComplexity = document.querySelectorAll('.complexity button');
const showDiff = document.querySelector('.choice-diff');

allComplexity.forEach(btn => {
    btn.addEventListener('click', () => {
        showDiff.innerHTML = btn.innerHTML;
        diff = 1;
    })
})



// go 

const btnGo = document.querySelector('.btn-go');
const imgCover = document.querySelector('.img-cover');
const imgPlayCard = document.querySelector('.place-for-card');

btnGo.addEventListener('click', function() {
    if( tracker + diff === 2 ){
      imgCover.style.display = 'block';
      imgPlayCard.style.display = 'block';
    //   setCards()
    }
})

// diff-color

const greenEasyAll = [];
const greenNormalAll = [];
const greenHardAll = [];

const brownEasyAll = [];
const brownNormalAll = [];
const brownHardAll = [];

const blueEasyAll = [];
const blueNormalAll = [];
const blueHardAll = [];

function sortColorDiff(arrColor, easy, normal, hard) {
    arrColor.forEach(elem => {
        if (elem.difficulty === 'easy') {easy.push(elem)}
        if (elem.difficulty === 'normal') {normal.push(elem)}
        if (elem.difficulty === 'hard') {hard.push(elem)}
    })
}

sortColorDiff(cardsDataGreen, greenEasyAll, greenNormalAll, greenHardAll);
sortColorDiff(cardsDataBrown, brownEasyAll, brownNormalAll, brownHardAll);
sortColorDiff(cardsDataBlue, blueEasyAll, blueNormalAll, blueHardAll);



console.log(brownNormalAll)

// diff-0


const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp
    }
    return array
}




// function setCards() {
//     const new
//    if (showDiff.innerHTML === 'Очень лёгкий') {

//    }
// }





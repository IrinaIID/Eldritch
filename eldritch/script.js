import ancientsData from './data/ancients.js';

import cardsDataBlue from './data/mythicCards/blue/index.js';
import cardsDataBrown from './data/mythicCards/brown/index.js';
import cardsDataGreen from './data/mythicCards/green/index.js';

import cardsData from './data/mythicCards/allCards.js';



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
}

    let sumStage1 = stage1Circles[0].innerHTML + stage1Circles[1].innerHTML + stage1Circles[2].innerHTML;
    let sumStage2 = stage2Circles[0].innerHTML + stage2Circles[1].innerHTML + stage2Circles[2].innerHTML;
    let sumStage3 = stage3Circles[0].innerHTML + stage3Circles[1].innerHTML + stage3Circles[2].innerHTML;

    let sumGreen = stage1Circles[0].innerHTML + stage2Circles[0].innerHTML + stage3Circles[0].innerHTML;
    let sumBrown = stage1Circles[1].innerHTML + stage2Circles[1].innerHTML + stage3Circles[1].innerHTML;
    let sumBlue = stage1Circles[2].innerHTML + stage2Circles[2].innerHTML + stage3Circles[2].innerHTML;


// difficulty

const allComplexity = document.querySelectorAll('.complexity button');
const showDiff = document.querySelector('.choice-diff');

allComplexity.forEach(btn => {
    btn.addEventListener('click', () => {
        showDiff.innerHTML = btn.innerHTML;
        diff = 1;
    })
})


// go 

let a;

const btnGo = document.querySelector('.btn-go');
const imgCover = document.querySelector('.img-cover');
const imgPlayCard = document.querySelector('.place-for-card');

btnGo.addEventListener('click', go)

function go() {
    if( tracker + diff === 2 ){
      imgCover.style.display = 'block';
      imgPlayCard.style.display = 'block';
      a = setCards()
    }
}


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

// set diff 0

function set0Arr(colorEasy, colorNormal, x) {
    let playArr = [];
    let newColorNormal = shuffle(colorNormal);
    let sumColor = +stage1Circles[x].innerHTML + +stage2Circles[x].innerHTML + +stage3Circles[x].innerHTML;

    colorEasy.forEach(elem => {
        playArr.push(elem)
    })

    if (playArr.length < sumColor) {
        for (let i = 0; playArr.length < sumColor; i++) {
            playArr.push(newColorNormal[i])
        }
    }
    
    return shuffle(playArr)
}

function setCardsDiff0() {

    let greenArr = set0Arr(greenEasyAll, greenNormalAll, 0);
    let brownArr = set0Arr(brownEasyAll, brownNormalAll, 1);
    let blueArr = set0Arr(blueEasyAll, blueNormalAll, 2);
    return {
        'greenArr': greenArr,
        'brownArr': brownArr,
        'blueArr': blueArr
    }
}


// set diff 1

function set1Arr(colorEasy, colorNormal) {
    let playArr = [];
    colorEasy.forEach(elem => {
        playArr.push(elem)
    })
    colorNormal.forEach(elem => {
        playArr.push(elem)
    })
    return shuffle(playArr)
}

function setCardsDiff1() {
    let greenArr = set1Arr(greenEasyAll, greenNormalAll);
    let brownArr = set1Arr(brownEasyAll, brownNormalAll);
    let blueArr = set1Arr(blueEasyAll, blueNormalAll);
    return {
        'greenArr': greenArr,
        'brownArr': brownArr,
        'blueArr': blueArr
    }
}


// set diff 2 

function set2Arr(colorEasy, colorNormal, colorHard) {
    let playArr = [];
    colorEasy.forEach(elem => {
        playArr.push(elem)
    })
    colorNormal.forEach(elem => {
        playArr.push(elem)
    })
    colorHard.forEach(elem => {
        playArr.push(elem)
    })
    return shuffle(playArr)
}

function setCardsDiff2() {
    let greenArr = set2Arr(greenEasyAll, greenNormalAll, greenHardAll);
    let brownArr = set2Arr(brownEasyAll, brownNormalAll, brownHardAll);
    let blueArr = set2Arr(blueEasyAll, blueNormalAll, blueHardAll);
    return {
        'greenArr': greenArr,
        'brownArr': brownArr,
        'blueArr': blueArr
    }
}



// set diff 3 

function set3Arr(colorNormal, colorHard) {
    let playArr = [];
    colorNormal.forEach(elem => {
        playArr.push(elem)
    })
    colorHard.forEach(elem => {
        playArr.push(elem)
    })
    return shuffle(playArr)
}

function setCardsDiff3() {
    let greenArr = set3Arr(greenNormalAll, greenHardAll);
    let brownArr = set3Arr(brownNormalAll, brownHardAll);
    let blueArr = set3Arr(blueNormalAll, blueHardAll);
    return {
        'greenArr': greenArr,
        'brownArr': brownArr,
        'blueArr': blueArr
    }
}


// set diff 4 

function set4Arr(colorHard, colorNormal, x) {
    const playArr = [];
    const newColorNormal = shuffle(colorNormal);
    let sumColor = +stage1Circles[x].innerHTML + +stage2Circles[x].innerHTML + +stage3Circles[x].innerHTML;

    
    colorHard.forEach(elem => {
        playArr.push(elem)
    })


    if (playArr.length < sumColor) {
        for (let i = 0; playArr.length < sumColor; i++) {
            playArr.push(newColorNormal[i])
        }
    } 
    return shuffle(playArr)
}

function setCardsDiff4() {
    let greenArr = set4Arr(greenHardAll, greenNormalAll, 0);
    let brownArr = set4Arr(brownHardAll, brownNormalAll, 1);
    let blueArr = set4Arr(blueHardAll, blueNormalAll, 2);
    return {
        'greenArr': greenArr,
        'brownArr': brownArr,
        'blueArr': blueArr
    }
}


// fill stages

function fillStages(cards) {
    let stage1 = [];
    let stage2 = [];
    let stage3 = [];

    let green = cards.greenArr;
    let brown = cards.brownArr;
    let blue = cards.blueArr;
    
    function stages(stageCircles, stage) {

    for(let i = 0; i < stageCircles[0].innerHTML; i++) {
        stage.push(green.pop())
    }

    for(let i = 0; i < stageCircles[1].innerHTML; i++) {
        stage.push(brown.pop())
    }

    for(let i = 0; i < stageCircles[2].innerHTML; i++) {
        stage.push(blue.pop())
    }

        return stage
    }

    stage1 = shuffle(stages(stage1Circles, stage1));
    stage2 = shuffle(stages(stage2Circles, stage2));
    stage3 = shuffle(stages(stage3Circles, stage3));

    return [stage1, stage2, stage3]

}


function setCards() {
    let allCardsForplay;

    if (showDiff.innerHTML === 'Очень лёгкий') {
        allCardsForplay = setCardsDiff0()
        return fillStages(allCardsForplay)
    }

    if (showDiff.innerHTML === 'Лёгкий') {
        allCardsForplay = setCardsDiff1()
        return fillStages(allCardsForplay)
    }

    if (showDiff.innerHTML === 'Средний') {
        allCardsForplay = setCardsDiff2()
        return fillStages(allCardsForplay)
    }

    if (showDiff.innerHTML === 'Высокий') {
        allCardsForplay = setCardsDiff3()
        return fillStages(allCardsForplay)
    }

    if (showDiff.innerHTML === 'Очень высокий') {
        allCardsForplay = setCardsDiff4()
        return fillStages(allCardsForplay)
    }
}


// click cards and change 

imgCover.addEventListener('click', showCards);

function showCards() {
    let playCard;
    let arrPlayCards = a;
    let playStage1 = arrPlayCards[0];
    let playStage2 = arrPlayCards[1];
    let playStage3 = arrPlayCards[2];

    console.log(a)
    const blockStage1 = document.querySelector('.stage1');
    const blockStage2 = document.querySelector('.stage2');
    const blockStage3 = document.querySelector('.stage3');

    if (playStage1.length > 0) {
            blockStage1.classList.add('stage-active');
            playCard = playStage1.pop()
            let path = `assets/MythicCards/all-cards/${playCard.id}.png`
            imgPlayCard.style.backgroundImage = `url('${path}')`
            if (playCard.color === 'green') {stage1Circles[0].innerHTML -= 1}
            if (playCard.color === 'brown') {stage1Circles[1].innerHTML -= 1}
            if (playCard.color === 'blue') {stage1Circles[2].innerHTML -= 1}

        } else if (playStage2.length > 0) {
            blockStage1.classList.remove('stage-active');
            blockStage2.classList.add('stage-active');
            playCard = playStage2.pop()
            let path = `assets/MythicCards/all-cards/${playCard.id}.png`
            imgPlayCard.style.backgroundImage = `url('${path}')`
            if (playCard.color === 'green') {stage2Circles[0].innerHTML -= 1}
            if (playCard.color === 'brown') {stage2Circles[1].innerHTML -= 1}
            if (playCard.color === 'blue') {stage2Circles[2].innerHTML -= 1}

        } else if (playStage3.length > 0) {
            blockStage2.classList.remove('stage-active');
            blockStage3.classList.add('stage-active');
            playCard = playStage3.pop()
            let path = `assets/MythicCards/all-cards/${playCard.id}.png`
            imgPlayCard.style.backgroundImage = `url('${path}')`
            if (playCard.color === 'green') {stage3Circles[0].innerHTML -= 1}
            if (playCard.color === 'brown') {stage3Circles[1].innerHTML -= 1}
            if (playCard.color === 'blue') {stage3Circles[2].innerHTML -= 1}
        } else {
            blockStage3.classList.remove('stage-active');
            imgCover.style.display = 'none';
            imgPlayCard.style.backgroundImage = 'none'
            setTimeout(() => {
                location.reload()
            }, 1000); 

        }
}
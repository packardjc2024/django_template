// Start welcome section at full screen for 5 seconds
$(document).ready(() => {
    setTimeout(() => {
        $('#welcome-section').animate({
            height: '500px',
        }, 2000)
    }, 5000);
})

/******************************************************************************
Flip card related functions
*******************************************************************************/
let skillsCategories;
let skillsFront;
let flipDegrees;
let animationIds;
let logoPositions;
let logoId;
let logoObjects;
let currentAnimationCardId;
let isFront;
let aboutFlip;

$(document).ready(() => {
    animationIds = [];
    logoPositions = [];
    logoId = 1;
    logoObjects = [];
    skillsFront = true;
    skillsFlip = 0;
    skillsCategories = [
        'front-end',
        'back-end',
        'web-based',
        'misc'
    ];
    isFront = {
        'front-end': true,
        'back-end': true,
        'web-based': true,
        'misc': true,
        'goals': true,
        'work-experience': true,
        'education': true,
    }
    flipDegrees = {
        'front-end': 0,
        'back-end': 0,
        'web-based': 0,
        'misc': 0,
        'goals': 0,
        'work-experience': 0,
        'education': 0
    }
    aboutFlip = [
        'goals',
        'work-experience',
        'education'
    ]

    arrangeLogos();
    $('.skills-flip-card, .about-flip-card').on('click', function() {
        cardFlip($(this));
    });
});


function cardFlip(category){
    let categories;
    if (aboutFlip.includes(category.attr('id'))){
        categories = aboutFlip;
    } else {
        categories = skillsCategories;
        stopAnimation();
    }
    let tempFront = isFront[category.attr('id')];
    // Make sure all cards are flipped to the front
    for (let card of categories){
        if (!isFront[card]){
            flipDegrees[card] += 180;
            isFront[card] = true;
            $(`#${card}`).css({
                'transition': 'transform 1s',
                'transform': `rotateY(${flipDegrees[card]}deg)`
            });
        }
    }
    
    // If the card was already facing front
    if (tempFront){
        flipDegrees[category.attr('id')] += 180;
        if (skillsCategories.includes(category.attr('id'))){
            resetLogos(`${category.attr('id')}-back`);
            animateLogos(`${category.attr('id')}-back`);
        }
        isFront[category.attr('id')] = false;
        category.css({
            'transition': 'transform 1s',
            'transform': `rotateY(${flipDegrees[category.attr('id')]}deg)`
        });
    }
}


/******************************************************************************
Logo animation related functions
*******************************************************************************/
function stopAnimation(){
    animationIds.forEach(id => cancelAnimationFrame(id));
    animationIds = [];
}

function animateLogos(containerId){
    let logos;
    let containerWidth;
    resetLogos(containerId);
    for (let container of logoPositions){
        if (container['containerId'] == containerId){
            logos = container['logos'];
            containerWidth = container['containerWidth'];
            break;
        } 
    }
    for (let logo of logos){
        moveLogo(logo, document.getElementById(containerId));
    }
}

function arrangeLogos(){
// Arranges the logos' starting points based on the max size
// Creates a list of container objects that include a list of logo objects
    let logoContainers = document.getElementsByClassName('logos-container');
    for (let logoContainer of logoContainers){
        let logos = logoContainer.getElementsByClassName('moving-logo');
        let logoHeight = calculateLogoHeight(logos);
        let logoWidth = calculateLogoWidth(logos);
        let containerWidth = logoContainer.offsetWidth;
        let initialTop;
        let initialLeft;
        let logoObjects = [];
        let distance;

        for (let i=0; i<logos.length; i++){
            distance = i % 2 == 0 ? 2 : -2;
            // Start a new row at the end of the container width
            if (i == 0){
                initialLeft = 10;
                initialTop = 10;
             } else if (initialLeft + logoWidth >= containerWidth){
                    initialLeft = 10;
                    initialTop = initialTop + logoHeight + 10;
                } else {
                    initialLeft += logoHeight + 10;
                }
    
            // store the logos starting position
            logoObjects.push({
                'element': logos[i],
                'left': initialLeft + 'px',
                'top': initialTop + 'px',
                'distanceX': distance,
                'distanceY': distance
            });
    
            // Make the initial placement
            logos[i].style.left = initialLeft + 'px';
            logos[i].style.top = initialTop + 'px';
        }
        logoPositions.push({
            'containerId': logoContainer.id,
            'logos': logoObjects,
            'containerWidth': containerWidth
        })
    }
}

function resetLogos(containerId){
    for (let logoContainer of logoPositions){
        if (logoContainer['containerId'] == containerId){
            for (let logo of logoContainer['logos']){
                let logoElement = logo['element'];
                logoElement.style.left = logo['left'];
                logoElement.style.top = logo['top'];
            }
        }
    }
}

function moveLogo(logoObject, containerElement){
    // Animation function that makes the logos move
    let animationId;
    let x = logoObject['element'].offsetLeft;
    let y = logoObject['element'].offsetTop;

    // Slow down animation on smaller screens
    if (window.innerWidth < 763){
        logoObject['distanceX'] = (logoObject['distanceX'] > 0) ? 1 : -1;
        logoObject['distanceY'] = (logoObject['distanceY'] > 0) ? 1 : -1;
    }

    x += logoObject['distanceX'];
    y += logoObject['distanceY'];

    if (x + logoObject['element'].offsetWidth >= containerElement.offsetWidth || x <= 0){
        logoObject['distanceX'] = -logoObject['distanceX'];
    }
    if (y + logoObject['element'].offsetHeight >= containerElement.offsetHeight || y <= 0){
        logoObject['distanceY'] = -logoObject['distanceY'];
    }

    logoObject['element'].style.left = x + 'px';
    logoObject['element'].style.top = y + 'px';

    animationId = requestAnimationFrame(() => moveLogo(logoObject, containerElement));
    animationIds.push(animationId);
}


function calculateLogoHeight(logosArray){
    // Returns the max height and width of the logos
    let maxHeight = 0;
    for (let logo of logosArray){
        if (logo.offsetHeight > maxHeight){
            maxHeight = logo.offsetHeight;
        }
    }
    return maxHeight;
}


function calculateLogoWidth(logosArray){
    // Returns the max height and width of the logos
    let maxWidth = 0;
    for (let logo of logosArray){
        if (logo.offsetWidth > maxWidth){
            maxWidth = logo.offsetWidth;
        }
    }
    return maxWidth;
}


/******************************************************************************
Typewriter related functions
*******************************************************************************/
$(document).ready(function(){
    setTimeout(function(){
        typewriter();
    }, 1000);
});

function typewriter(){
    let line1 = 'Hello, World!';
    let line2 = "I'm Jeremy.";
    let helloElement = $('#hello-container');
    let nameElement = $('#name-container');
    let speed = 75;
    let duration = speed * line2.length + 1400;
    type(helloElement, line1, speed);
    setTimeout(function(){
        helloElement.removeClass('caret-container');
        nameElement.addClass('caret-container');
        type(nameElement, line2, speed);
    }, duration);
    setTimeout(() => {
        erase(nameElement, line2, speed);
        setTimeout(() => {
            nameElement.removeClass('caret-container');
            helloElement.addClass('caret-container');
        }, duration);
    }, duration * 2);
    setTimeout(() => {
        erase(helloElement, line1, speed);
    }, duration * 3 + 300);
    setTimeout(() => typewriter(), duration * 4);
}

function type(elementObject, elementString, speed){
    let index = 0;
    let typeInterval = setInterval(function(){
        if (index <= elementString.length){
            elementObject.html(elementString.slice(0, index));
            index++;
        }
    }, speed);
}

function erase(elementObject, elementString, speed){
    let index = elementString.length - 1;
    let typeInterval = setInterval(function(){
        if (index >= 0){
            elementObject.html(elementString.slice(0, index));
            index--;
        }
    }, speed);
}

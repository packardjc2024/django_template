$(document).ready(() => {
    $('#menu-button').on('click', dropMenu);
    $('.section-link').on('click', () => {
        menuClick($(this));
    });
});

function dropMenu(menuName){
    if ($('#dropdown-container').css('display') === 'none'){
        $('#dropdown-container').css('display', 'flex');
    } else {
        $('#dropdown-container').css('display', 'none');
    }
}

function menuClick(jQueryLink){
    if ($('#dropdown-container').css('display') === 'flex'){
        $('#dropdown-container').css('display', 'none');
    }
}

// $(document).ready(function(){
//     changeHeaderHeight();
//     changeFooterHeight();
// });

// $(window).on('resize', function(){
//     changeHeaderHeight();
//     changeFooterHeight();
// });


// function changeHeaderHeight(){
//     let headerHeight = $('.top-navbar').height();
//     $('#main').css('margin-top', `${headerHeight}px`);
// }


// function changeFooterHeight(){
//     let footerHeight = $('.bottom-navbar').height();
//     $('#main').css('margin-bottom', `${footerHeight}px`);
// }


// // Throttle the scrolling on the page.
// let throttled;
// let sections;
// let direction;
// let index;
// let throttleSpeed;
// let scrollLength;
// let scrollMove;
// let backgrounds;

// $(document).ready(() => {
//     throttled = true;
//     index = 0;
//     direction = 1;
//     throttleSpeed = 500;
//     scrollMove = 100;
//     scrollMove = $(window).height() / 2;
//     sections = document.querySelectorAll(".section");
//     links = document.querySelectorAll('.section-link');
//     $('.section-link').on('click', updateSection);
//     // Only apply scroll to Safari
//     let userAgent = navigator.userAgent;
//     if (userAgent.indexOf('Safari') > -1){
//         console.log(navigator.userAgent.indexOf('Safari'));
//         window.addEventListener('wheel', handleScroll, {passive: false});
//     } else {
//         console.log('not safari');
//     }
//     backgrounds = [
//         'black',
//         'purple',
//         'blue',
//         'green',
//         'black'
//     ];
//     setTimeout(() => throttled = false, 2000);
// });

// function handleScroll(event) {
//     // Allow horizontal scrolling
//     if (event.deltaX !== 0){
//         return;
//     }

//     // Check if scrolling has been paused
//     if (throttled || Math.abs(event.deltaY) < 20){
//         event.preventDefault();
//         event.stopPropagation();
//         return;
//     }

//     // Gather the position and size information
//     let section = $(`#${sections[index].id}`);
//     let sectionTop = section.offset().top;
//     let sectionBottom = sectionTop + section.outerHeight(true);
//     let windowTop = $(window).scrollTop();
//     let windowBottom = windowTop + $(window).height();

//     // Scroll Down
//     if (event.deltaY > 0){
//         let remaining = sectionBottom - windowBottom
//         // Does the section extend beyond the bottom of the window?
//         if (remaining > 0){
//             // Will the size of the scroll reach the bottom of the section?
//             if (remaining - event.deltaY < 0){
//                 event.preventDefault();
//                 event.stopPropagation();
//                 $('html, body').stop(true, true).animate({
//                     scrollTop: sectionBottom - $(window).height()
//                 }, 'slow');
//             } else {
//                 // Allow regular scroll behavior
//                 return;
//             }
//         } else {
//             // Skip to the next section
//             event.preventDefault();
//             event.stopPropagation();
//             index++;
//             // Check for bottom of page and index out of bounds
//             if (index > sections.length -1){
//                 index = sections.length - 1;
//                 return;
//             }
//             nextSection = $(`#${sections[index].id}`);
//             moveTo = nextSection.offset().top;
//             $('html, body').stop(true, true).animate({
//                 scrollTop: moveTo
//             }, 'slow');
//         }
//     // Scroll Up
//     } else {
//         if (event.deltaY < -20) {
//             event.preventDefault();
//             event.stopPropagation();
//             return;
//         }
//         // Does the top of the section extend beyond the top of the window?
//         let remaining = sectionTop - windowTop;
//         if (remaining > 0){
//             // Will size of the scroll reach the top of the section?
//             // Use "+" here because event.deltaY will be negative for an upwards scroll
//             if (remaining + event.deltaY < 0){
//                 event.preventDefault();
//                 event.stopPropagation();
//                 $('html, body').stop(true, true).animate({
//                     scrollTop: sectionTop
//                 }, 'slow');
//             } else {
//                 // Allow regular scroll behavior
//                 return;
//             } 
//         } else {
//             // Skip to the next section
//             event.preventDefault();
//             event.stopPropagation();
//             index--;
//             // Check for top of page and index out of bounds
//             if (index < 0) {
//                 index = 0;
//                 return;
//             }
//             nextSection = $(`#${sections[index].id}`);
//             moveTo = nextSection.offset().top;
//             $('html, body').stop(true, true).animate({
//                 scrollTop: moveTo
//             }, 'slow');
//         }
//     }
//     // After prevent default throttle speed
//     throttled = true;
//     setTimeout(() => throttled = false, throttleSpeed);
// }


// function updateSection(){
//     index = Array.from(links).indexOf($(this)[0]);
// }
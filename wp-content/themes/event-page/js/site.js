import './vendor/jquery-global.js';
import FilterNav from './modules/FilterNav';
import Accordion from './modules/Accordion';
import TableWrap from './modules/TableWrap';
import Menu from './modules/Menu';
import EmbedResponsively from './modules/EmbedResponsively';
import AOS from 'aos';
// ..

$('.post-list__section--filterable').each(function() {
    new FilterNav($(this));
})

new Accordion($('.accordion__title'));
new TableWrap($('.main-content table:not([class])'), 'table-wrapper');
new EmbedResponsively($('.main-content iframe, .main-content embed, .main-content object'), 'embed-container');
new Menu();

// add aos to gform
/*
let gformWrapper = document.querySelectorAll('.gform_fields');
for (var i = 0; i < gformWrapper[0].childNodes.length; i++) {
    console.log(gformWrapper[0].childNodes[i]);
    gformWrapper[0].childNodes[i].setAttribute("data-aos", "zoom-in-right" )
}
*/
/*
//remove nav aos on mobile
function removeAos(){
    const mediaQuery = window.matchMedia('(max-width: 1200px)')
    if (mediaQuery.matches) {
        let nav = document.querySelectorAll('.nav');
        nav[0].removeAttribute('data-aos');
    }
}
*/

// aos  
//removeAos();
//window.addEventListener('resize', removeAos);
AOS.init();
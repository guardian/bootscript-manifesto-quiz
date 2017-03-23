import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'


var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');
var el;
var data;
var comingSoonIndex = 0;

export function init(dom, context, config, mediator) {
  var contentBody = document.querySelector('.content__article-body');


  var parkourImageOne = document.createElement('figure');
  parkourImageOne.setAttribute('class', 'element--immersive parkour-image parkour-image-one');
  parkourImageOne.innerHTML = '<div class="wrapper-one"><div class="person-one parkour-cutout-one"><img src="https://interactive.guim.co.uk/embed/article-embeds/parkour_02/hashed/rooftop-overlay.d23a30f2.png"></div><h2 class="parkour-text-one"><span>I fully</span><span>expected</span><span>him to die</span></h2></div>';
  contentBody.insertBefore(parkourImageOne, contentBody.childNodes[10]);

  var parkourImageTwo = document.createElement('figure');
  parkourImageTwo.setAttribute('class', 'element--immersive parkour-image parkour-image-two');
  parkourImageTwo.innerHTML = '<div class="wrapper-two"><h2 class="parkour-text-two fadein"><span>I fully</span><span>expected</span><span>him to die</span></h2></div>';
  contentBody.insertBefore(parkourImageTwo, contentBody.childNodes[20]);

  var parkourImageThree = document.createElement('figure');
  parkourImageThree.setAttribute('class', 'element--immersive parkour-image parkour-image-three');
  parkourImageThree.innerHTML = '<div class="wrapper-three"><h2 class="parkour-text-three fadein"><span>I fully</span><span>expected</span><span>him to die</span></h2></div>';
  contentBody.insertBefore(parkourImageThree, contentBody.childNodes[40]);

  var parkourImageFour = document.createElement('figure');
  parkourImageFour.setAttribute('class', 'element--immersive parkour-image parkour-image-four');
  parkourImageFour.innerHTML = '<div class="wrapper-four"><div class="parkour-background-four"><img src="https://interactive.guim.co.uk/embed/article-embeds/parkour_04/hashed/rooftop.2029d8f9.jpg"></div><div class="person-four"><img src="https://interactive.guim.co.uk/embed/article-embeds/parkour_04/hashed/person.954c4b27.png"></div><h2 class="parkour-text-four"><span>I was born</span><span>on the edge</span><span>of a skyscraper</span></h2></div>';
  contentBody.insertBefore(parkourImageFour, contentBody.childNodes[80]);





  // Create cross browser requestAnimationFrame method:
  window.requestAnimationFrame = window.requestAnimationFrame
   || window.mozRequestAnimationFrame
   || window.webkitRequestAnimationFrame
   || window.msRequestAnimationFrame
   || function(f){setTimeout(f, 1000/60)}

  function parkourOne(){
  //Parrallax animations
  var block = document.getElementsByClassName('parkour-cutout-one');
  var container = document.getElementsByClassName('parkour-image-one');
   var scrolltop = window.pageYOffset // get number of pixels document has scrolled vertically
   var containerOffset =  container[0].getBoundingClientRect().top;
   var parrallax = containerOffset / 10;
   var text = document.querySelector('.parkour-text-one');
   if(containerOffset <= 1){
     text.classList.add("fadein");
   }
   block[0].style.bottom = parrallax * -2 + 'px' // move bubble1 at 20% of scroll rate
  }

  function parkourFour(){
   var blockFour = document.getElementsByClassName('parkour-background-four');
   var containerFour = document.getElementsByClassName('parkour-image-four');
   var scrolltop = window.pageYOffset // get number of pixels document has scrolled vertically
   var containerOffset =  containerFour[0].getBoundingClientRect().top;
   var parrallax = containerOffset / 10;
   var text = document.querySelector('.parkour-text-four');
   if(containerOffset <= 1){
     text.classList.add("fadein");
   }
   blockFour[0].style.bottom = parrallax * -2 + 'px' // move bubble1 at 20% of scroll rate
  }

  window.addEventListener('scroll', function(){ // on page scroll
   requestAnimationFrame(parkourOne) // call parallaxbubbles() on next available screen paint
   requestAnimationFrame(parkourFour)
  }, false)
}

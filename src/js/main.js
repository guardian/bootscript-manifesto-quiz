import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'


var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');
var el;
var data;
var comingSoonIndex = 0;

export function init(dom, context, config, mediator) {
  var contentBody;
  var websiteContent = document.querySelector('.content__article-body');
  var headline = document.querySelector('.content__headline--immersive ');
  var appContent = document.querySelector('.article--immersive .article__body .from-content-api');

  if(headline) {
      headline.remove();
  }
  console.log('running');

  if(websiteContent){
    contentBody = websiteContent;
    console.log('web')
  }else if(appContent) {
    contentBody = appContent;
    console.log('app')
    console.log(appContent);
  }

  var parkourImageOne = document.createElement('figure');
  parkourImageOne.setAttribute('class', 'element--immersive parkour-image parkour-image-one');
  parkourImageOne.innerHTML = '<div class="wrapper wrapper-one"><div class="person-one parkour-cutout-one"><img src="https://interactive.guim.co.uk/embed/article-embeds/parkour_01/hashed/rooftop-overlay.7205a2b7.png"></div><h2 class="parkour-text parkour-text-one"><span>He was</span><span>a firework,</span><span>a free spirit</span></h2></div><div class="caption"><span class="inline-information inline-icon reveal-caption-icon centered-icon rounded-icon"><svg width="6" height="14" viewBox="0 0 6 14" class="reveal-caption-icon__svg centered-icon__svg rounded-icon__svg inline-information__svg inline-icon__svg"><path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z"></path></svg></span> Nye Newman in La Chapelle des Buis in France, in April 2016. Photograph: Roxanne Valnet/ATB Parkour in Paris</div>';
  contentBody.insertBefore(parkourImageOne, contentBody.childNodes[6]);

  var parkourImageTwo = document.createElement('figure');
  parkourImageTwo.setAttribute('class', 'element--immersive parkour-image parkour-image-two');
  parkourImageTwo.innerHTML = '<div class="wrapper wrapper-two"><h2 class="parkour-text parkour-text-two"><span>Most of us think,</span><span>I want to do that</span></h2></div><div class="caption"><span class="inline-information inline-icon reveal-caption-icon centered-icon rounded-icon"><svg width="6" height="14" viewBox="0 0 6 14" class="reveal-caption-icon__svg centered-icon__svg rounded-icon__svg inline-information__svg inline-icon__svg"><path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z"></path></svg></span> Nye Newman in Hong Kong, in August 2016. Photograph: Petar Cule</div>';
  contentBody.insertBefore(parkourImageTwo, contentBody.childNodes[20]);

  var parkourImageThree = document.createElement('figure');
  parkourImageThree.setAttribute('class', 'element--immersive parkour-image parkour-image-three');
  parkourImageThree.innerHTML = '<div class="wrapper wrapper-three"><h2 class="parkour-text parkour-text-three"><span>He listens to</span><span>Mozart while</span><span>he climbs</span></h2></div><div class="caption"><span class="inline-information inline-icon reveal-caption-icon centered-icon rounded-icon"><svg width="6" height="14" viewBox="0 0 6 14" class="reveal-caption-icon__svg centered-icon__svg rounded-icon__svg inline-information__svg inline-icon__svg"><path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z"></path></svg></span> ‘Mustang Wanted’, a young Ukrainian whose videos have been watched 30m times. Photograph: Pete Kiehart for the Guardian</div>';
  contentBody.insertBefore(parkourImageThree, contentBody.childNodes[40]);


  var parkourImageFour = document.createElement('figure');
  parkourImageFour.setAttribute('class', 'element--immersive parkour-image parkour-image-four');
  parkourImageFour.innerHTML = '<div class="wrapper wrapper-four"><div class="concrete"><img src="https://interactive.guim.co.uk/embed/article-embeds/parkour_04/hashed/concrete.9c31e730.png"></div><div class="person-four parkour-cutout-four"><img src="https://interactive.guim.co.uk/embed/article-embeds/parkour_04/hashed/person.1215cb5e.png"></div><h2 class="parkour-text parkour-text-four"><span>I was born</span><span>on the edge</span><span>of a skyscraper</span></h2></div><div class="caption"><span class="inline-information inline-icon reveal-caption-icon centered-icon rounded-icon"><svg width="6" height="14" viewBox="0 0 6 14" class="reveal-caption-icon__svg centered-icon__svg rounded-icon__svg inline-information__svg inline-icon__svg"><path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z"></path></svg></span> Mustang Wanted in Kiev in February. Photograph: Pete Kiehart for the Guardian</div>';
  contentBody.insertBefore(parkourImageFour, contentBody.childNodes[74]);




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
   if(containerOffset <= 200){
     text.classList.add("fadein");
   }
   block[0].style.bottom = parrallax * -2 + 'px' // move bubble1 at 20% of scroll rate
  }

  function parkourTwo(){
  //Parrallax animations
  var container = document.getElementsByClassName('parkour-image-two');
   var scrolltop = window.pageYOffset // get number of pixels document has scrolled vertically
   var containerOffset =  container[0].getBoundingClientRect().top;
   var text = document.querySelector('.parkour-text-two');
   if(containerOffset <= 200){
     text.classList.add("fadein");
   }
  }

  function parkourThree(){
  //Parrallax animations
  var container = document.getElementsByClassName('parkour-image-three');
   var scrolltop = window.pageYOffset // get number of pixels document has scrolled vertically
   var containerOffset =  container[0].getBoundingClientRect().top;
   var text = document.querySelector('.parkour-text-three');
   if(containerOffset <= 200){
     text.classList.add("fadein");
   }
  }

  function parkourFour(){
   var blockFour = document.getElementsByClassName('parkour-cutout-four');
   var containerFour = document.getElementsByClassName('parkour-image-four');
   var scrolltop = window.pageYOffset // get number of pixels document has scrolled vertically
   var containerOffset =  containerFour[0].getBoundingClientRect().top;
   var parrallax = containerOffset / 10;
   var text = document.querySelector('.parkour-text-four');
   if(containerOffset <= 200){
     text.classList.add("fadein");
   }
   blockFour[0].style.bottom = parrallax * -2 + 'px' // move bubble1 at 20% of scroll rate
  }

  window.addEventListener('scroll', function(){ // on page scroll
   requestAnimationFrame(parkourOne) // call parallaxbubbles() on next available screen paint
   requestAnimationFrame(parkourTwo)
   requestAnimationFrame(parkourThree)
   requestAnimationFrame(parkourFour)
  }, false)
}

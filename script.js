let mainCont = document.querySelector('.mainCont');
let footer = document.querySelector('.Footer');
let menu = document.querySelector('.menu');
let likeList = document.querySelector('.likeList');
document.querySelector('.ALL').classList.add('filterActive');


const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';
  }, timeout);
};

const fadeIn = (el, timeout, display) => {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
};

document.getElementById('ShopNpw').onclick = ()=>{

  fadeOut(document.getElementById('displaynone'),1000);
  document.getElementById('displaynone').style.height ='0';
  fadeIn( document.querySelector('.Main'), 1300, 'flex' );
  fadeIn( document.querySelector('.Footer'), 1300, 'flex' );

}

/*create request*/

let requestURL = 'https://script.google.com/macros/s/AKfycbzeh2PBz1DNB7UKVYfRYCZQTPvnZiMN4OXGUp75HqA998F3GCselKzRbnB0E4Z0gWUnmQ/exec';
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  let plants = request.response;
  getInfo(plants);
}

function getInfo(jsonObj){
  /*create cards*/

  console.log(jsonObj);
  for(let i = 0 ; i<jsonObj.length; i++){
  let cardEL = document.createElement("div");
  cardEL.classList.add('card');
  cardEL.classList.add(`${jsonObj[i].type}Card`)
  cardEL.insertAdjacentHTML("afterbegin",  `
          <div class="cardHead">
            <div class="cardHeadTXT">
              ${jsonObj[i].name}
            </div>
            <div class="heartbox">
              <div class="hide">
              <svg id="utility_like" viewBox="0 0 24.3 22.5" xmlns="http://www.w3.org/2000/svg">
              <path id="u-heart-fill" d="M12.2 22.5c-.2 0-.4-.1-.6-.2C4.4 18 .8 13.7.1 8.7-.4 5 1.6.7 6.5.1 9-.3 11 1 12.2 1.9c1.1-1 3.1-2.2 5.7-1.9 4.8.7 6.9 4.9 6.4 8.6-.7 5-4.3 9.3-11.4 13.7-.3.1-.5.2-.7.2z"/>
              <path id="u-heart-stroke" d="M12.2 22.5c-.2 0-.4-.1-.6-.2C4.4 18 .8 13.7.1 8.7-.4 5 1.6.7 6.5.1 9-.3 11 1 12.2 1.9c1.1-1 3.1-2.2 5.7-1.9 4.8.7 6.9 4.9 6.4 8.6-.7 5-4.3 9.3-11.4 13.7-.3.1-.5.2-.7.2zm-4.9-20h-.5C3.2 3 2.3 6.3 2.6 8.3c.4 2.6 1.8 6.5 9.6 11.5 7.8-4.9 9.2-8.9 9.6-11.5.3-2-.6-5.3-4.3-5.8-2.5-.4-4.4 1.9-4.4 1.9-.2.3-.6.4-1 .5-.4 0-.7-.2-1-.5 0 0-1.6-1.9-3.8-1.9z"/></svg>
            </div>

            <span class="a-icon a-icon--heart js-heart">
            <svg class="a-icon__asset" viewBox="0 0 24.3 22.5">
            <use class="a-icon--heart__fill" xlink:href="#u-heart-fill" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
            <use class="a-icon--heart__stroke" xlink:href="#u-heart-stroke" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
            </svg>
            </span>
            </div>
          </div>
          <div class="cardImg  ${jsonObj[i].type}" style="background-image: url(${jsonObj[i].img});"></div>
          
          <div class="cardFooter">
            <div class="prise">
              $ ${jsonObj[i].cost}
            </div>
          </div>

          <div class="nonedopinfo">
            <div class="description">${jsonObj[i].description}</div>
            <div class="water">${jsonObj[i].water}</div>
            <div class="sun">${jsonObj[i].sun}</div>
            <div class="tempr">${jsonObj[i].tempr}</div>
          </div>
  `) ;

  document.querySelector('.mainCont').appendChild(cardEL);
  }

  /*add likes*/
  let controls  = document.querySelectorAll('.js-heart');
  let card  = document.querySelectorAll('.card');

  [].forEach.call(controls, el => {
    el.addEventListener('click', btnClick, false)
  })

  function btnClick() {

    this.classList.toggle('is-active');
    this.parentNode.parentNode.parentNode.classList.toggle('likedCard')
    if (mainCont.classList.contains('likepage')) {
      CheckCard();
    } 
  }

  function CheckCard(){
  card.forEach(element => {
      if (element.classList.contains('likedCard')) {
        element.style.display='flex';
      }else {
        element.style.display='none';
      }
    });
  }

  /*menu*/

  let panels = document.querySelectorAll('.panel');

  [].forEach.call(panels, el => {
    el.addEventListener('click', pnlClick, false)
  })

  function pnlClick() {
    [].forEach.call(panels, el => {
    if (el !== this) el.classList.remove('active_panel');
    });

    this.classList.add('active_panel');
  
    if (this.classList.contains('home')) {
      card.forEach(element => {
        element.style.display='flex';
      });
      mainCont.classList.remove('likepage');

      document.querySelector('.filter').style.display = 'flex';
      document.querySelector('.advards').style.display = 'flex';
    }
    if (this.classList.contains('likes')) {
      mainCont.classList.add('likepage');
      CheckCard();

      document.querySelector('.filter').style.display = 'none';
      document.querySelector('.advards').style.display = 'none';
    }
    if (this.classList.contains('list')) {
      mainCont.classList.remove('likepage');
    }
    if (this.classList.contains('contacts')) {
      mainCont.classList.remove('likepage');
    }
  }

  /*card clicked*/

  const images = document.querySelectorAll('.cardImg');

  [].forEach.call(images, el => {
    el.addEventListener('click', cardImageClicked, false)
  })

  function cardImageClicked(){

    let CardName = this.previousElementSibling.firstElementChild.textContent;
    let origincard = this.parentNode;
    let originlike = this.previousElementSibling.lastElementChild.lastElementChild;
    if (window.innerWidth <= 420) {
      document.querySelector('.cardafterclick').requestFullscreen();
    }
    
    let description = this.parentNode.lastElementChild.firstElementChild.textContent;
    let water= this.parentNode.lastElementChild.firstElementChild.nextElementSibling.textContent;
    let sun = this.parentNode.lastElementChild.lastElementChild.previousElementSibling.textContent;
    let tempr = this.parentNode.lastElementChild.lastElementChild.textContent;

    if (originlike.classList.contains('is-active')) {
      document.querySelector('#heartC').classList.add('heartCactive');
    }else if (!originlike.classList.contains('is-active')) {
      document.querySelector('#heartC').classList.remove('heartCactive');
    }

    let style = getComputedStyle(this);
    let bgImageUrl = style['background-image'];
    let cost = this.nextElementSibling.textContent;
    if(this.classList.contains('indoor')){
      document.querySelector('.cardafterclick').style.backgroundColor = '#AEDBCE' ;
    }
    if(this.classList.contains('flower')){
      document.querySelector('.cardafterclick').style.backgroundColor = '#FFDE59' ;
    }
    document.querySelector('.cardafterclickImage').style.backgroundImage = `${bgImageUrl}`;
    document.querySelector('.prName').innerHTML=CardName;
    document.querySelector('.prcost').innerHTML=cost;
    document.querySelector('.productDescription').innerHTML = description;
    document.querySelector('.dopInfotemp').innerHTML = tempr;
    document.querySelector('.dopInfosun').innerHTML = sun;
    document.querySelector('.dopInfowater').innerHTML = water;


    document.body.style.overflow = 'hidden';
    document.querySelector('.container').style.filter = 'blur(15px)';
    document.querySelector('.cardafterclick').style.display='flex';

   document.querySelector('#heartC').onclick = ()=>{

      document.querySelector('#heartC').classList.toggle('heartCactive');

      if ( document.querySelector('#heartC').classList.contains('heartCactive')) {
        origincard.classList.add('likedCard');
        originlike.classList.add('is-active');
      }

      if ( !document.querySelector('#heartC').classList.contains('heartCactive')) {
        origincard.classList.remove('likedCard');
        originlike.classList.remove('is-active');
      }
      
      if (mainCont.classList.contains('likepage')) {
        CheckCard();
      } 
    }

  }

  /*(card clicked) cart function*/

  document.querySelector('.number').innerHTML = '1';
  let countN = document.querySelector('.number').textContent;

  document.querySelector('.plus').onclick = ()=> {
    countN++;
    document.querySelector('.number').innerHTML = countN;
  }
  document.querySelector('.minus').onclick = ()=> {
    if (countN>1) {
      countN--;
      document.querySelector('.number').innerHTML = countN;
    }
  }

  /*close*/

  document.getElementById('close').onclick = ()=>{
    document.querySelector('.container').style.filter = 'none';
    document.body.style.overflow = '';
    document.querySelector('.cardafterclick').style.display='none';
    document.querySelector('.number').innerHTML = '1';
    if (window.innerWidth <= 420) {
      document.exitFullscreen();
    }
  }

  /*filter*/

  let filter  = document.querySelectorAll('.filter-box');

  [].forEach.call(filter, el => {
    el.addEventListener('click', fltrClick, false)
  })

  let indoorCard = document.querySelectorAll('.indoorCard');
  
  let flowerCard = document.querySelectorAll('.flowerCard');

  function fltrClick(){
    [].forEach.call(filter, el => {
    if (el !== this) el.classList.remove('filterActive');
    });

    this.classList.add('filterActive');

    if(this.classList.contains('ALL')  ){
      card.forEach(element => {
        element.style.display='flex';
      });
    }

    if(this.classList.contains('IN')  ){
      indoorCard.forEach(element => {
        element.style.display='flex';
      });

      flowerCard.forEach(element => {
        element.style.display='none';
      });
    }

    if(this.classList.contains('FL')  ){
      indoorCard.forEach(element => {
        element.style.display='none';
      });

      flowerCard.forEach(element => {
        element.style.display='flex';
      });
    }
  }

}














const form = document.querySelector("form");
const search = document.querySelector(".header-search");

form.addEventListener("submit", (e) =>{
  e.preventDefault();
  /*
  const apiSearchUrl = `${URLsearch}${search.value}`

  if (search.value) {
    getMovies(apiSearchUrl)
    search.value = "";
  }
*/
})


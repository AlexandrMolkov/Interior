 "use strict";


function addWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
addWebP(function (support) {
    if (support == true) {
        document.querySelector(`body`).classList.add(`webp`);
    }
    
})


//======================== Burger

const burgers = document.querySelectorAll(`.burg`)


document.addEventListener('click', (e) => {
    
    if(e.target.classList.contains('burg')) {
        const burg = e.target
        burg.classList.toggle(`open`)
        document.querySelector(burg.dataset.target).classList.toggle(`show`)
        if(burg.classList.contains('open')){document.querySelector('.wrapper').style.overflow = "hidden"}
        else {document.querySelector('.wrapper').style.overflow = "visible"}
    } else {
        burgers.forEach(b => {
            document.querySelector(b.dataset.target).classList.remove(`show`)
            b.classList.remove(`open`)
            document.querySelector('.wrapper').style.overflow = "visible"
        })
    }
})

function checkWidth() {
    if(window.innerWidth > 768) {
        burgers.forEach(b => {
            document.querySelector(b.dataset.target).classList.remove(`show`)
            b.classList.remove(`open`) 
        })
        document.querySelector('.wrapper').style.overflow = "visible"
    }
}

    
//========================  accordion
{

    const accordion = document.querySelector('#accordion-1')

    accordion.addEventListener('click', e => {
        
        if(e.target.tagName === 'INPUT') {
            
            for(let inp of accordion.querySelectorAll('input')){
                if (inp != e.target) inp.checked = false
            }
        }
    })
}




class Slider {
    constructor(slider,countOfSlides = 1,sliderLoop = true, slideMinWidth) {

        this.slidesWrapper = document.querySelector(`${slider}`)
        this.slidesField = this.slidesWrapper.querySelector('.slider__slides')
        this.slides =  this.slidesWrapper.querySelectorAll('.slider__slide')

        this.prevBtn = undefined
        this.nextBtn = undefined

        this.total = undefined
        this.current = undefined
        
        this.sliderName = undefined
        this.sliderNames = undefined

        this.countOfSlidesDefault = countOfSlides
        this.countOfSlides = countOfSlides

        this.width = window.getComputedStyle(this.slidesWrapper).width;
        this.slideMinWidth = slideMinWidth
        this.slideIndex = 1;
        this.offset = 0;
        this.loop = sliderLoop;

        this.breakPoints = undefined
    }

    onRes() {
        if(this.width.slice(0, this.width.length - 2) < this.slideMinWidth) {

            this.slidesField.style.marginLeft = (this.width.slice(0, this.width.length - 2) - this.slideMinWidth) /2.5 + "px"

        } else {
            this.slidesField.style.marginLeft = '0px'
        }
        
        

        if (this.breakPoints) {
            
            const keys = Object.keys(this.breakPoints)                  
            const last = keys[keys.length - 1]                               
            let currentIndex = keys.length - 1;

            const watchWidth = (value) => {
                
                if(window.innerWidth < value) {

                    this.countOfSlides = this.breakPoints[keys[currentIndex]];

                    if(currentIndex - 1 > -1) {

                        currentIndex--
                        watchWidth(keys[currentIndex])  
                    }   
                }  else if (window.innerWidth > value) {

                    currentIndex++
                    this.countOfSlides = currentIndex > keys.length - 1 ? this.countOfSlidesDefault : this.breakPoints[keys[currentIndex]];

                }

            }
            watchWidth(last)


            this.width = window.getComputedStyle(this.slidesWrapper).width;
            
            this.slides.forEach(slide=>{
                if((+this.width.slice(0, this.width.length - 2) / this.countOfSlides) > this.slideMinWidth){
                    slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
                }
            })
            
            this.sizeOfSlide = 100 / this.countOfSlides
            this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';

            this.slidesField.style.transform = `translateX(0%)`;
            this.slideIndex = 1

            if (!this.loop){
                this.nextBtn.disabled = false
                this.prevBtn.disabled = true
            }

        } else{
            this.width = window.getComputedStyle(this.slidesWrapper).width;
            
            this.slides.forEach(slide=>{
                if((+this.width.slice(0, this.width.length - 2) / this.countOfSlides) > this.slideMinWidth){
                    slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
                } 
            })

            this.sizeOfSlide = 100 / this.countOfSlides
            this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';
        }

   
        
        this.slides.forEach(slide=>{
            
            slide.style.width = (100 / this.countOfSlides) + '%';
        })

    }

    init() {


        if(this.slideMinWidth) {
            this.slidesField.style.minWidth = this.slideMinWidth * this.slides.length + 'px'

            this.slides.forEach((slide)=>{slide.style.minWidth = this.minWidth + 'px'})
        }

        if (this.total) {
            if (this.slides.length < 10) {
                this.total.textContent = `0${this.slides.length}`
            } else {
                this.total.textContent = this.slides.length;
            }
        }


        if (!this.fixed) {

            this.width = window.getComputedStyle(this.slidesWrapper).width;

            this.slides.forEach(slide=>{
                slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
                
            })

            this.sizeOfSlide = 100 / this.countOfSlides
            this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';

        } else {
            this.slidesField.style.width = (this.fixed * this.slides.length) + 'px';
        }


        this.slides.forEach(slide=>{
            if((+this.width.slice(0, this.width.length - 2) / this.countOfSlides) > this.slideMinWidth){
                slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
            } else {
                slide.style.width = (this.slideMinWidth / this.countOfSlides) + 'px';
                this.slidesField.style.marginLeft = (this.width.slice(0, this.width.length - 2) - this.slideMinWidth) /2.5 + "px"
            }

        })
        
        this.slidesField.style.display = "flex";
        this.slidesField.style.transition = "0.5s all";
        this.slidesWrapper.style.overflow = "hidden";

    }

    initButtons(prevButton,nextButton) {

        this.prevBtn = this.slidesWrapper.querySelector(`${prevButton}`)
        this.nextBtn = this.slidesWrapper.querySelector(`${nextButton}`)

        if(this.loop) {     
    
            this.prevBtn.addEventListener(`click`, () => {
                
                if(this.slideIndex == 1){

                    this.slideIndex = this.slides.length - (this.countOfSlides - 1);
                this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                    
                } else {
                    this.slideIndex--;
                    this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                }
        
                this.slidesField.style.transform = `translateX(-${this.offset}%)`;

                if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
        
                if (this.current) {
                    if (this.slides.length < 10) {
                        this.current.textContent = `0${this.slideIndex}`
                    } else {
                        this.current.textContent = this.slideIndex;
                    }
                }
            }) 

            this.nextBtn.addEventListener(`click`, () => {

                if(this.slideIndex == this.slides.length - (this.countOfSlides - 1)){
                    this.offset = 0;
                    this.slideIndex = 1;
                } else {
                    this.offset = ((100 / this.slides.length) * this.slideIndex).toFixed(3)
                    this.slideIndex++;
                }
            
                this.slidesField.style.transform = `translateX(-${this.offset}%)`;

                if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
            
                if (this.current) {
                    if (this.slides.length < 10) {
                            this.current.textContent = `0${this.slideIndex}`
                    } else {
                            this.current.textContent = this.slideIndex;
                    }
                }

            })


        } else {

            this.prevBtn.addEventListener(`click`, () => {
            
                if(this.slideIndex != 1){
                    this.slideIndex--;
                    this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                    this.nextBtn.disabled = false
                }
                if(this.slideIndex == 1) {
                    this.prevBtn.disabled = true
                } else  this.prevBtn.disabled = false
    
                this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    
                if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
        
                if (this.current) {
                    if (this.slides.length < 10) {
                        this.current.textContent = `0${this.slideIndex}`
                    } else {
                        this.current.textContent = this.slideIndex;
                    }
                }
            })            

            this.nextBtn.addEventListener(`click`, () => {

                this.offset = ((100 / this.slides.length) * this.slideIndex).toFixed(3)
                this.slideIndex++;
                this.prevBtn.disabled = false
    
                if(this.slideIndex == this.slides.length - (this.countOfSlides - 1)) {
                    this.nextBtn.disabled = true
                }
    
                
                this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    
                if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
                
                if (this.current) {
                    if (this.slides.length < 10) {
                        this.current.textContent = `0${this.slideIndex}`
                    } else {
                        this.current.textContent = this.slideIndex;
                    }
                }

            })

        }
    }

    initNav(){
        const navDotsWrapper = document.createElement('ul')
        navDotsWrapper.classList.add('slider__nav')

        let dots = [];

        for(let i = 0; (this.slides.length / this.countOfSlides) > i; i++) {
            const dot = document.createElement('li')
            dot.classList.add('slider__nav-li')

            dots.push(dot)

            dot.setAttribute('data-slidenumber', i + 1)


            if (this.countOfSlides > 1) {

                dot.addEventListener(`click`, (e) => {
            
                    this.slideIndex = e.target.getAttribute('data-slidenumber')

                    dots.forEach((dot)=> dot.classList.remove(`current`))
                    dot.classList.add(`current`)
    
                    /* this.offset = ((100 / (this.slides.length - this.countOfSlides)) * ((this.slideIndex - 1))).toFixed(3) */
                    this.offset = ((100 / (this.slides.length / this.countOfSlides)) * ((this.slideIndex - 1))).toFixed(3)
                    this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    
                })   

            } else {
                dot.addEventListener(`click`, (e) => {
            
                    this.slideIndex = e.target.getAttribute('data-slidenumber')
    
                    dots.forEach((dot)=> dot.classList.remove(`current`))
                    dot.classList.add(`current`)
    
                    this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                    this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    
                })  
            }
            navDotsWrapper.append(dot)
        }

        dots[0].classList.add('current');
        this.slidesWrapper.parentNode.append(navDotsWrapper)

        this.slidesWrapper.parentNode.style.position = 'relative'

        this.pagination = navDotsWrapper
    }

    initText(sliderNameBlock,sliderNames,sliderTextBlock,text){
        this.sliderName = this.slidesWrapper.querySelector(`${sliderNameBlock}`)
        this.sliderNames = sliderNames
    }

    initCounter(curent,total){

        this.total = total ? this.slidesWrapper.querySelector(`${total}`) : undefined
        this.current = curent ? this.slidesWrapper.querySelector(`${curent}`) : undefined

        if (this.total) {
            if (this.slides.length < 10) {
                this.total.textContent = `0${this.slides.length}`
            } else {
                this.total.textContent = this.slides.length;
            }
        }
    }

    initBreakPoints(breakPoints) {
        this.breakPoints = breakPoints
        this.onRes()
    }

    autoAnimation(){
        this.slideIndex = (this.slideIndex + 1) >= (this.slides.length + 1) ? this.slideIndex = 1 : this.slideIndex + 1

        this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
        this.slidesField.style.transform = `translateX(-${this.offset}%)`;
        
       

        for(let p of this.pagination.children){
            console.log(p.dataset.slidenumber === this.slideIndex + 1)
           
            p.classList.remove('current')

            if (p.dataset.slidenumber == this.slideIndex) {
                p.classList.add('current')
            } 

        }

    }
    startAutoAnimation() {

        setInterval(()=> {
            this.autoAnimation()
        },2000)
        
    }
}
 
const slider1 = new Slider('.header__slider',1,true, 768)
slider1.init()
slider1.initNav()
slider1.startAutoAnimation()

const sliderComments = new Slider('#about-slider',3,true)
sliderComments.init()
sliderComments.initNav()
/* sliderComments.startAutoAnimation() */

window.onresize = function() {
    slider1.onRes()
    sliderComments.onRes()

    checkWidth() 
}

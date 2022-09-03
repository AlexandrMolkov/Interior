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


//============================================================ Burger



{

    const burgers = document.querySelectorAll(`.burg`)
    
    burgers.forEach(function(elem) {
        elem.addEventListener('click', (e)=>{
            const burg = e.target
            
            //element.preventDefault();
            burg.classList.toggle(`open`)
            burg.nextElementSibling.classList.toggle(`show`)
            if(burg.classList.contains(`open`) && !burg.nextElementSibling.classList.contains(`navigation_pos_static`)){
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "auto"
            }
    
        })
    })
    
    }






    
    
    
    
    
    



    class Slider {
        constructor(slider,slidesContainer,slidesAll,sliderNameBlock,sliderNames,totalBlock,currentBlock,prevButton,nextButton,countOfSlides = 1,countOfSlides768,sliderLoop = true,fixed = false) {
    
            this.slidesWrapper = document.querySelector(`${slider}`)
            this.slides =  this.slidesWrapper.querySelectorAll(`${slidesAll}`)
            this.prevBtn = prevButton ? this.slidesWrapper.querySelector(`${prevButton}`) : undefined
            this.nextBtn = nextButton ? this.slidesWrapper.querySelector(`${nextButton}`): undefined
            this.total = totalBlock ? this.slidesWrapper.querySelector(`${totalBlock}`) : undefined
            this.sliderName = sliderNameBlock ? this.slidesWrapper.querySelector(`${sliderNameBlock}`) : undefined
            this.current = currentBlock ? this.slidesWrapper.querySelector(`${currentBlock}`) : undefined
            this.slidesField = this.slidesWrapper.querySelector(`${slidesContainer}`)
    
            this.sliderNames = sliderNames
            this.countOfSlides = countOfSlides
            this.countOfSlidesDefault = this.countOfSlides
            this.countOfSlides768 = countOfSlides768
    
            this.width = window.getComputedStyle(this.slidesWrapper).width;
            this.slideIndex = 1;
            this.offset = 0;
            this.loop = sliderLoop;
            this.fixed = fixed
        }
    
        onRes() {
    
            if (!this.fixed) {
    
                if(this.countOfSlides768 && window.innerWidth <= 768) {
    
                    this.countOfSlides = this.countOfSlides768;
                }
                if(this.countOfSlides768 && window.innerWidth > 768) {
                    
                    this.countOfSlides = this.countOfSlidesDefault;
                } 
    
    
                this.slides.forEach(slide=>{
                    slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
                    
                })
    
                this.sizeOfSlide = 100 / this.countOfSlides
                this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';
    
    
                this.width = window.getComputedStyle(this.slidesWrapper).width;
                this.slides.forEach(slide=>{
                    slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
                })
    
                this.slidesField.style.transform = `translateX(0%)`;
                this.slideIndex = 1
    
                if (!this.loop){
                    this.nextBtn.disabled = false
                    this.prevBtn.disabled = true
                }
    
            }  
        }
    
    
    
    
        init() {
    
            if (this.total) {
                if (this.slides.length < 10) {
                    this.total.textContent = `0${this.slides.length}`
                } else {
                    this.total.textContent = this.slides.length;
                }
            }
    
    
            if (!this.fixed) {
    
                if(this.countOfSlides768 && window.innerWidth <= 768) {
    
                    this.countOfSlides = this.countOfSlides768;
                }
                if(this.countOfSlides768 && window.innerWidth > 768) {
                    
                    this.countOfSlides = this.countOfSlidesDefault;
                } 
    
                this.width = window.getComputedStyle(this.slidesWrapper).width;
    
                this.slides.forEach(slide=>{
                    slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
                    
                })
    
                this.sizeOfSlide = 100 / this.countOfSlides
                this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';
    
            } else {
                this.slidesField.style.width = (this.fixed * this.slides.length) + 'px';
            }
    
            
            this.slidesField.style.display = "flex";
            this.slidesField.style.transition = "0.5s all";
            this.slidesWrapper.style.overflow = "hidden";
            
        
/*             if(this.loop) {     
      
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
    
            } */
        
    
        }
    }
    
    
/* new Slider('.slider','.slider__slides','.slider__slide','','','','','','',1,false,true,1920).init()  */ 
    
new Slider('.slider','.slider__slides','.slider__slide','','','','','','',1,false,true).init() 
    
    
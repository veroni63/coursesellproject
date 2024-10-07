

AOS.init();
$(document).ready(function(){
  $(".counter").counterUp({
  delay:20,  
  time:2000
  })})
var owl = $('.owl');
owl.owlCarousel({
    items:1,
    loop:true,
    margin:5,
    autoplay:true,
    autoplayTimeout:3000,

});
var owl1 = $('.owl1');
owl1.owlCarousel({
    items:3,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:3000,
    responsive : {
      // breakpoint from 0 up
      0 : {
        items:1,
      },
      // breakpoint from 480 up
      480 : {
        items:1,
      },
      // breakpoint from 768 up
      768 : {
        items:2,
      },
      991 : {
        items:3,
      }
  }

});





const swiper = new Swiper('.swiper', {
    // Default parameters
    slidesPerView: 3,
    spaceBetween: 10,
    autoplay:{
        delay:2000,
        disableOnInteraction:false,
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
    
    
      // when window width is >= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 40
      },
      720:{
        slidesPerView: 1,
        spaceBetween: 40
      },
      992:{
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  })

 
// const swiper1 = new Swiper('.swiper1', {

//     slidesPerView: "auto",
//     spaceBetween: 200,
//     autoplay:{
//         delay:3500,
   
//     },


//   });
    
 


 // let isAddingText = false;

    // addTextLink.addEventListener('click', function () {
    //   isAddingText = !isAddingText; // Toggle the adding text mode
    
    //   if (isAddingText) {
    //     const input = document.createElement('input');
    //     input.type = 'text';
    //     input.placeholder = 'Enter text';
    //     input.style.position = 'static';
    //     input.style.left = '0';
    //     input.style.top = '0';
    //     document.body.appendChild(input);
    
    //     // Set focus on the input for user convenience
    //     input.focus();
    
    //     input.addEventListener('blur', function () {
    //       // When the input loses focus, add the text to the canvas
    //       const text = input.value;
    //       document.body.removeChild(input);
    
    //       if (text) {
    //         const x = input.offsetLeft;
    //         const y = input.offsetTop;
    
    //         context.font = '20px Arial'; // Set the font size and type
    //         context.fillStyle = 'black'; // Set the text color
    //         context.fillText(text, x, y); // Draw the text at the specified position
    //       }
    //     });
    //   }
    // });
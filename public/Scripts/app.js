//IIFE Immediately Invoked Function Expression

(function(){

      function Start(){
           console.log("Express App started.............");
           const contactCloseBtn = document.getElementById('closeButton');
           contactCloseBtn.addEventListener('click', (event) => {
           
               event.preventDefault();
               window.location.assign('/home');


            



         });
      }

     window.addEventListener("load",Start);
})();
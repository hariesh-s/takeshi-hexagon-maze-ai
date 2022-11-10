const instructions_btn = document.querySelector(".instructions-btn")
const modal_wrapper = document.querySelector(".modal-wrapper");
const bg = document.querySelector('main');
const modal_close = document.querySelector(".modal-footer > button")

instructions_btn.addEventListener('click', () => {
   modal_wrapper.style.visibility = "visible";
   modal_wrapper.style.opacity = 1;
   bg.style.filter = "blur(8px)";
})

modal_close.addEventListener('click', () => {
   modal_wrapper.style.visibility = "hidden";
   modal_wrapper.style.opacity = 0;
   bg.style.filter = "none";
})

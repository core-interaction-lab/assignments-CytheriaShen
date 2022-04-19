window.addEventListener('scroll', ()=> {
  let content = document.querySelector('.row');
  let contentPosition = content.getBoundingClientRect().top;
  let screenPosition = window.innerHeight;
  if(contentPosition < screenPosition){
      content.classList.add('active');
  }
});

window.onscroll = function () {
  scrollRotate();
};

function scrollRotate() {
  let image = document.getElementById("reload");
  image.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
  
}


window.onscroll = function () {
  scrollRotate();
};

function scrollRotate() {
  let image = document.getElementById("reload");
  image.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
  
}

function scrollRotate() {
  let image = document.getElementById("reload-2");
  image.style.transform = "rotate(-" + window.pageYOffset/2 + "deg)";
  
}





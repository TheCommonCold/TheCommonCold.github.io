function showMenu() {
    var x = document.getElementsByClassName("links")[0];
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  function hideMenu(){
    var x = document.getElementsByClassName("links")[0];
    x.style.display = "none";
  }

// Open the Modal
function openModal(which) {
    document.getElementById(which).style.display = "block";
  }
  
  // Close the Modal
  function closeModal(which) {
    document.getElementById(which).style.display = "none";
  }
  

  
  // Next/previous controls
  function plusSlides(n,which) {
    showSlides(slideIndex += n,which);
  }
  
  // Thumbnail image controls
  function currentSlide(n,which) {
    showSlides(slideIndex = n,which);
  }
  
  function showSlides(n,which) {
    var i;
    var slides = document.getElementsByClassName("slides-"+which);
    var dots = document.getElementsByClassName("image-"+which);
    var captionText = document.getElementById("caption-"+which);
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }
// Initialize a variable named slideIndex and set its value to 0
let slideIndex = 0;

// Call the function showSlides() to start the slideshow
showSlides();

// Define a function named showSlides
function showSlides() {
  // Initialize a variable i
  let i;
  
  // Get all elements with class name "mySlides" and store them in the variable slides
  let slides = document.getElementsByClassName("mySlides");

  // Get all elements with class name "dot" and store them in the variable dots
  let dots = document.getElementsByClassName("dot");

  // Loop through all elements with class name "mySlides"
  for (i = 0; i < slides.length; i++) {
    // Set the display style of the current element to "none" (hide it)
    slides[i].style.display = "none";  
  }

  // Increment the slideIndex
  slideIndex++;

  // If slideIndex is greater than the number of slides, reset it to 1
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }    

  // Loop through all elements with class name "dot"
  for (i = 0; i < dots.length; i++) {
    // Remove the "active" class from the current element's className
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Set the display style of the current slide to "block" (show it)
  slides[slideIndex-1].style.display = "block";  

  // Add the "active" class to the current dot
  dots[slideIndex-1].className += " active";

  // Set a timeout to call the showSlides function again after 2000 milliseconds (2 seconds)
  setTimeout(showSlides, 2000); 
}

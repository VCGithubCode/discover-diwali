/**
 * Generates a starry night sky effect on the website.
 * @description
 * This script creates a starry night sky effect on the website by generating
 * multiple div elements with a class of "star" and appending them to the
 * document fragment. The position of each star is determined by the
 * Math.random() function, which is used to generate a random number between
 * 0 and 1. This number is then used to calculate the top and left CSS
 * properties of the star element. The animation is also random, with a
 * duration of between 3 and 5 seconds, and a negative delay of up to 2
 * seconds.
 */
document.addEventListener("DOMContentLoaded", function() {
  /**
   * The stage element is the container for all the stars.
   * @type {HTMLElement}
   */
  const starStage = document.getElementById('star-stage');
  
  /**
   * A document fragment is used to create a temporary container for all the
   * stars. This allows us to append all the stars to the document fragment
   * first, and then append the fragment to the stage element in a single
   * DOM update. This is more efficient than appending each star to the stage
   * element individually.
   * @type {DocumentFragment}
   */
  const fragment = document.createDocumentFragment();
  
  /**
   * The number of stars to be generated.
   * @type {number}
   */
  const starCount = 500;
  
  // Create stars in a document fragment
  for (let i = 1; i <= starCount; i++) {
      /**
       * Create a star element and add it to the fragment.
       * @type {HTMLElement}
       */
      const star = document.createElement('div');
      star.className = `star star-${i}`;
      star.style.cssText = `
          top: ${Math.random() * 100}vh;
          left: ${Math.random() * 100}vw;
          animation: ${(Math.random() * 2 + 3).toFixed(1)}s flicker ${(Math.random() * -2).toFixed(1)}s infinite;
      `;
      fragment.appendChild(star);
  }
  
  // Single DOM update
  starStage.appendChild(fragment);
});

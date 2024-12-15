module.exports = {
    content: ['./templates/**/*.html', './static/js/**/*.js'], // Files to scan for classes
    css: ['./static/css/styles.css'], // The CSS file to be cleaned
    safelist: [ // Classes you want to always keep
      'active', 
      'open', 
      'btn-primary', 
      'btn-secondary',
      'modal', 
      'show',
    ],
    output: './static/css/' // Folder to store the cleaned styles.css
  };  
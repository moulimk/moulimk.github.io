document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

var typed = new Typed('.auto-type', {
  strings: ['Break', 'Fix', 'Create', 'Hack', 'Secure', 'Analyze', 'Develop'],
  typeSpeed: 50,
  loop: true,
});

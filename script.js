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
  
  // Auto-scroll from hero section on first downward scroll
  const hero = document.querySelector('.hero');
  let hasScrolled = false;
  
  hero.addEventListener('wheel', function(e) {
    if (e.deltaY > 0 && !hasScrolled) {
      hasScrolled = true;
      document.querySelector('#myworks').scrollIntoView({
        behavior: 'smooth'
      });
    }
  });


  
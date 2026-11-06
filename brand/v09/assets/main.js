
(function(){
  document.querySelectorAll('[data-copy]').forEach(function(el){
    el.addEventListener('click',function(){
      var v=el.getAttribute('data-copy');
      if(navigator.clipboard){navigator.clipboard.writeText(v).catch(function(){});}
      el.classList.add('copied');setTimeout(function(){el.classList.remove('copied')},900);
    });
  });
  var links=[].slice.call(document.querySelectorAll('.top nav a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
    document.querySelectorAll('section[id]').forEach(function(s){io.observe(s)});
  }
})();

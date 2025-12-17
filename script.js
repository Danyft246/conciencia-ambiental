(function(){
  var cards = Array.prototype.slice.call(document.querySelectorAll("#ca-project-cards .ca-card"));
  var ioOptions = {root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.08};
  var handleIntersect = function(entries, observer){
    entries.forEach(function(entry){
      var el = entry.target;
      if(entry.isIntersecting){
        el.classList.add("in-view");
        observer.unobserve(el);
      }
    });
  };
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(handleIntersect, ioOptions);
    cards.forEach(function(c){ io.observe(c); });
  } else {
    cards.forEach(function(c){ c.classList.add("in-view"); });
  }

  function sanitizeImages(){
    var imgContainers = document.querySelectorAll("#ca-project-cards .ca-card-image");
    imgContainers.forEach(function(cont){
      var img = cont.querySelector("img");
      if(!img){
        cont.classList.add("ca-noimg");
        return;
      }
      if(!img.getAttribute("src") || img.getAttribute("src").trim() === ""){
        cont.classList.add("ca-noimg");
        return;
      }
      img.addEventListener("error", function(){
        cont.classList.add("ca-noimg");
      });
      if(img.complete){
        if(typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0){
          cont.classList.add("ca-noimg");
        }
      } else {
        img.addEventListener("load", function(){
          if(img.naturalWidth === 0){ cont.classList.add("ca-noimg"); }
        });
      }
    });
  }

  sanitizeImages();
  window.addEventListener("load", sanitizeImages);
  window.addEventListener("resize", function(){});
})();

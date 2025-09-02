// Saudações dinâmicas
(function setGreeting(){
  const h = new Date().getHours();
  const greet = document.getElementById("greet");
  if(!greet) return;
  let text = "Olá";
  if(h < 12) text = "Bom dia";
  else if(h < 18) text = "Boa tarde";
  else text = "Boa noite";
  greet.textContent = text;
})();

// Controles de carrossel (setas)
document.querySelectorAll(".row-controls").forEach(ctrl=>{
  const id = ctrl.getAttribute("data-row");
  const track = document.getElementById(id);
  if(!track) return;

  const left = ctrl.querySelector(".left");
  const right = ctrl.querySelector(".right");

  const step = () => Math.max(300, track.clientWidth * 0.6);

  left.addEventListener("click",()=> track.scrollBy({left: -step(), behavior:"smooth"}));
  right.addEventListener("click",()=> track.scrollBy({left: step(), behavior:"smooth"}));
});

// Scroll por arrastar para desktop
document.querySelectorAll(".cards").forEach(track=>{
  let isDown=false,startX,scrollLeft;
  track.addEventListener("mousedown",(e)=>{
    isDown=true; track.classList.add("grab");
    startX=e.pageX - track.offsetLeft; scrollLeft=track.scrollLeft;
  });
  track.addEventListener("mouseleave",()=>{isDown=false; track.classList.remove("grab")});
  track.addEventListener("mouseup",()=>{isDown=false; track.classList.remove("grab")});
  track.addEventListener("mousemove",(e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });
});

// Acessibilidade: setas do teclado para última linha focada
let lastTrackInFocus = null;
document.querySelectorAll(".cards").forEach(track=>{
  track.tabIndex = 0;
  track.addEventListener("focus",()=> lastTrackInFocus = track);
});
window.addEventListener("keydown",(e)=>{
  if(!lastTrackInFocus) return;
  if(e.key === "ArrowRight"){
    lastTrackInFocus.scrollBy({left: 280, behavior:"smooth"});
  } else if(e.key === "ArrowLeft"){
    lastTrackInFocus.scrollBy({left: -280, behavior:"smooth"});
  }
});

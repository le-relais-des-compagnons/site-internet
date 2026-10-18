// Affiche le bouton de retour en haut après un peu de défilement.
(function(){
  const bouton=document.querySelector('.back-to-top');
  if(!bouton)return;
  const actualiser=()=>bouton.classList.toggle('visible',window.scrollY>280);
  window.addEventListener('scroll',actualiser,{passive:true});
  actualiser();
})();

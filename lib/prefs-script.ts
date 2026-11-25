/**
 * Roda no <head> antes do primeiro paint: aplica tema e preferência de movimento
 * sem flash. Também marca <html class="js"> — sem JS, nenhum estado inicial de
 * animação é aplicado e a página está completa.
 */
export const prefsScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;var m=localStorage.getItem('motion');if(m==='reduced'||(m!=='full'&&matchMedia('(prefers-reduced-motion: reduce)').matches)){d.dataset.motion='reduced'}else{d.dataset.motion='full'}}catch(e){}})();`;

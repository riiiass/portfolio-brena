/**
 * Roda no <head> antes do primeiro paint: aplica tema, preferência de movimento e
 * decide se a intro aparece (só na 1ª visita da sessão, nunca com reduced motion).
 * Marca <html class="js"> — sem JS nenhum estado inicial de animação é aplicado
 * e a página está completa.
 */
export const prefsScript = `(function(){try{var d=document.documentElement;d.classList.add('js');if(location.pathname==='/en'||location.pathname.indexOf('/en/')===0)d.lang='en';var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;var m=localStorage.getItem('motion');var r=m==='reduced'||(m!=='full'&&matchMedia('(prefers-reduced-motion: reduce)').matches);d.dataset.motion=r?'reduced':'full';var seen=sessionStorage.getItem('intro-seen');if(r||seen||(location.pathname!=='/'&&location.pathname!=='/en')){d.dataset.intro='skip';d.dataset.hero='go'}}catch(e){document.documentElement.dataset.intro='skip';document.documentElement.dataset.hero='go'}})();`;

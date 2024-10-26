import{a as u,i as l,S as m}from"./assets/vendor-Qob_5Ba8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const p="19197868-48df692c0a14d7fda4172233f";u.defaults.baseURL="https://pixabay.com/api";class f{constructor(){this.searchQuery=""}async fetchPictures(){const{data:s}=await u.get(`/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&safesearch=true&key=${p}`);if(s.total===0)throw"Images not found";return this.page+=1,s.hits}get query(){return this.searchQuery}set query(s){this.searchQuery=s}}function y(t){const{webformatURL:s,largeImageURL:i,likes:a,views:e,comments:r,downloads:o,tags:d}=t;return`<li class="photo-card">
    <a class="gallery__link" href="${i}">
      <img class="images" src="${s}" alt="${d}" height="200" />
    </a>
    <div class="stats">
        <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${a}
        </p>
        <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${e}
        </p>
        <p class="stats-item">
            <i class="material-icons">comment</i>
            ${r}
        </p>
        <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${o}
        </p>
    </div>
</li>`}const n={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),galleryItem:document.querySelector(".photo-card")};n.searchForm.addEventListener("submit",g);n.gallery.addEventListener("click",h);function h(t){t.target.nodeName}const c=new f;function g(t){if(t.preventDefault(),v(),c.query=t.currentTarget.elements.query.value.trim(),console.log("picturesApiService.query : ",c.query),c.query===""){l.show({title:"Error",message:"Please enter text!",position:"topCenter",color:"red"});return}w()}function q(t){const s=t.map(i=>y(i));n.gallery.insertAdjacentHTML("beforeend",s.join("")),new m(".gallery a",{caption:!0,captionsData:"alt",captionDelay:250})}function v(){n.gallery.innerHTML=""}async function w(){try{const t=await c.fetchPictures();q(t)}catch(t){L(t)}}function L(t){if(t==="Images not found"){l.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter",color:"red"});return}l.show({title:"Error",message:"Error! Failed to upload images",position:"topCenter",color:"red"})}
//# sourceMappingURL=index.js.map

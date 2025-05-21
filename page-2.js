import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{a as h,i as a}from"./assets/vendor-DSJL_ovD.js";const p="50302681-206249c251fc1642a903456bf",f="https://pixabay.com/api/",u=40;async function d(e,t=1){const o={key:p,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:u};try{return(await h.get(f,{params:o})).data}catch(l){throw console.error("Error fetching images:",l),l}}const y=document.getElementById("search-form"),i=document.querySelector(".gallery"),w=document.getElementById("load-more-container"),E=document.getElementById("load-more"),L=document.getElementById("loader");let r="",n=1,m=0;y.addEventListener("submit",async e=>{if(e.preventDefault(),r=e.target.searchQuery.value.trim(),!r){a.warning({message:"Please enter a search term.",position:"topRight"});return}n=1,i.innerHTML="",c(!1),s(!0);try{const t=await d(r,n);if(m=t.totalHits,t.hits.length===0){a.info({message:"No images found.",position:"topRight"}),s(!1);return}g(t.hits),c(t.totalHits>40)}catch{a.error({message:"Failed to load images.",position:"topRight"})}finally{s(!1)}});E.addEventListener("click",async()=>{n+=1,s(!0);try{const e=await d(r,n);g(e.hits),v(),i.querySelectorAll(".photo-card").length>=m&&(c(!1),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({message:"Failed to load more images.",position:"topRight"})}finally{s(!1)}});function g(e){const t=e.map(o=>`
    <div class="photo-card">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
      </a>
      <div class="info">
        <span>Likes: ${o.likes}</span>
        <span>Views: ${o.views}</span>
        <span>Comments: ${o.comments}</span>
        <span>Downloads: ${o.downloads}</span>
      </div>
    </div>
  `).join("");i.insertAdjacentHTML("beforeend",t)}function c(e){w.classList.toggle("hidden",!e)}function s(e){L.classList.toggle("hidden",!e)}function v(){const{height:e}=i.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=page-2.js.map

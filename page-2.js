import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{a as p,S as f,i as a}from"./assets/vendor-DFCQGEf1.js";const u="50302681-206249c251fc1642a903456bf",y="https://pixabay.com/api/",w=40;async function h(e,t=1){const o={key:u,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:w};try{return(await p.get(y,{params:o})).data}catch(c){throw console.error("Error fetching images:",c),c}}const E=document.getElementById("search-form"),l=document.querySelector(".gallery"),g=document.getElementById("load-more"),L=document.getElementById("loader");let s="",n=1,d=0;const R=40,v=new f(".gallery a",{captionsData:"alt",captionDelay:250});E.addEventListener("submit",async e=>{if(e.preventDefault(),s=e.target.searchQuery.value.trim(),!s){a.warning({message:"Please enter a search term.",position:"topRight"});return}n=1,l.innerHTML="",r(!1),i(!0);try{const t=await h(s,n);if(d=t.totalHits,t.hits.length===0){a.info({message:"No images found.",position:"topRight"});return}m(t.hits),d>R?r(!0):r(!1)}catch{a.error({message:"Failed to load images.",position:"topRight"})}finally{i(!1)}});g.addEventListener("click",async()=>{n+=1,i(!0);try{const e=await h(s,n);m(e.hits),b(),l.querySelectorAll(".photo-card").length>=d&&(r(!1),a.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"}))}catch{a.error({message:"Failed to load more images.",position:"topRight"})}finally{i(!1)}});function m(e){const t=e.map(o=>`
      <div class="photo-card">
        <a href="${o.largeImageURL}">
          <img src="${o.webformatURL}" alt="${o.tags}"/>
        </a>
        <div class="info">
          <span>Likes: ${o.likes}</span>
          <span>Views: ${o.views}</span>
          <span>Comments: ${o.comments}</span>
          <span>Downloads: ${o.downloads}</span>
        </div>
      </div>
    `).join("");l.insertAdjacentHTML("beforeend",t),v.refresh()}function r(e){g.classList.toggle("hidden",!e)}function i(e){L.classList.toggle("hidden",!e)}function b(){var t;const{height:e}=((t=l.firstElementChild)==null?void 0:t.getBoundingClientRect())||{height:0};window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=page-2.js.map

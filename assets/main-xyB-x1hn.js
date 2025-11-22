var Q=Object.defineProperty;var O=t=>{throw TypeError(t)};var J=(t,e,r)=>e in t?Q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var A=(t,e,r)=>J(t,typeof e!="symbol"?e+"":e,r),W=(t,e,r)=>e.has(t)||O("Cannot "+r);var H=(t,e,r)=>e.has(t)?O("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r);var _=(t,e,r)=>(W(t,e,"access private method"),r);import{a as q,i as x}from"./vendor-CVmyF-gC.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const V=()=>{const t=document.querySelector("#mobile-menu-btn"),e=document.querySelector("#header-mobile-menu"),r=document.querySelector(".header-nav"),n=document.querySelector(".header-socials"),s=e.querySelectorAll(".header-socials-link"),o=globalThis.matchMedia("(max-width: 768px)");function a(){t.setAttribute("aria-expanded","true"),e.dataset.expanded="true"}function c(){t.setAttribute("aria-expanded","false"),e.dataset.expanded="false"}function y(){t.classList.remove("visually-hidden"),r.classList.add("visually-hidden"),n.classList.add("visually-hidden")}function d(){t.classList.add("visually-hidden"),r.classList.remove("visually-hidden"),n.classList.remove("visually-hidden"),c()}function p(){var v,S,T,E;const m=globalThis.location.pathname.includes("favorites");(v=document.querySelector("#nav-desktop-home"))==null||v.classList.toggle("nav-active",!m),(S=document.querySelector("#nav-desktop-favorites"))==null||S.classList.toggle("nav-active",m),(T=document.querySelector("#nav-mobile-home"))==null||T.classList.toggle("nav-active",!m),(E=document.querySelector("#nav-mobile-favorites"))==null||E.classList.toggle("nav-active",m)}function u(m){m.matches?y():d()}t.addEventListener("click",()=>{t.getAttribute("aria-expanded")==="true"?c():a()}),s.forEach(m=>{m.addEventListener("click",c)}),document.addEventListener("keydown",m=>{m.key==="Escape"&&e.getAttribute("aria-expanded")==="true"&&c()}),document.addEventListener("DOMContentLoaded",()=>{p()}),u(o),o.addEventListener("change",u)};var g,D,M,b;class Z{constructor(e){H(this,g);A(this,"PAGE_DEFAULT",1);A(this,"LIMIT_DEFAULT",10);this.client=q.create({baseURL:e,headers:{"Content-Type":"application/json"}})}async getExercisesByFilters(e={}){const{page:r,limit:n,...s}=e,o={..._(this,g,D).call(this,s),page:_(this,g,b).call(this,r,this.PAGE_DEFAULT),limit:_(this,g,b).call(this,n,this.LIMIT_DEFAULT)};try{return(await this.client.get("exercises",{params:o})).data}catch(a){throw new Error(a.response.data.message)}}async getExercisesById(e=""){if(!_(this,g,M).call(this,e))return{};try{return(await this.client.get(`exercises/${e}`)).data}catch(n){throw new Error(n.response.data.message)}}async getFiltersOfExercises(e={}){const{filter:r,page:n,limit:s}=e;console.log(r);const o={filter:_(this,g,M).call(this,r),page:_(this,g,b).call(this,n,this.PAGE_DEFAULT),limit:_(this,g,b).call(this,s,this.LIMIT_DEFAULT)};try{const a=await this.client.get("filters",{params:o});return console.log(a),a.data}catch(a){throw new Error(a.response.data.message)}}async getQuote(){return(await this.client.get("quote")).data}async subscribe(e=""){try{return(await this.client.post("subscription",{email:e})).data}catch(r){throw new Error(r.response.data.message)}}}g=new WeakSet,D=function(e={}){return Object.fromEntries(Object.entries(e).map(([r,n])=>[r,_(this,g,M).call(this,n)]).filter(([r,n])=>n!==void 0))},M=function(e=""){if(typeof e!="string")return;const r=e.trim();return r.length?r:void 0},b=function(e,r){const n=Number(e);return Number.isFinite(n)?n:r};const w=new Z("https://your-energy.b.goit.study/api/"),Y=()=>{const t="A lot of times I find that people who are blessed with the most talent don't ever develop that attitude, and the ones who aren't blessed in that way are the most competitive and have the biggest heart.",e="Tom Brady";document.addEventListener("DOMContentLoaded",async()=>{const r=new Date().toISOString().slice(0,10),n=JSON.parse(localStorage.getItem("dailyQuote"));if(n&&n.date===r){document.getElementById("quote-text").textContent=n.quote,document.getElementById("quote-author").textContent=n.author;return}try{const{quote:s,author:o}=await w.getQuote();document.getElementById("quote-text").textContent=s,document.getElementById("quote-author").textContent=o,localStorage.setItem("dailyQuote",JSON.stringify({quote:s,author:o,date:r}))}catch(s){console.error("Error loading quote:",s),document.getElementById("quote-text").textContent=t,document.getElementById("quote-author").textContent=e}})},X="https://your-energy.b.goit.study/api";function R(t,e){const{name:r,imgURL:n}=t;return`<li class="categories-item">
            <button
               class="category-card"
               data-name="${r}"
               aria-label="Category ${r}">

                <div class="card-image-wrapper">
                    <img src="${n}" alt="${r}">
                    <div class="card-overlay"></div>
                </div>

                <div class="card-content">
                    <h3 class="category-title">${r}</h3>
                    <p class='category-filter'>${e}</p>
                </div>
            </button>
        </li>`}async function $(t="muscles",e){const s=`${X}/filters?page=1&limit=12`;console.log(`[FETCH] Виконується запит за URL: ${s}`);try{if(!e){console.error("[ERROR] categoriesContainer is undefined. Rendering stopped.");return}e.innerHTML='<p class="loading-message">Loading...</p>';const o=await fetch(s);if(!o.ok)throw new Error(`Error: ${o.status}. Can't load categories.`);const a=await o.json(),c=Array.isArray(a)?a:a.results;if(!Array.isArray(c)||c.length===0){e.innerHTML='<p class="error-message">No Category found.</p>';return}const y=c.map(d=>R(d,t)).join("");e.innerHTML=y,console.log(`[SUCCESS] Успішно відмальовано ${c.length} категорій.`)}catch(o){const a=o instanceof Error?o.message:"Невідома помилка";console.error("[ERROR] Виникла несподівана помилка:",a),e&&(e.innerHTML=`<p class="error-message">Error in loading: ${a}</p>`)}}function U(t){const{id:e,isHomePage:r,rating:n,name:s,burnedCalories:o,time:a,bodyPart:c,target:y}=t;return`
  <li class="exercise-card" data-id="${e}">
    <div class="exercise-card__header">
      <div class="exercise-card__workout-and-rating">
        <div class="exercise-card__workout">
          <span class="exercise-card__workout__text">WORKOUT</span>
        </div>
        ${ee(r,n)}
      </div>
      <button class="exercise-card__start">
        <span class="exercise-card__start__text">Start</span>
        <svg class="exercise-card__start__icon" width="16" height="16">
          <use href="./img/icons.svg#icon-arrow-black"></use>
        </svg>
      </button>
    </div>
    <div class="exercise-card__body">
      <div class="exercise-card__icon-runner__container">
        <svg class="exercise-card__icon-runner" width="16" height="16">
          <use href="./img/icons.svg#icon-runner"></use>
        </svg>
      </div>
      <p class="exercise-card__title">
        ${s}
      </p>
    </div>
    <ul class="exercise-card__footer__list">
      <li class="exercise-card__footer__item">
        <span
          class="exercise-card__footer__text exercise-card__footer__text__key"
          >Burned calories:</span
        ><span
          class="exercise-card__footer__text exercise-card__footer__text__value"
          >${o} / ${a} min</span
        >
      </li>
      <li class="exercise-card__footer__item">
        <span
          class="exercise-card__footer__text exercise-card__footer__text__key"
          >Body part:</span
        ><span
          class="exercise-card__footer__text exercise-card__footer__text__value"
          >${c}</span
        >
      </li>
      <li class="exercise-card__footer__item">
        <span
          class="exercise-card__footer__text exercise-card__footer__text__key"
          >Target:</span
        ><span
          class="exercise-card__footer__text exercise-card__footer__text__value"
          >${y}</span
        >
      </li>
    </ul>
  </li>
  `}function ee(t,e){return t?`<div class="exercise-card__rating">
          <span class="exercise-card__rating__number">${e}</span>
          <svg width="13" height="13">
            <use fill="#EEA10C" href="./img/icons.svg#icon-star"></use>
          </svg>
        </div>`:`<svg class="exercise-card__trash-icon" width="16" height="16">
          <use href="./img/icons.svg#icon-trash"></use>
        </svg>`}const te=()=>{const t=document.getElementById("filters"),e=document.getElementById("filtersGrid"),r=document.getElementById("selectedSubcategory"),n=document.getElementById("searchContainer"),s=document.getElementById("searchInput"),o=document.querySelector(".search-icon"),a=document.querySelector(".exercises-title");let c="Muscles",y=[],d=[],p="";$(c.toLowerCase(),e);function u(i){return i?i[0].toUpperCase()+i.slice(1):""}function m(i){document.querySelectorAll(".filter-btn").forEach(l=>l.classList.remove("filter-btn--active")),i.classList.add("filter-btn--active")}async function v(i){try{y=await(await w.getFiltersOfExercises({filter:i,page:1,limit:12})).results||[],S(await y,i)}catch(l){console.error("Error loading filters:",l),e.innerHTML="<p>Не вдалося завантажити фільтри</p>"}}function S(i,l){if(!i.length){e.innerHTML="<p>Немає категорій</p>";return}e.innerHTML=i.map(f=>R(f,l)).join("")}async function T(i,l){const f={page:1,limit:12};i==="Body parts"?f.bodypart=l:i==="Muscles"?f.target=l:i==="Equipment"&&(f.equipment=l);try{d=await(await w.getExercisesByFilters(f)).results||[],E(d)}catch(I){console.error("Error loading exercises:",I),e.innerHTML="<p>Не вдалося завантажити вправи</p>"}}function E(i){if(!i.length){e.innerHTML="<p>Немає вправ для цієї категорії</p>";return}e.innerHTML=i.map(l=>U({isHomePage:!0,id:l._id,...l})).join("")}function C(){const i=s.value.toLowerCase().trim();if(!i){E(d);return}const l=d.filter(f=>(f.name||"").toLowerCase().includes(i));E(l)}t.addEventListener("click",async i=>{const l=i.target.closest(".filter-btn");if(!l)return;const f=l.dataset.filter;!f||f===c||(c=f,m(l),r.textContent="",p="",n.hidden=!0,s.value="",d=[],v(c))}),e.addEventListener("click",async i=>{const l=i.target.closest(".category-card");if(!l)return;const f=l.dataset.name,I=u(f);p=f,r.textContent=I,n.hidden=!1,s.value="",await T(c,p)}),s.addEventListener("input",C),s.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),C())}),o&&o.addEventListener("click",C),document.addEventListener("DOMContentLoaded",()=>{$(c.toLowerCase(),e)}),a.addEventListener("click",async()=>{c="muscles",document.querySelectorAll(".filter-btn").forEach(l=>l.classList.remove("filter-btn--active"));const i=document.querySelector('[data-filter="Muscles"]');i&&i.classList.add("filter-btn--active"),p="",r.textContent="",s.value="",n.hidden=!0,d=[],await v("muscles")})},re=()=>{q.defaults.baseURL="https://your-energy.b.goit.study/api";const t=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function e(n,s){x.show({title:n==="success"?"Success":"Error",message:s,position:"center",color:n==="success"?"green":"red",timeout:4e3,pauseOnHover:!0,closeOnClick:!0})}async function r(n){var s,o,a;try{const{data:c}=await q.post("/subscription",{email:n});e("success",c.message||"Subscription created!")}catch(c){if(((s=c.response)==null?void 0:s.status)===409)e("error","You are already subscribed!");else{const y=((a=(o=c.response)==null?void 0:o.data)==null?void 0:a.message)||c.message||"Something went wrong!";e("error",y)}}}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".footer-subscribe-form"),s=n.querySelector(".footer-subscribe-input");n.addEventListener("submit",async o=>{o.preventDefault();const a=s.value.trim();if(!t.test(a)){e("error","Please enter a valid email address. Example - info@goit.ua");return}await r(a),s.value=""})})},se=()=>{const t=document.querySelector(".to-top-btn");t&&t.addEventListener("click",e),window.addEventListener("scroll",r);function e(){document.body.scroll({behavior:"smooth",top:0}),document.documentElement.scroll({behavior:"smooth",top:0})}function r(){document.body.scrollTop>20||document.documentElement.scrollTop>20?t.style.display="flex":t.style.display="none"}};function ne(){const t=localStorage.getItem("favorites");if(!t)return;let e=JSON.parse(t);const r=document.querySelector(".favorites-list-clear"),n=document.querySelector(".favorites-list"),s=document.querySelector(".favorites-pagination-block");let o=1;const a=10,c=()=>{if(e.length===0){n.innerHTML="",s.innerHTML="",r&&(r.style.display="block");return}else r&&(r.style.display="none");let d;if(window.innerWidth>=1440)d=e,s.innerHTML="";else{const u=Math.ceil(e.length/a);o>u&&(o=u||1);const m=(o-1)*a,v=m+a;d=e.slice(m,v),y(u)}const p=d.map(u=>(u.isHomePage=!1,u.id=u._id,U(u)));n.innerHTML=p.join("")},y=d=>{if(d<=1){s.innerHTML="";return}let p="";for(let u=1;u<=d;u++)p+=`<button class="favorites-pagination-btn ${u===o?"active":""}" type="button" data-page="${u}">${u}</button>`;s.innerHTML=p};s.addEventListener("click",d=>{if(d.target.classList.contains("favorites-pagination-btn")){const p=Number(d.target.dataset.page);p!==o&&(o=p,c(),n.scrollIntoView({behavior:"smooth",block:"start"}))}}),n.addEventListener("click",d=>{const p=d.target.closest(".exercise-card__trash-icon");if(p){const m=p.closest(".exercise-card").dataset.id;e=e.filter(v=>String(v._id)!==String(m)),localStorage.setItem("favorites",JSON.stringify(e)),c()}}),window.addEventListener("resize",c),c()}function oe(){const t=document.querySelector(".loader-page");t&&window.addEventListener("load",()=>{setTimeout(()=>{t.classList.add("hidden"),setTimeout(()=>{t.remove()},500)},500)})}console.log("iziToast >>>",x);const h=document.getElementById("searchInput"),P=document.querySelector(".search-btn"),F=document.querySelector(".search-clear-btn"),L=document.getElementById("filtersGrid"),N=document.getElementById("selectedSubcategory");function j(){const t=document.querySelector(".filter-btn--active");return t?t.dataset.filter:"Muscles"}function G(t){switch(t){case"Muscles":return"muscles";case"Body parts":return"bodypart";case"Equipment":return"equipment";default:return"muscles"}}function z(t=[]){if(!t.length){L.innerHTML="<p>Немає вправ для цієї категорії</p>";return}L.innerHTML=t.map(e=>`
      <article class="exercise-card">
        <h3 class="exercise-card-title">${e.name}</h3>
        <p class="exercise-card-meta">
          ${e.bodyPart||""}${e.bodyPart&&e.target?" · ":""}${e.target||""}
        </p>
      </article>
    `).join("")}function ae(){return h?h.closest(".search-wrapper"):null}function k(){const t=ae();t&&(h.value.trim()?t.classList.add("has-text"):t.classList.remove("has-text"))}async function B(){const t=N.textContent.trim().toLowerCase();if(!t)return;const e=j(),r=G(e);L.innerHTML="<p>Loading...</p>";try{const n={page:1,limit:12};n[r]=t;const s=await w.getExercisesByFilters(n),o=Array.isArray(s.results)?s.results:[];z(o)}catch(n){console.error(n),L.innerHTML="<p>Не вдалося завантажити вправи</p>",x.error({title:"Error",message:"Не вдалося завантажити вправи",position:"topRight"})}}async function K(){const t=h.value.trim(),e=N.textContent.trim().toLowerCase(),r=j(),n=G(r);if(k(),!e){x.info({title:"Select category",message:"Спочатку виберіть підкатегорію",position:"topRight"});return}if(!t){await B();return}L.innerHTML="<p>Loading...</p>";try{const s={page:1,limit:12,keyword:t};s[n]=e;const o=await w.getExercisesByFilters(s),a=Array.isArray(o.results)?o.results:[];if(!a.length){L.innerHTML="<p>По цьому ключовому слову немає результатів.</p>";return}z(a)}catch(s){console.error(s),x.error({title:"Error",message:"Не вдалося виконати пошук",position:"topRight"})}}h&&(h.addEventListener("input",async t=>{t.stopImmediatePropagation(),k(),h.value.trim()||await B()},!0),h.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),t.stopImmediatePropagation(),K())},!0));P&&P.addEventListener("click",t=>{t.preventDefault(),t.stopImmediatePropagation(),K()},!0);F&&h&&F.addEventListener("click",async t=>{t.preventDefault(),t.stopImmediatePropagation(),h.value="",k(),await B(),h.focus()},!0);const ie=()=>{oe();const t=document.body.dataset.page;t==="home"?te():t==="favorites"&&console.log("PAGE FAVORITES"),V(),Y(),se(),re(),ne()};ie();
//# sourceMappingURL=main-xyB-x1hn.js.map

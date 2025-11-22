var R=Object.defineProperty;var k=e=>{throw TypeError(e)};var j=(e,t,r)=>t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var q=(e,t,r)=>j(e,typeof t!="symbol"?t+"":t,r),z=(e,t,r)=>t.has(e)||k("Cannot "+r);var O=(e,t,r)=>t.has(e)?k("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r);var v=(e,t,r)=>(z(e,t,"access private method"),r);import{a as C,i as b}from"./vendor-CVmyF-gC.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const K=()=>{const e=document.querySelector("#mobile-menu-btn"),t=document.querySelector("#header-mobile-menu"),r=document.querySelector(".header-nav"),n=document.querySelector(".header-socials"),s=t.querySelectorAll(".header-socials-link"),a=globalThis.matchMedia("(max-width: 768px)");function i(){e.setAttribute("aria-expanded","true"),t.dataset.expanded="true"}function c(){e.setAttribute("aria-expanded","false"),t.dataset.expanded="false"}function y(){e.classList.remove("visually-hidden"),r.classList.add("visually-hidden"),n.classList.add("visually-hidden")}function u(){e.classList.add("visually-hidden"),r.classList.remove("visually-hidden"),n.classList.remove("visually-hidden"),c()}function p(){var _,S,E,o;const l=globalThis.location.pathname.includes("favorites");(_=document.querySelector("#nav-desktop-home"))==null||_.classList.toggle("nav-active",!l),(S=document.querySelector("#nav-desktop-favorites"))==null||S.classList.toggle("nav-active",l),(E=document.querySelector("#nav-mobile-home"))==null||E.classList.toggle("nav-active",!l),(o=document.querySelector("#nav-mobile-favorites"))==null||o.classList.toggle("nav-active",l)}function m(l){l.matches?y():u()}e.addEventListener("click",()=>{e.getAttribute("aria-expanded")==="true"?c():i()}),s.forEach(l=>{l.addEventListener("click",c)}),document.addEventListener("keydown",l=>{l.key==="Escape"&&t.getAttribute("aria-expanded")==="true"&&c()}),document.addEventListener("DOMContentLoaded",()=>{p()}),m(a),a.addEventListener("change",m)};var g,H,T,x;class Q{constructor(t){O(this,g);q(this,"PAGE_DEFAULT",1);q(this,"LIMIT_DEFAULT",10);this.client=C.create({baseURL:t,headers:{"Content-Type":"application/json"}})}async getExercisesByFilters(t={}){const{page:r,limit:n,...s}=t,a={...v(this,g,H).call(this,s),page:v(this,g,x).call(this,r,this.PAGE_DEFAULT),limit:v(this,g,x).call(this,n,this.LIMIT_DEFAULT)};try{return(await this.client.get("exercises",{params:a})).data}catch(i){throw new Error(i.response.data.message)}}async getExercisesById(t=""){if(!v(this,g,T).call(this,t))return{};try{return(await this.client.get(`exercises/${t}`)).data}catch(n){throw new Error(n.response.data.message)}}async getFiltersOfExercises(t={}){const{filter:r,page:n,limit:s}=t,a={filter:v(this,g,T).call(this,r),page:v(this,g,x).call(this,n,this.PAGE_DEFAULT),limit:v(this,g,x).call(this,s,this.LIMIT_DEFAULT)};try{return(await this.client.get("filters",{params:a})).data}catch(i){throw new Error(i.response.data.message)}}async getQuote(){return(await this.client.get("quote")).data}async subscribe(t=""){try{return(await this.client.post("subscription",{email:t})).data}catch(r){throw new Error(r.response.data.message)}}}g=new WeakSet,H=function(t={}){return Object.fromEntries(Object.entries(t).map(([r,n])=>[r,v(this,g,T).call(this,n)]).filter(([r,n])=>n!==void 0))},T=function(t=""){if(typeof t!="string")return;const r=t.trim();return r.length?r:void 0},x=function(t,r){const n=Number(t);return Number.isFinite(n)?n:r};const w=new Q("https://your-energy.b.goit.study/api/"),J=()=>{const e="A lot of times I find that people who are blessed with the most talent don't ever develop that attitude, and the ones who aren't blessed in that way are the most competitive and have the biggest heart.",t="Tom Brady";document.addEventListener("DOMContentLoaded",async()=>{const r=new Date().toISOString().slice(0,10),n=JSON.parse(localStorage.getItem("dailyQuote"));if(n&&n.date===r){document.getElementById("quote-text").textContent=n.quote,document.getElementById("quote-author").textContent=n.author;return}try{const{quote:s,author:a}=await w.getQuote();document.getElementById("quote-text").textContent=s,document.getElementById("quote-author").textContent=a,localStorage.setItem("dailyQuote",JSON.stringify({quote:s,author:a,date:r}))}catch(s){console.error("Error loading quote:",s),document.getElementById("quote-text").textContent=e,document.getElementById("quote-author").textContent=t}})};function W(e,t){const{name:r,imgURL:n}=e;return`<li class="categories-item">
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
                    <p class='category-filter'>${t}</p>
                </div>
            </button>
        </li>`}function D(e){const{id:t,isHomePage:r,rating:n,name:s,burnedCalories:a,time:i,bodyPart:c,target:y}=e;return`
  <li class="exercise-card" data-id="${t}">
    <div class="exercise-card__header">
      <div class="exercise-card__workout-and-rating">
        <div class="exercise-card__workout">
          <span class="exercise-card__workout__text">WORKOUT</span>
        </div>
        ${V(r,n)}
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
          >${a} / ${i} min</span
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
  `}function V(e,t){return e?`<div class="exercise-card__rating">
          <span class="exercise-card__rating__number">${t}</span>
          <svg width="13" height="13">
            <use fill="#EEA10C" href="./img/icons.svg#icon-star"></use>
          </svg>
        </div>`:`<svg class="exercise-card__trash-icon" width="16" height="16">
          <use href="./img/icons.svg#icon-trash"></use>
        </svg>`}function Z(e){return e?e[0].toUpperCase()+e.slice(1):""}function L(e){if(!e.length){filtersGrid.innerHTML="<p>Немає вправ для цієї категорії</p>";return}filtersGrid.dataset.exercises="true",filtersGrid.innerHTML=e.map(t=>D({isHomePage:!0,id:t._id,...t})).join("")}const Y=()=>{const e=document.getElementById("filters"),t=document.getElementById("filtersGrid"),r=document.getElementById("selectedSubcategory"),n=document.getElementById("searchContainer"),s=document.getElementById("searchInput"),a=document.querySelector(".search-icon"),i=document.querySelector(".exercises-title");let c="Muscles",y=[],u=[],p="";function m(o){document.querySelectorAll(".filter-btn").forEach(d=>d.classList.remove("filter-btn--active")),o.classList.add("filter-btn--active")}async function l(o){try{y=await(await w.getFiltersOfExercises({filter:o,page:1,limit:12})).results||[],_(await y,o)}catch(d){console.error("Error loading filters:",d),t.innerHTML="<p>Не вдалося завантажити фільтри</p>"}}function _(o,d){if(!o.length){t.innerHTML="<p>Немає категорій</p>";return}t.dataset.exercises="false",t.innerHTML=o.map(f=>W(f,d)).join("")}async function S(o,d){const f={page:1,limit:12};o==="Body parts"?f.bodypart=d:o==="Muscles"?f.target=d:o==="Equipment"&&(f.equipment=d);try{u=await(await w.getExercisesByFilters(f)).results||[],L(u)}catch(I){console.error("Error loading exercises:",I),t.innerHTML="<p>Не вдалося завантажити вправи</p>"}}function E(){const o=s.value.toLowerCase().trim();if(console.log(o),!o){L(u);return}const d=u.filter(f=>(f.name||"").toLowerCase().includes(o));L(d)}e.addEventListener("click",async o=>{const d=o.target.closest(".filter-btn");if(!d)return;const f=d.dataset.filter;!f||f===c||(c=f,m(d),r.textContent="",p="",n.hidden=!0,s.value="",u=[],l(c))}),t.addEventListener("click",async o=>{const d=o.target.closest(".category-card");if(!d)return;const f=d.dataset.name,I=Z(f);p=f,r.textContent=I,n.hidden=!1,s.value="",await S(c,p)}),s.addEventListener("input",E),s.addEventListener("keydown",o=>{o.key==="Enter"&&(o.preventDefault(),E())}),a&&a.addEventListener("click",E),document.addEventListener("DOMContentLoaded",()=>{l("Muscles")}),i.addEventListener("click",async()=>{c="muscles",document.querySelectorAll(".filter-btn").forEach(d=>d.classList.remove("filter-btn--active"));const o=document.querySelector('[data-filter="Muscles"]');o&&o.classList.add("filter-btn--active"),p="",r.textContent="",s.value="",n.hidden=!0,u=[],await l("muscles")})},X=()=>{C.defaults.baseURL="https://your-energy.b.goit.study/api";const e=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function t(n,s){b.show({title:n==="success"?"Success":"Error",message:s,position:"center",color:n==="success"?"green":"red",timeout:4e3,pauseOnHover:!0,closeOnClick:!0})}async function r(n){var s,a,i;try{const{data:c}=await C.post("/subscription",{email:n});t("success",c.message||"Subscription created!")}catch(c){if(((s=c.response)==null?void 0:s.status)===409)t("error","You are already subscribed!");else{const y=((i=(a=c.response)==null?void 0:a.data)==null?void 0:i.message)||c.message||"Something went wrong!";t("error",y)}}}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".footer-subscribe-form"),s=n.querySelector(".footer-subscribe-input");n.addEventListener("submit",async a=>{a.preventDefault();const i=s.value.trim();if(!e.test(i)){t("error","Please enter a valid email address. Example - info@goit.ua");return}await r(i),s.value=""})})},ee=()=>{const e=document.querySelector(".to-top-btn");e&&e.addEventListener("click",t),window.addEventListener("scroll",r);function t(){document.body.scroll({behavior:"smooth",top:0}),document.documentElement.scroll({behavior:"smooth",top:0})}function r(){document.body.scrollTop>20||document.documentElement.scrollTop>20?e.style.display="flex":e.style.display="none"}};function te(){const e=localStorage.getItem("favorites");if(!e)return;let t=JSON.parse(e);const r=document.querySelector(".favorites-list-clear"),n=document.querySelector(".favorites-list"),s=document.querySelector(".favorites-pagination-block");let a=1;const i=10,c=()=>{if(t.length===0){n.innerHTML="",s.innerHTML="",r&&(r.style.display="block");return}else r&&(r.style.display="none");let u;if(window.innerWidth>=1440)u=t,s.innerHTML="";else{const m=Math.ceil(t.length/i);a>m&&(a=m||1);const l=(a-1)*i,_=l+i;u=t.slice(l,_),y(m)}const p=u.map(m=>(m.isHomePage=!1,m.id=m._id,D(m)));n.innerHTML=p.join("")},y=u=>{if(u<=1){s.innerHTML="";return}let p="";for(let m=1;m<=u;m++)p+=`<button class="favorites-pagination-btn ${m===a?"active":""}" type="button" data-page="${m}">${m}</button>`;s.innerHTML=p};s.addEventListener("click",u=>{if(u.target.classList.contains("favorites-pagination-btn")){const p=Number(u.target.dataset.page);p!==a&&(a=p,c(),n.scrollIntoView({behavior:"smooth",block:"start"}))}}),n.addEventListener("click",u=>{const p=u.target.closest(".exercise-card__trash-icon");if(p){const l=p.closest(".exercise-card").dataset.id;t=t.filter(_=>String(_._id)!==String(l)),localStorage.setItem("favorites",JSON.stringify(t)),c()}}),window.addEventListener("resize",c),c()}function re(){const e=document.querySelector(".loader-page");e&&window.addEventListener("load",()=>{setTimeout(()=>{e.classList.add("hidden"),setTimeout(()=>{e.remove()},500)},500)})}console.log("iziToast >>>",b);const h=document.getElementById("searchInput"),P=document.querySelector(".search-btn"),F=document.querySelector(".search-clear-btn"),M=document.getElementById("filtersGrid"),$=document.getElementById("selectedSubcategory");function U(){const e=document.querySelector(".filter-btn--active");return e?e.dataset.filter:"Muscles"}function N(e){switch(e){case"Muscles":return"muscles";case"Body parts":return"bodypart";case"Equipment":return"equipment";default:return"muscles"}}function se(){return h?h.closest(".search-wrapper"):null}function A(){const e=se();e&&(h.value.trim()?e.classList.add("has-text"):e.classList.remove("has-text"))}async function B(){const e=$.textContent.trim().toLowerCase();if(!e)return;const t=U(),r=N(t);M.innerHTML="<p>Loading...</p>";try{const n={page:1,limit:12};n[r]=e;const s=await w.getExercisesByFilters(n),a=Array.isArray(s.results)?s.results:[];L(a)}catch(n){console.error(n),M.innerHTML="<p>Не вдалося завантажити вправи</p>",b.error({title:"Error",message:"Не вдалося завантажити вправи",position:"topRight"})}}async function G(){const e=h.value.trim(),t=$.textContent.trim().toLowerCase(),r=U(),n=N(r);if(A(),!t){b.info({title:"Select category",message:"Спочатку виберіть підкатегорію",position:"topRight"});return}if(!e){await B();return}M.innerHTML="<p>Loading...</p>";try{const s={page:1,limit:12,keyword:e};s[n]=t;const a=await w.getExercisesByFilters(s),i=Array.isArray(a.results)?a.results:[];if(!i.length){M.innerHTML="<p>По цьому ключовому слову немає результатів.</p>";return}L(i)}catch(s){console.error(s),b.error({title:"Error",message:"Не вдалося виконати пошук",position:"topRight"})}}h&&(h.addEventListener("input",async e=>{e.stopImmediatePropagation(),A(),h.value.trim()||await B()},!0),h.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),e.stopImmediatePropagation(),G())},!0));P&&P.addEventListener("click",e=>{e.preventDefault(),e.stopImmediatePropagation(),G()},!0);F&&h&&F.addEventListener("click",async e=>{e.preventDefault(),e.stopImmediatePropagation(),h.value="",A(),await B(),h.focus()},!0);const ne=()=>{re();const e=document.body.dataset.page;e==="home"?Y():e==="favorites"&&console.log("PAGE FAVORITES"),K(),J(),ee(),X(),te()};ne();
//# sourceMappingURL=main-CndkYIpf.js.map

const e=document.querySelector(".breed-select"),t=document.querySelector(".loader"),n=document.querySelector(".cat-info"),r=document.querySelector(".error");function o(e){r.textContent=e,r.classList.add("show")}e.addEventListener("change",(()=>{const r=e.value;var a;n.style.display="none",t.style.display="block",(a=r,fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${a}`,{headers:{"x-api-key":"live_TziuycWEj2WE6BOPwhJ5cY6bz2X8qb25n1lv2G2sCFnxVGgRFM0OalXl4tG4StRH"}}).then((e=>{if(!e.ok)throw new Error("Failed to fetch cat information.");return e.json()})).then((e=>{const t=e[0],n=t.breeds[0];return{url:t.url,name:n.name,description:n.description,temperament:n.temperament}})).catch((e=>{o(e.message),console.error(e)}))).then((e=>{!function(e){n.innerHTML=`\n    <img src="${e.url}" alt="Cat Image">\n    <h2>${e.name}</h2>\n    <p><strong>Description:</strong> ${e.description}</p>\n    <p><strong>Temperament:</strong> ${e.temperament}</p>\n  `}(e),t.style.display="none",n.style.display="block"}))})),t.style.display="block",fetch("https://api.thecatapi.com/v1/breeds",{headers:{"x-api-key":"live_TziuycWEj2WE6BOPwhJ5cY6bz2X8qb25n1lv2G2sCFnxVGgRFM0OalXl4tG4StRH"}}).then((e=>{if(!e.ok)throw new Error("Failed to fetch breed list.");return e.json()})).then((e=>e.map((e=>({id:e.id,name:e.name}))))).catch((e=>{o(e.message),console.error(e)})).then((n=>{n.forEach((t=>{const n=document.createElement("option");n.value=t.id,n.textContent=t.name,e.appendChild(n)})),e.style.display="block",t.style.display="none"}));
//# sourceMappingURL=index.dc4e11f5.js.map
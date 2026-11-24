
const I={"p1": "images/p1.jpg", "p2": "images/p2.jpg", "p3": "images/p3.jpg", "p4": "images/p4.jpg", "p5": "images/p5.jpg", "p6": "images/p6.jpg", "face": "images/face.jpg", "u1": "images/u1.jpg", "u2": "images/u2.jpg", "u3": "images/u3.jpg", "u4": "images/u4.jpg", "c1": "images/c1.jpg", "c2": "images/c2.jpg", "c3": "images/c3.jpg"};
const $=s=>document.querySelector(s);
const M=[["영화",["전체 영화","현재 상영작","개봉 예정작"],"#upcoming"],["발견",["테마별 추천","인기 급상승","평점 높은 영화","나만의 영화 찾기"],"#curation"],["매거진",["최신 매거진","영화 리뷰","영화 뉴스","인터뷰"],"#newsletter"]];
$("#mega .in").innerHTML='<div></div>'+M.map(m=>`<div><ul>${m[1].map(x=>`<li><a href="${m[2]}">${x}</a></li>`).join("")}</ul></div>`).join("");
$("#mnav").innerHTML='<li><a href="#top" style="display:block;padding:16px 24px;border-bottom:1px solid #333">홈</a></li>'+M.map(m=>`<li><button aria-expanded="false">${m[0]} <span style="float:right">＋</span></button><ul>${m[1].map(x=>`<li><a href="${m[2]}">${x}</a></li>`).join("")}</ul></li>`).join("");
document.querySelectorAll("#mnav>li>button").forEach(b=>b.onclick=()=>{const l=b.parentNode,o=l.classList.toggle("on");b.setAttribute("aria-expanded",o)});
$("#mnav").onclick=e=>{if(e.target.closest("ul ul a"))$("#mnav").classList.remove("open")};
$("#burger").onclick=e=>{const o=$("#mnav").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
// align mega columns under GNB items
function alignMega(){const g=[...document.querySelectorAll(".gnb>li")],c=$("#mega .in").children,r=$("#mega .in").getBoundingClientRect().left;[1,2,3].forEach(i=>{c[i].style.paddingLeft="0";c[i].style.marginLeft=(g[i].getBoundingClientRect().left-r-24-(c[i].getBoundingClientRect().left-r-24))+"px"})}
const hero=[["룩백","마음에 남은 순간을, 다시 돌아보다.","2026.10.08 개봉 · 드라마 · 100분","고레에다 히로카즈 감독의 실사 영화 〈룩백〉.<br>오늘은 오래 머무는 감정과 섬세한 시선을 만나보세요.","face","#3a1f26","고레에다 히로카즈 감독"],
["치이카와: 인어 섬의 비밀","작은 친구들의 커다란 모험","극장판 · 애니메이션","함께 보고 싶은 사랑스러운 모험.<br>새로운 이야기 속 새로운 발견.","p2","#23306b","극장판 치이카와"],
["[2026 NT Live] 골든 보이","스크린으로 만나는 무대","공연 실황 · 2026","극장에서 만나는 무대 예술의 에너지.<br>스크린으로 만나는 특별한 순간.","p5","#4a3a20","National Theatre Live"]];
$("#track").innerHTML=hero.map((h,i)=>`<article class="slide" aria-label="${i+1}/3"><div class="bg" style="background-image:url(${I[['p1','p2','p5'][i]]})"></div><div class="in"><div><p class="eyebrow">오늘의 추천 <i>CINEROOM SELECT</i></p><h2>${h[0].length>6?'':h[0]}</h2>${h[0].length>6?`<h2 style="font-size:56px">${h[0]}</h2>`:''}<h3>${h[1]}</h3><p class="meta">${h[2]}</p><p class="desc">${h[3]}</p><div class="btns"><a class="btn red" href="#top10">▷ 예고편 보기</a><a class="btn" href="#popular">상세 보기</a><button class="btn ic heart2" aria-label="찜하기">♡</button></div></div><figure><img src="${I[h[4]]}" alt="${h[0]} 이미지"><figcaption>${h[6]}</figcaption></figure></div></article>`).join("");
let cur=0,play=true,t;const dots=$("#dots");
dots.innerHTML=hero.map((_,i)=>`<button aria-label="${i+1}번 배너"></button>`).join("");
function go(n){cur=(n+3)%3;$("#cnum").textContent=String(cur+1).padStart(2,"0");$("#track").style.transform=`translateX(-${cur*100}%)`;[...dots.children].forEach((d,i)=>d.setAttribute("aria-current",i==cur))}
function run(){clearInterval(t);if(play)t=setInterval(()=>go(cur+1),5000)}
[...dots.children].forEach((d,i)=>d.onclick=()=>{go(i);run()});$("#prev").onclick=()=>{go(cur-1);run()};$("#next").onclick=()=>{go(cur+1);run()};
$("#pp").onclick=e=>{play=!play;e.currentTarget.textContent=play?"❚❚":"▶";e.currentTarget.setAttribute("aria-label",play?"일시정지":"재생");run()};
let sx=0;$("#track").addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});$("#track").addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40){go(cur+(d<0?1:-1));run()}});
go(0);run();
document.querySelectorAll(".heart2").forEach(b=>b.onclick=()=>b.textContent=b.textContent=="♡"?"♥":"♡");
$("#chips").innerHTML='<b>무드</b>'+["전체","웃고 싶은 날","긴장감 UP","눈물 쏟는 날","데이트","가족과 함께","혼자 보기 좋은"].map((x,i)=>`<button class="chip${i?'':' on'}">${x}</button>`).join("")+'<b>러닝타임</b>'+["~90분","90~120분","120분+"].map(x=>`<button class="chip">${x}</button>`).join("");
$("#chips").onclick=e=>{const c=e.target.closest(".chip");if(!c)return;c.classList.toggle("on")};
const P=[["룩백","p1","드라마 · 100분"],["극장판 치이카와: 인어 섬의 비밀","p2","작은 친구들의 커다란 모험"],["트레인스포팅","p3","다시 만나는 스코틀랜드 명작"],["스틸레이","p4","새롭게 발견하는 이야기"],["[2026 NT Live] 골든 보이","p5","스크린으로 만나는 무대"],["레위기","p6","취향을 넓히는 한 편"]];
const card=(p,x="")=>`<article class="card"><a class="im" href="#top10"><img src="${I[p[1]]}" alt="${p[0]} 포스터" loading="lazy">${x}<button class="heart" aria-pressed="false" aria-label="찜하기">♡</button></a><h3>${p[0]}</h3><p>${p[2]}</p></article>`;
$("#box").innerHTML=P.map((p,i)=>card(p,`<span class="rk">0${i+1}</span>`)).join("");
$("#bigpick").innerHTML=`<a class="im" href="#popular"><img src="${I.p3}" alt="트레인스포팅 포스터"></a><h3 style="margin-top:14px">트레인스포팅</h3><p>다시 꺼내 보고 싶은 영작</p><div class="btns"><a class="btn red" href="#top10">▷ 예고편 보기</a><a class="btn" href="#popular">상세 보기</a></div>`;
$("#wish").innerHTML=[P[0],P[5],P[1],P[4],P[3]].map(p=>card(p)).join("");
$("#soon").innerHTML=[["수능, 출제의 비밀","u1","2026.10.28 개봉 · 코미디 · 99분"],["하트 오브 비스트","u2","2026.10.28 개봉 · 액션·어드벤처 · 101분"],["쿵푸 허슬","u3","2026.10.28 개봉"],["이성과 감성","u4","2026.10.28 개봉"]].map(p=>`<article class="card"><a class="im" href="#upcoming"><img src="${I[p[1]]}" alt="${p[0]} 스틸컷" loading="lazy"><span class="dd">D-3</span></a><h3 style="font-size:16px">${p[0]}</h3><p>${p[2]}</p><div class="row"><a href="#upcoming">상세 보기 ↗</a><span>🔔 알림 받기 · 준비 중</span></div></article>`).join("");
$("#cur").innerHTML=[["AFTER THE CREDITS","엔딩 뒤에도 남는 마음","어운을 따라 고른 영화 · 룩백 외","c1"],["A LITTLE ESCAPE","작은 모험, 커다란 행복","함께라서 더 좋은 애니메이션","c2"],["ANOTHER POINT OF VIEW","익숙한 세상을 뒤집는 웃음","일상을 새롭게 보는 코미디","c3"]].map(c=>`<a href="#curation"><span class="im"><img src="${I[c[3]]}" alt="${c[1]}" loading="lazy"><span class="cap"><small>${c[0]}</small><strong>${c[1]}</strong></span></span><p><span>${c[2]}</span><span>↗</span></p></a>`).join("");
$("#tabs").innerHTML=["전체","극장","Netflix","TVING","Wavve","WATCHA","Disney+"].map((x,i)=>`<button class="tab${i?'':' on'}">${x}</button>`).join("");
$("#tabs").onclick=e=>{const b=e.target.closest(".tab");if(!b)return;document.querySelectorAll(".tab").forEach(t=>t.classList.remove("on"));b.classList.add("on")};
$("#ott").innerHTML=[P[0],P[2],P[4],P[3],P[5],P[1]].map(p=>`<article class="card"><a class="im" href="#watch"><img src="${I[p[1]]}" alt="${p[0]} 포스터" loading="lazy"><span class="ott">플랫폼 확인</span></a><h3>${p[0]}</h3><p>${p[2]}</p><p><a href="#watch">시청 경로 확인 ↗</a></p></article>`).join("");
document.addEventListener("click",e=>{const h=e.target.closest(".heart");if(h){e.preventDefault();const o=h.getAttribute("aria-pressed")!="true";h.setAttribute("aria-pressed",o);h.textContent=o?"♥":"♡"}});
alignMega();addEventListener("resize",alignMega);
// 가로로 넘치는 영역: 마우스 드래그 + 터치 스와이프 (스크롤바 없음)
document.querySelectorAll(".swipe,.cur,.chips").forEach(el=>{
  el.classList.add("drag");let down=false,sx=0,sl=0;
  el.addEventListener("mousedown",e=>{down=true;sx=e.pageX;sl=el.scrollLeft;el.classList.add("on")});
  addEventListener("mousemove",e=>{if(!down)return;const d=e.pageX-sx;if(Math.abs(d)>5)el.classList.add("moved");el.scrollLeft=sl-d});
  addEventListener("mouseup",()=>{if(!down)return;down=false;el.classList.remove("on");setTimeout(()=>el.classList.remove("moved"),0)});
});

const notes = [
  {type:"reading", date:"2026-11-20", cover:"深度工作", author:"CAL NEWPORT", theme:"mint", title:"《深度工作》：把注意力还给自己", intro:"专注并非与生俱来的天赋，而是一种值得刻意练习的能力。", body:[
    "读这本书时，最触动我的不是每天能完成多少工作，而是结束一天时，能不能指出一件真正想明白了的事。",
    "我想试试一个很小的改变：开始阅读前，把手机放到另一个房间，在纸上写下这半小时想弄懂的问题。结束时，不看原文，用自己的话回答它。如果还说不清楚，明天就从这里继续。"]},
  {type:"thinking", date:"2026-11-16", cover:"日常观察", author:"FIELD NOTES", theme:"peach", title:"给生活留一点空白", intro:"在被日程填满的日子里，重新发现那些没有目的的时刻。", body:[
    "散步经过熟悉的街角，才发现那面墙下午是浅金色的。以前经过这里，总在听点什么，耳机里的节目还没播完，人已经到了家。",
    "空白不一定要留出整整一个下午。等水烧开的几分钟，不打开手机，也不急着安排下一件事。有时一个念头正需要这么一点时间，才来得及说完。"]},
  {type:"reading", date:"2026-11-12", cover:"小王子", author:"A. DE SAINT-EXUPÉRY", theme:"violet", title:"重读《小王子》：关于时间与联结", intro:"同一本书在不同的年纪翻开，总会遇见不同的问题。", body:[
    "小时候记得星球、狐狸和玫瑰，这次却注意到他们为彼此等待的时刻。关系不像一件捡到的宝物，更像每天回来照料的一小块花园。",
    "合上书，想到一个很久没联系的朋友。比起转发一句关于友谊的话，也许更值得做的，是约定一个可以好好聊聊天的傍晚。"]},
];

const labels = {reading:"读书笔记", thinking:"思考手记"};
const dialog = document.querySelector("dialog");
const cards = document.querySelector("#cards");
function node(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
}
function icon(name) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns,"svg"), use = document.createElementNS(ns,"use");
  use.setAttribute("href","#"+name); svg.setAttribute("aria-hidden","true"); svg.append(use);
  return svg;
}
function show(title, label, paragraphs) {
  const heading = node("h2","",title); heading.id = "dialog-title";
  document.querySelector("#detail").replaceChildren(node("small","",label),heading,...paragraphs.map(p=>node("p","",p)));
  dialog.showModal();
}
function render(type) {
  cards.replaceChildren();
  const list = notes.filter(n=>type==="all" || n.type===type).sort((a,b)=>b.date.localeCompare(a.date));
  document.querySelector(".count").textContent = `共 ${list.length} 篇笔记`;
  for (const n of list) {
    const num = String(notes.indexOf(n)+1).padStart(2,"0");
    const card = node("article","card");
    const art = node("div",`cover ${n.theme}`); art.setAttribute("aria-hidden","true");
    const jacket = node("div","jacket");
    jacket.append(node("b","",n.cover),node("small","",n.author),node("i","motif"));
    art.append(node("span","serial","PL / "+num),jacket,node("span","art-caption",n.type==="reading"?"READING SERIES":"THOUGHT SERIES"));
    const info = node("div","info"), tag = node("span","tag "+n.type,labels[n.type]);
    tag.prepend(icon(n.type==="reading"?"book":"pen"));
    const title = node("h3"), open = node("button","open",n.title);
    open.onclick=()=>show(n.title,`${labels[n.type]}　/　${n.date}`,n.body);
    title.append(open);
    const meta = node("div","meta"), date = node("span","",n.date.replaceAll("-",".")), duration = node("span","",`${Math.max(1,Math.ceil(n.body.join("").length/350))} 分钟`);
    date.prepend(icon("calendar")); duration.prepend(icon("clock")); meta.append(date,duration);
    info.append(tag,title,node("p","",n.intro),meta); card.append(art,info); cards.append(card);
  }
}
document.querySelectorAll("[data-type]").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll("[data-type]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
  render(btn.dataset.type);
});
document.querySelector("#about").onclick=()=>show("关于纸间","ABOUT PAPERLOG",["纸间是用来整理读书笔记和日常思考的个人笔记本。当前收录的是示例笔记，展示从一段阅读或一次观察出发，写下问题和回应的方式。"]);
document.querySelector(".close").onclick=()=>dialog.close();
dialog.onclick=e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}};
function syncNav() {
  document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.hash===(location.hash||"#home")));
}
window.addEventListener("hashchange",syncNav);
syncNav(); render("all");

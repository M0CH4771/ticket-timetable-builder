const TICKET_HOST = "ticketdive.com";
const MAX_HTML_BYTES = 3_000_000;
const GITHUB_PAGES_ORIGIN = "https://m0ch4771.github.io";

const page = String.raw`<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#175c67"><title>イベントタイムテーブル作成</title>
  <script src="https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/tesseract.js@6/dist/tesseract.min.js"></script>
  <style>
    :root{font-family:Arial,"Hiragino Kaku Gothic ProN",Meiryo,sans-serif;color:#1d2833;background:#f4f6f8;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box}body{margin:0}header{height:72px;background:#fff;border-bottom:1px solid #dce3e8}.head{max-width:1440px;height:100%;margin:auto;padding:0 28px;display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:12px}.mark{width:38px;height:38px;border-radius:12px;background:#175c67;color:white;display:grid;place-items:center;font-weight:800;font-size:19px}.brand strong{font-size:17px}.brand small{display:block;color:#687780;font-size:12px;margin-top:3px}.local{background:#eef5f7;color:#246273;border-radius:99px;padding:8px 12px;font-size:12px;font-weight:700}.layout{max-width:1440px;margin:auto;padding:24px 28px;display:grid;grid-template-columns:minmax(330px,.82fr) minmax(0,1.18fr);gap:22px}.left{display:grid;gap:16px;align-content:start}.panel{border:1px solid #dce3e8;border-radius:16px;background:#fff;box-shadow:0 3px 12px #1e323c0a;padding:20px}.intro{display:flex;gap:12px;align-items:flex-start;margin-bottom:18px}.step{flex:none;width:31px;height:31px;border:1px solid #bfd0d6;border-radius:9px;background:#f2f8f9;color:#235e68;display:grid;place-items:center;font-weight:800}.panel h1,.panel h2,.panel h3{margin:0}.panel h1{font-size:20px}.panel h2{font-size:18px}.panel p{font-size:14px;color:#5d6a73;line-height:1.65;margin:5px 0 0}.label{display:block;color:#42515b;font-size:13px;font-weight:700}.row{display:flex;gap:8px;margin-top:8px}.input{width:100%;min-width:0;border:1px solid #cbd6dc;border-radius:9px;background:#fff;padding:10px 12px;color:#17242c;font-size:14px;outline:none}.input:focus,.cell:focus{border-color:#247887;box-shadow:0 0 0 3px #24788722}.btn{min-height:40px;border:0;border-radius:9px;padding:9px 14px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}.primary{background:#175c67;color:white}.primary:hover{background:#124b54}.secondary{background:white;border:1px solid #d2dde2;color:#31434c}.export{background:#d3472f;color:white}.btn:disabled{opacity:.65;cursor:wait}.hint{font-size:12px;color:#75838b;line-height:1.6;margin-top:8px}.notice,.error{font-size:14px;line-height:1.5;margin-top:14px;padding:10px 12px;border-radius:9px}.notice{background:#edf6f3;color:#285f55}.error{background:#fff0ee;color:#a23327}.eventfields{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}.field.full{grid-column:1/-1}.imagelist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:10px;border:1px solid #dfe6eb;border-radius:12px;background:#f8fafb}.imagebox{min-height:125px;display:grid;place-items:center;overflow:hidden;background:#fff;border-radius:8px}.imagebox img{display:block;width:100%;max-height:260px;object-fit:contain}.empty{min-height:125px;grid-column:1/-1;display:grid;place-items:center;color:#687780;font-size:13px}.tablehead{padding:17px 20px;border-bottom:1px solid #e3e9ed;display:flex;align-items:center;justify-content:space-between;gap:12px}.eyebrow{font-size:11px!important;font-weight:800;letter-spacing:.14em;color:#4c7180!important}.tablewrap{overflow:auto}.sheet{border-collapse:collapse;width:100%;min-width:870px;font-size:13px}.sheet th,.sheet td,.seats th,.seats td{border:1px solid #cdd7dc;padding:4px}.sheet th,.seats th{background:#e7f4f5;color:#244b55;text-align:center;white-space:nowrap;font-weight:700}.sheet td{height:34px}.cell{width:100%;min-width:48px;border:1px solid transparent;border-radius:5px;background:transparent;padding:6px 4px;font-size:13px;color:#1d2833;outline:none;text-align:center}.group{min-width:150px;text-align:left}.tier{min-width:44px}.delete{border:0;background:none;color:#71808a;cursor:pointer;font-size:18px}.bottom{border-top:1px solid #e3e9ed;padding:18px 20px}.subhead{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:12px}.subhead p{font-size:12px;margin-top:4px}.seats{border-collapse:collapse;width:100%;min-width:600px;font-size:13px}.seatTag{display:inline-block;min-width:72px;border-radius:4px;padding:4px;text-align:center}.foot{max-width:1440px;margin:auto;padding:0 28px 24px;color:#687780;font-size:12px;line-height:1.6}.spinner{display:inline-block;width:15px;height:15px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
    @media(max-width:950px){.layout{grid-template-columns:1fr;max-width:840px}.sheetpanel{grid-row:2}}@media(max-width:600px){.head{padding:0 16px}.local{display:none}.layout{padding:16px 12px;gap:14px}.panel{padding:16px}.tablehead,.bottom{padding:15px}.foot{padding:0 16px 20px}.row{flex-direction:column}.primary{width:100%}.eventfields{grid-template-columns:1fr}.field.full{grid-column:auto}.btn{min-height:42px}.brand small{font-size:11px}}
  </style>
</head>
<body>
  <header><div class="head"><div class="brand"><div class="mark">時</div><div><strong>イベント表作成</strong><small>チケットページからタイムテーブルを準備</small></div></div><span class="local">入力内容はこのブラウザー内で処理</span></div></header>
  <main class="layout">
    <section class="left">
      <section class="panel"><div class="intro"><span class="step">1</span><div><h1>チケットURLを読み込む</h1><p>TicketDiveのイベントページから画像と基本情報を取得します。</p></div></div><label class="label" for="ticketUrl">チケットページURL</label><div class="row"><input id="ticketUrl" class="input" value="https://ticketdive.com/event/261012t" placeholder="https://ticketdive.com/event/..." autocomplete="url"><button id="load" class="btn primary">読み込む</button></div><div class="hint">現在はTicketDiveのイベントURLに対応しています。</div><div id="status" aria-live="polite"></div></section>
      <section id="eventPanel" class="panel" hidden><div class="intro"><span class="step">2</span><div><h2>画像を確認する</h2><p>候補画像を読み取り、文字を表にします。</p></div><button id="scan" class="btn secondary">画像を読み取る</button></div><div id="images" class="imagelist"></div><div class="eventfields"><label class="field"><span class="label">イベント名</span><input id="title" class="input" style="margin-top:8px"></label><label class="field"><span class="label">開催日</span><input id="date" class="input" style="margin-top:8px" placeholder="2026/10/12"></label><label class="field full"><span class="label">会場</span><input id="venue" class="input" style="margin-top:8px"></label></div></section>
      <section class="panel"><div class="intro"><span class="step">3</span><div><h2>内容を整えて出力</h2><p>出演者・時間・番号欄を確認し、シート形式で保存します。画像の文字認識だけでは確定できない時刻があります。</p><button id="export" class="btn export" style="margin-top:14px">▦　スプレッドシートをダウンロード</button><div class="hint">Googleスプレッドシートで開けるExcel形式です。</div></div></div></section>
    </section>
    <section class="panel sheetpanel"><div class="tablehead"><div><p class="eyebrow">プレビュー</p><h2 id="eventLabel" style="margin-top:4px">新しいイベント</h2></div><button id="addSlot" class="btn secondary">＋ 行を追加</button></div><div class="tablewrap"><table class="sheet"><thead><tr><th>開始</th><th>終了</th><th>グループ名</th><th>時間</th><th>下3</th><th>下2</th><th>下1</th><th>0</th><th>上1</th><th>上2</th><th>上3</th><th></th></tr></thead><tbody id="slotRows"><tr><td colspan="12" style="height:120px;text-align:center;color:#75838b">URLを読み込むと出演者が表示されます。</td></tr></tbody></table></div><div class="bottom"><div class="subhead"><div><h3>整理番号と使用者</h3><p>番号、使用者、所持者、交換、備考を入力できます。</p></div><button id="addSeat" class="btn secondary">＋ 番号を追加</button></div><div class="tablewrap"><table class="seats"><thead><tr><th>区分</th><th>番号</th><th>使用者</th><th>所持者</th><th>交換</th><th>備考</th></tr></thead><tbody id="seatRows"></tbody></table></div></div></section>
  </main><footer class="foot">画像の文字認識結果は必ず確認してください。入力した内容は、この画面を閉じると保存されません。</footer>
  <script>
    const $=id=>document.getElementById(id);let eventInfo=null,slots=[],seatData=Array.from({length:10},(_,i)=>({number:String(i+1),user:"",holder:"",exchange:"",memo:""}));
    const uid=()=>Math.random().toString(36).slice(2,9);const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const minutesBetween=(a,b)=>{const toMin=x=>{const p=x.split(":").map(Number);return p[0]*60+p[1]};const value=toMin(b)-toMin(a);return value<0?value+1440:value};
    function message(text,type="notice"){const box=$("status");box.className=type;box.textContent=text;}
    function renderSlots(){const body=$("slotRows");if(!slots.length){body.innerHTML='<tr><td colspan="12" style="height:120px;text-align:center;color:#75838b">URLを読み込むと出演者が表示されます。</td></tr>';return}const tiers=["下3","下2","下1","0","上1","上2","上3"];body.innerHTML=slots.map(s=>'<tr data-id="'+s.id+'"><td><input class="cell" data-key="start" aria-label="開始時刻" placeholder="14:00" value="'+esc(s.start)+'"></td><td><input class="cell" data-key="end" aria-label="終了時刻" placeholder="14:20" value="'+esc(s.end)+'"></td><td><input class="cell group" data-key="group" aria-label="グループ名" placeholder="出演者名" value="'+esc(s.group)+'"></td><td><input class="cell" data-key="minutes" aria-label="出演時間" placeholder="20" value="'+esc(s.minutes)+'"></td>'+tiers.map(t=>'<td><input class="cell tier" aria-label="'+t+'欄"></td>').join('')+'<td><button class="delete" aria-label="行を削除" data-delete="'+s.id+'">×</button></td></tr>').join('');body.querySelectorAll("input[data-key]").forEach(el=>el.addEventListener("input",()=>{const row=el.closest("tr"),item=slots.find(s=>s.id===row.dataset.id);if(item)item[el.dataset.key]=el.value}));body.querySelectorAll("[data-delete]").forEach(el=>el.addEventListener("click",()=>{slots=slots.filter(s=>s.id!==el.dataset.delete);renderSlots()}));}
    function renderSeats(){const cats=[["お目当て","#ffe838","#263238"],["観たがり","#ff9b00","#263238"],["野良","#ef3939","white"],["おまいつ","#21db27","#153b19"]];$("seatRows").innerHTML=cats.map((c,i)=>'<tr><td><span class="seatTag" style="background:'+c[1]+';color:'+c[2]+'">'+c[0]+'</span></td><td>'+(i+1)+'</td><td colspan="4" style="color:#75838b">区分の色は出力シートに反映されます</td></tr>').join('')+seatData.map((s,i)=>'<tr data-seat="'+i+'"><td></td>'+["number","user","holder","exchange","memo"].map(key=>'<td><input class="cell" data-seat-key="'+key+'" aria-label="'+key+'" value="'+esc(s[key])+'"></td>').join('')+'</tr>').join('');$("seatRows").querySelectorAll("input[data-seat-key]").forEach(el=>el.addEventListener("input",()=>{const row=el.closest("tr"),item=seatData[Number(row.dataset.seat)];item[el.dataset.seatKey]=el.value}));}
    $("addSlot").addEventListener("click",()=>{slots.push({id:uid(),start:"",end:"",group:"",minutes:""});renderSlots()});$("addSeat").addEventListener("click",()=>{seatData.push({number:String(seatData.length+1),user:"",holder:"",exchange:"",memo:""});renderSeats()});
    $("load").addEventListener("click",async()=>{message("");$("load").disabled=true;$("load").innerHTML='<span class="spinner"></span> 読み込み中';try{const r=await fetch("/api/ticket-preview",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({url:$("ticketUrl").value})});const data=await r.json();if(!r.ok)throw Error(data.message||"チケットページを読み込めませんでした。");eventInfo=data;$("eventPanel").hidden=false;$("title").value=data.title||"";$("date").value=data.date||"";$("venue").value=data.venue||"";$("eventLabel").textContent=data.title||"新しいイベント";const opening=data.openTime&&data.startTime?[{id:uid(),start:data.openTime,end:data.startTime,group:"OPEN",minutes:String(minutesBetween(data.openTime,data.startTime))}]:[];slots=[...opening,...(data.artists||[]).map(group=>({id:uid(),start:"",end:"",group,minutes:""}))];renderSlots();const images=$("images");images.innerHTML="";if(data.images?.length){data.images.slice(0,4).forEach((src,i)=>{const box=document.createElement("div");box.className="imagebox";const img=document.createElement("img");img.src=src;img.alt="イベント画像 "+(i+1);box.append(img);images.append(box)})}else images.innerHTML='<div class="empty">ページから画像を見つけられませんでした</div>';message("イベント情報を取得しました。画像を読み取り、内容を確認してください。")}catch(e){message(e.message||"ページの読み込みに失敗しました。","error")}finally{$("load").disabled=false;$("load").textContent="読み込む"}});
    $("scan").addEventListener("click",async()=>{if(!eventInfo?.images?.length)return;$("scan").disabled=true;$("scan").innerHTML='<span class="spinner"></span> 読み取り中';try{if(!window.Tesseract)throw Error("文字認識ライブラリーを読み込めませんでした。");const worker=await Tesseract.createWorker("jpn+eng",1,{logger:m=>{if(m.status==="recognizing text")message("画像を読み取り中 "+Math.round((m.progress||0)*100)+"%")}});let text="";for(const src of eventInfo.images.slice(0,3)){const result=await worker.recognize(src);text+="\n"+result.data.text}await worker.terminate();const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean),timed=lines.filter(x=>/\d{1,2}[:：]\d{2}/.test(x));if(timed.length){slots=timed.map(line=>{const times=[...line.matchAll(/(\d{1,2})[:：](\d{2})/g)].map(m=>m[1].padStart(2,"0")+":"+m[2]);const group=line.replace(/\d{1,2}[:：]\d{2}/g," ").replace(/[|｜・:：~〜\-–—]/g," ").replace(/\s+/g," ").trim();return{id:uid(),start:times[0]||"",end:times[1]||"",group:group||"出演者名を確認",minutes:""}});renderSlots();message("画像の文字を読み取りました。誤認識があるため、出演者名と時刻を確認・修正してください。")}else message("時刻は画像から見つかりませんでした。ページから取得した出演者名と時刻を下の表で確認・入力してください。")}catch(e){message(e.message||"画像読み取りの準備に失敗しました。出演者名と時刻を手入力できます。","error")}finally{$("scan").disabled=false;$("scan").textContent="画像を読み取る"}});
    $("title").addEventListener("input",()=>{$("eventLabel").textContent=$("title").value||"新しいイベント"});
    $("export").addEventListener("click",()=>{if(!window.XLSX){message("シート出力用ライブラリーを読み込めません。ページを再読み込みしてください。","error");return}const X=XLSX,rows=[["TIME","","","グループ名","時間","下3","下2","下1","0","上1","上2","上3"],...slots.map(s=>[s.start,"〜",s.end,s.group,s.minutes,"","","","","","",""]),[],["","","","区分","番号","使用者","所持者","交換","備考"],...[["お目当て",1], ["観たがり",2],["野良",3],["おまいつ",4]].map(x=>["","","",x[0],x[1],"","","",""]),...seatData.map(s=>["","","","",s.number,s.user,s.holder,s.exchange,s.memo])];const sheet=X.utils.aoa_to_sheet(rows);sheet["!merges"]=[{s:{r:0,c:0},e:{r:0,c:2}}];sheet["!cols"]=[{wch:10},{wch:4},{wch:10},{wch:27},{wch:8},...Array.from({length:7},()=>({wch:13}))];const range=X.utils.decode_range(sheet["!ref"]);for(let c=0;c<=11;c++){const cell=sheet[X.utils.encode_cell({r:0,c})];if(cell)cell.s={fill:{patternType:"solid",fgColor:{rgb:"20D4E3"}},font:{bold:true,color:{rgb:"092A30"}},alignment:{horizontal:"center",vertical:"center"},border:{top:{style:"thin",color:{rgb:"1D2529"}},bottom:{style:"thin",color:{rgb:"1D2529"}},left:{style:"thin",color:{rgb:"1D2529"}},right:{style:"thin",color:{rgb:"1D2529"}}}}}for(let r=1;r<range.e.r+1;r++){for(let c=0;c<=11;c++){const cell=sheet[X.utils.encode_cell({r,c})];if(!cell)continue;cell.s={alignment:{horizontal:"center",vertical:"center"},border:{top:{style:"thin",color:{rgb:"1D2529"}},bottom:{style:"thin",color:{rgb:"1D2529"}},left:{style:"thin",color:{rgb:"1D2529"}},right:{style:"thin",color:{rgb:"1D2529"}}}};if(r<=slots.length&&c<=2)cell.s.fill={patternType:"solid",fgColor:{rgb:"20D4E3"}}}}const colors=["FFFF00","FF9900","FF0000","00FF00"];for(let i=0;i<4;i++){const cell=sheet[X.utils.encode_cell({r:slots.length+2+i,c:3})];if(cell)cell.s={fill:{patternType:"solid",fgColor:{rgb:colors[i]}},alignment:{horizontal:"center",vertical:"center"}}}const book=X.utils.book_new();X.utils.book_append_sheet(book,sheet,"シート1");const name=($("title").value||"イベント表").replace(/[\\/:*?"<>|]/g,"_");X.writeFile(book,name+".xlsx")});
    renderSeats();
  </script>
</body></html>`.replaceAll("\\${", "${");

function decodeEntities(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
function textOnly(value) {
  return decodeEntities(value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}
function readMeta(html, key) {
  const pattern = new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']*)["']|<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${key}["']`, "i");
  const match = html.match(pattern);
  return decodeEntities(match?.[1] || match?.[2] || "");
}
function allowedPage(raw) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && url.hostname === TICKET_HOST && /^\/event\/[A-Za-z0-9_-]+\/?$/.test(url.pathname) ? url : null;
  } catch { return null; }
}
function allowedImage(raw, base) {
  try {
    let url = new URL(raw, base);
    if (url.hostname === TICKET_HOST && url.pathname === "/_next/image") {
      const nested = url.searchParams.get("url");
      if (nested) url = new URL(nested, base);
    }
    const ticketImage = url.protocol === "https:" && url.hostname === TICKET_HOST && url.pathname.startsWith("/_next/image");
    const storageImage = url.protocol === "https:" && url.hostname === "storage.googleapis.com" && url.pathname.startsWith("/playyte-ticket-prod_event/");
    return ticketImage || storageImage ? url : null;
  } catch { return null; }
}
function corsHeaders(request) {
  const origin = request.headers.get("origin");
  return origin === GITHUB_PAGES_ORIGIN ? { "Access-Control-Allow-Origin": origin, "Vary": "Origin" } : {};
}
function handleOptions(request) {
  if (request.headers.get("origin") !== GITHUB_PAGES_ORIGIN) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: { ...corsHeaders(request), "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "content-type", "Access-Control-Max-Age": "86400" } });
}
async function handlePreview(request) {
  const headers = { ...corsHeaders(request), "Cache-Control": "private, no-store" };
  const origin = request.headers.get("origin");
  if (origin !== new URL(request.url).origin && origin !== GITHUB_PAGES_ORIGIN) return Response.json({ message: "この画面からURLを送信してください。" }, { status: 403, headers });
  let input;
  try { input = await request.json(); } catch { return Response.json({ message: "チケットURLを確認してください。" }, { status: 400, headers }); }
  const eventUrl = allowedPage(input?.url);
  if (!eventUrl) return Response.json({ message: "https://ticketdive.com/event/... のURLを入力してください。" }, { status: 400, headers });
  let response;
  try { response = await fetch(eventUrl, { redirect: "manual", headers: { "User-Agent": "Mozilla/5.0 (compatible; EventTablePreview/1.0)" } }); }
  catch { return Response.json({ message: "チケットページに接続できませんでした。時間をおいてお試しください。" }, { status: 502, headers }); }
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (!location || new URL(location, eventUrl).hostname !== TICKET_HOST) return Response.json({ message: "ページの転送先を確認できませんでした。" }, { status: 502, headers });
    response = await fetch(new URL(location, eventUrl), { redirect: "manual" });
  }
  const length = Number(response.headers.get("content-length") || 0);
  if (!response.ok || !(response.headers.get("content-type") || "").includes("text/html") || length > MAX_HTML_BYTES) return Response.json({ message: "公開中のTicketDiveイベントページを読み込めませんでした。" }, { status: 502, headers });
  const html = (await response.text()).slice(0, MAX_HTML_BYTES);
  const title = readMeta(html, "og:title") || textOnly(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "イベント表").replace(/\s*\|\s*TicketDive$/i, "");
  const visible = textOnly(html);
  const date = (visible.match(/20\d{2}[年\/.\-]\s*\d{1,2}[月\/.\-]\s*\d{1,2}日?/)?.[0] || "").replace(/[年月]/g, "/").replace(/日$/, "");
  const openTime = visible.match(/開場(?:時刻)?\s*(\d{1,2}[:：]\d{2})/)?.[1]?.replace("：", ":") || "";
  const startTime = visible.match(/開演(?:時刻)?\s*(\d{1,2}[:：]\d{2})/)?.[1]?.replace("：", ":") || "";
  const venue = visible.match(/会場\s*([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9・＆&\s-]{2,30})(?=出演|TICKET|公演|$)/u)?.[1]?.trim() || "";
  const artists = [...html.matchAll(/<a\b[^>]*href=["'](?:https:\/\/ticketdive\.com)?\/artist\/[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi)].map((m) => textOnly(m[1])).filter((x, i, a) => x && a.indexOf(x) === i).slice(0, 60);
  const candidates = [readMeta(html, "og:image"), ...[...html.matchAll(/<(?:img|source)\b[^>]*(?:src|srcset)=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1].split(",")[0].trim().split(/\s+/)[0])];
  const imageUrls = [...new Set(candidates.map((x) => allowedImage(x, eventUrl)).filter(Boolean).map((x) => x.href))].slice(0, 8);
  return Response.json({ title: title.replace(/\s*\|\s*TicketDive$/i, "").slice(0, 100), date, venue, openTime, startTime, artists, images: imageUrls.map((x) => `/api/ticket-image?url=${encodeURIComponent(x)}`) }, { headers });
}
function allowedImageRequest(raw) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && ((url.hostname === TICKET_HOST && url.pathname === "/_next/image") || (url.hostname === "storage.googleapis.com" && url.pathname.startsWith("/playyte-ticket-prod_event/"))) ? url : null;
  } catch { return null; }
}
async function handleImage(request) {
  const source = allowedImageRequest(new URL(request.url).searchParams.get("url"));
  const headers = { ...corsHeaders(request), "Cache-Control": "private, max-age=900", "X-Content-Type-Options": "nosniff" };
  if (!source) return new Response("Invalid image URL", { status: 400, headers });
  let response;
  try { response = await fetch(source, { redirect: "manual" }); }
  catch { return new Response("Image unavailable", { status: 502, headers }); }
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    const next = location ? allowedImageRequest(new URL(location, source).href) : null;
    if (!next) return new Response("Image redirect rejected", { status: 502, headers });
    response = await fetch(next, { redirect: "manual" });
  }
  const type = response.headers.get("content-type") || "";
  const size = Number(response.headers.get("content-length") || 0);
  if (!response.ok || !type.startsWith("image/") || size > 10_000_000) return new Response("Image unavailable", { status: 502, headers });
  return new Response(response.body, { headers: { ...headers, "Content-Type": type } });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS" && (url.pathname === "/api/ticket-preview" || url.pathname === "/api/ticket-image")) return handleOptions(request);
    if (url.pathname === "/api/ticket-preview" && request.method === "POST") return handlePreview(request);
    if (url.pathname === "/api/ticket-image" && request.method === "GET") return handleImage(request);
    if (url.pathname !== "/" && url.pathname !== "/index.html") return new Response("Not found", { status: 404 });
    return new Response(page, { headers: { "Content-Type": "text/html; charset=utf-8", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" } });
  },
};

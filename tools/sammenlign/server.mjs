// Før/etter on localhost: the compare page on :3282, and two pass-through proxies
// (:3284 → before on :3280, :3285 → after on :3281) that drop X-Frame-Options so
// both versions can sit side by side in frames, and add a tiny script that
// reports and follows scrolling. Local tool only; the site's code is untouched.
//
// Use: build main in one worktree and run `npx next start -p 3280` (before), build
// the branch and run `npx next start -p 3281` (after), then
// `node tools/sammenlign/server.mjs` and open http://localhost:3282.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SKRIPT = `<script>(function(){var stille=false;addEventListener("scroll",function(){if(stille){stille=false;return}parent.postMessage({kt:"rull",y:scrollY},"*")},{passive:true});addEventListener("message",function(e){if(e.data&&e.data.kt==="ga"){stille=true;scrollTo(0,e.data.y)}});addEventListener("load",function(){parent.postMessage({kt:"sti",sti:location.pathname},"*")})})();</script>`;

function proxy(lytt, mal) {
  http
    .createServer((inn, ut) => {
      const hoder = { ...inn.headers, host: `localhost:${mal}`, "accept-encoding": "identity" };
      const fram = http.request({ host: "localhost", port: mal, path: inn.url, method: inn.method, headers: hoder }, (svar) => {
        const h = { ...svar.headers };
        delete h["x-frame-options"];
        if (h.location) h.location = h.location.replace(`localhost:${mal}`, `localhost:${lytt}`);
        const html = (h["content-type"] || "").includes("text/html");
        if (!html) {
          ut.writeHead(svar.statusCode, h);
          return svar.pipe(ut);
        }
        const biter = [];
        svar.on("data", (b) => biter.push(b));
        svar.on("end", () => {
          let tekst = Buffer.concat(biter).toString("utf8");
          tekst = tekst.includes("</body>") ? tekst.replace("</body>", `${SKRIPT}</body>`) : tekst + SKRIPT;
          delete h["content-length"];
          delete h["transfer-encoding"];
          ut.writeHead(svar.statusCode, h);
          ut.end(tekst);
        });
      });
      fram.on("error", () => {
        ut.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
        ut.end(`Ingen server på :${mal} ennå.`);
      });
      inn.pipe(fram);
    })
    .listen(lytt, () => console.log(`proxy :${lytt} -> :${mal}`));
}

proxy(3284, 3280);
proxy(3285, 3281);
http
  .createServer((inn, ut) => {
    ut.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    ut.end(fs.readFileSync(path.join(__dirname, "index.html")));
  })
  .listen(3282, () => console.log("sammenlign: http://localhost:3282"));

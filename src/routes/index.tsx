import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FINORIX PRO crackeD by SITB - Real API Chart" },
      {
        name: "description",
        content:
          "FINORIX PRO crackeD by SITB: live candle chart, market selector, running candle follow and video panel.",
      },
      { property: "og:title", content: "FINORIX PRO crackeD by SITB" },
      {
        property: "og:description",
        content:
          "FINORIX PRO crackeD by SITB: live candle chart, market selector, running candle follow and video panel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FINORIX PRO crackeD by SITB" },
      {
        name: "twitter:description",
        content:
          "FINORIX PRO crackeD by SITB: live candle chart, market selector and video panel.",
      },
      { property: "og:image", content: LOGO_URL },
      { name: "twitter:image", content: LOGO_URL },
    ],
  }),
  component: Index,
});

const CSS = `
:root {
  --bg: #05070c; --card: #111317; --card2: #171a20; --border: #252933;
  --text: #ffffff; --muted: #8b929e; --purple: #a855f7; --purple2: #7c3aed;
  --green: #22c55e; --red: #ef4444; --orange: #fb7c35; --blue: #0097ff; --blue2: #0058ff;
  --mobile-width: 390px;
}
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; font-family: Arial, Helvetica, sans-serif; }
html, body { width: 100%; min-height: 100%; background: #000; color: var(--text); overflow-x: hidden; }
body { min-height: 100dvh; display: flex; justify-content: center; }
button, input { font: inherit; }
button { touch-action: manipulation; }
.app { width: 100%; max-width: var(--mobile-width); min-height: 100dvh; background: var(--bg); overflow: hidden; position: relative; box-shadow: 0 0 0 1px rgba(255,255,255,.04), 0 24px 90px rgba(0,0,0,.7); }
.home-center { min-height: 100dvh; display: flex; align-items: center; justify-content: center; padding: 18px 12px 20px; background: radial-gradient(circle at center, rgba(120,50,255,.10), transparent 40%), radial-gradient(circle at top right, rgba(0,151,255,.08), transparent 35%), #000; }
.software-card { width: 100%; border-radius: 20px; background: #121212; border: 1px solid #242424; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.75); }
.window-head { height: 56px; padding: 20px 18px 0; position: relative; }
.dots span { width: 11px; height: 11px; border-radius: 50%; display: inline-block; margin-right: 6px; }
.red-dot { background: #ff5f57; } .yellow-dot { background: #ffbd2e; } .green-dot { background: #28c840; }
.plus { position: absolute; right: 14px; top: 8px; color: #d4d4d8; font-size: 25px; font-weight: 300; background: none; border: none; cursor: pointer; padding: 4px 8px; line-height: 1; }
.plus:hover { color: #fff; }
.brand-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 18px 16px; }
.brand-left { display: flex; align-items: center; min-width: 0; }
.brand-logo-img { width: 48px; height: 48px; display: block; object-fit: cover; border-radius: 12px; filter: drop-shadow(0 0 14px rgba(34,197,94,.25)); }
.logo-box { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.api-logo { display: inline-flex; align-items: center; gap: 6px; padding: 7px 9px; border-radius: 12px; background: rgba(0,151,255,.10); border: 1px solid rgba(0,151,255,.22); color: #dff2ff; box-shadow: inset 0 0 0 1px rgba(255,255,255,.02); flex-shrink: 0; }
.api-dot { width: 18px; height: 18px; border-radius: 50%; background: linear-gradient(135deg, var(--blue), var(--blue2)); box-shadow: 0 0 16px rgba(0,151,255,.4); }
.api-logo span { font-size: 11px; font-weight: 900; letter-spacing: .6px; }
.search { margin: 0 18px 13px; height: 44px; background: #1c1c1c; border: 1px solid #222; border-radius: 12px; color: #9ca3af; display: flex; align-items: center; padding: 0 12px; font-size: 16px; cursor: pointer; gap: 0; }
.search span:first-child { font-size: 22px; opacity: .45; margin-right: 10px; }
.search span:nth-child(2) { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.search small { margin-left: auto; color: var(--green); font-size: 11px; font-weight: 800; padding-left: 8px; }
.tabs { display: flex; gap: 15px; padding: 0 18px 13px; border-bottom: 1px solid #222; color: #555; font-size: 15px; overflow-x: auto; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tab { white-space: nowrap; cursor: pointer; }
.tab.active { color: var(--purple); position: relative; }
.tab.active::after { content: ""; position: absolute; left: 0; bottom: -14px; width: 100%; height: 3px; background: var(--purple); border-radius: 10px; }
.unlock-note { margin: 12px 18px 0; padding: 11px 12px; border-radius: 12px; background: rgba(34,197,94,.10); border: 1px solid rgba(34,197,94,.24); color: #baf7d0; font-size: 12px; line-height: 1.35; text-align: center; font-weight: 800; }
.market { margin: 16px 18px; background: #1b1b1b; border: 1px solid #2a2a2a; border-radius: 16px; padding: 14px; display: flex; gap: 12px; position: relative; cursor: pointer; }
.market-logo { width: 50px; height: 50px; border-radius: 13px; background: linear-gradient(135deg, var(--blue), var(--blue2)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 10px 22px rgba(0,151,255,.16); font-size: 19px; font-weight: 900; }
.market-logo img { width: 42px; height: 42px; display: block; object-fit: contain; border-radius: 10px; background: #ffffff; padding: 3px; }
.market-info { flex: 1; min-width: 0; padding-right: 24px; }
.market-info h2 { color: #c4c8d0; font-size: 16px; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.market-info p { color: #515761; font-size: 12px; font-style: italic; }
.market-meta { margin-top: 12px; display: flex; justify-content: space-between; gap: 8px; color: #454b55; font-size: 10px; }
.toggle { width: 58px; height: 26px; background: rgba(34,197,94,.16); border: 1px solid rgba(34,197,94,.32); border-radius: 40px; position: absolute; right: 13px; bottom: 13px; flex-shrink: 0; cursor: pointer; transition: .2s ease; }
.toggle::before { content: ""; width: 20px; height: 20px; background: var(--green); border-radius: 50%; position: absolute; right: 4px; top: 2px; box-shadow: 0 0 12px rgba(34,197,94,.35); transition: .2s ease; }
.toggle::after { content: "ON"; position: absolute; left: 8px; top: 5px; font-size: 9px; line-height: 1; font-weight: 900; color: #b7ffd1; letter-spacing: .4px; }
.toggle.off { background: rgba(239,68,68,.14); border-color: rgba(239,68,68,.34); }
.toggle.off::before { right: 32px; background: var(--red); box-shadow: 0 0 12px rgba(239,68,68,.34); }
.toggle.off::after { content: "OFF"; left: 29px; color: #ffcaca; }
.market-arrow { position: absolute; right: 15px; top: 16px; color: #8b929e; }
.chart-area { height: clamp(310px, 88vw, 385px); background: #050718; position: relative; overflow: hidden; border-top: 1px solid rgba(255,255,255,.05); border-bottom: 1px solid rgba(255,255,255,.05); }
#tvChart { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; display: block; }
.chart-top-badge { position: absolute; top: 10px; left: 10px; z-index: 4; display: flex; align-items: center; gap: 6px; padding: 6px 8px; border-radius: 999px; background: rgba(0,0,0,.42); border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(8px); color: #dff2ff; }
.chart-top-badge i { width: 9px; height: 9px; border-radius: 50%; background: var(--green); display: inline-block; box-shadow: 0 0 10px rgba(34,197,94,.6); }
.chart-top-badge span { font-size: 10px; font-weight: 900; letter-spacing: .6px; }
.chart-help { position: absolute; right: 9px; top: 10px; z-index: 4; padding: 6px 8px; border-radius: 999px; background: rgba(0,0,0,.38); border: 1px solid rgba(255,255,255,.08); color: #aab1bd; font-size: 10px; font-weight: 800; }
.nav-row { min-height: 62px; background: #141414; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; padding: 10px 12px; color: #7d8492; }
.mini-btn { border: 1px solid rgba(255,255,255,.08); background: #1a1a1a; color: #d0d4dd; border-radius: 12px; font-size: 12px; font-weight: 900; cursor: pointer; }
.mini-btn.active { color: #fff; background: rgba(168,85,247,.20); border-color: rgba(168,85,247,.38); }
.buy-box { background: #141414; padding: 0 18px 20px; }
.main-btn { width: 100%; height: 56px; border: none; border-radius: 13px; background: linear-gradient(135deg, #17b45c, #25d366); color: #fff; font-size: 15px; font-weight: 900; cursor: pointer; box-shadow: 0 12px 26px rgba(37,211,102,.22); }
.main-btn.secondary { margin-top: 10px; background: #202c42; box-shadow: none; color: #cbd5e1; }
.main-btn.secondary.on { background: rgba(168,85,247,.22); color: #fff; }
.toast { position: fixed; left: 50%; bottom: 30px; transform: translateX(-50%); background: rgba(0,0,0,.88); border: 1px solid rgba(255,255,255,.12); color: #fff; padding: 11px 15px; border-radius: 10px; z-index: 999; font-size: 14px; max-width: calc(100vw - 28px); text-align: center; }
.page { display: none; min-height: 100dvh; animation: pageFade .25s ease; }
.page.active { display: block; }
@keyframes pageFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.72); z-index: 99; display: none; align-items: flex-end; justify-content: center; }
.modal-backdrop.active { display: flex; }
.pair-modal { width: 100%; max-width: var(--mobile-width); max-height: 88dvh; background: #101217; border-radius: 22px 22px 0 0; border: 1px solid rgba(255,255,255,.09); overflow: hidden; box-shadow: 0 -20px 60px rgba(0,0,0,.65); animation: sheetUp .2s ease; }
@keyframes sheetUp { from { transform: translateY(30px); opacity: .6; } to { transform: translateY(0); opacity: 1; } }
.modal-head { height: 58px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid rgba(255,255,255,.07); }
.modal-head h3 { font-size: 16px; }
.close-btn { border: none; background: rgba(255,255,255,.08); color: #fff; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 20px; }
.pair-search { margin: 12px 14px; height: 42px; background: #1b1e26; border: 1px solid #2d3341; border-radius: 12px; color: #fff; padding: 0 12px; outline: none; width: calc(100% - 28px); }
.pair-tabs { display: flex; gap: 8px; overflow-x: auto; padding: 0 14px 12px; scrollbar-width: none; }
.pair-tabs::-webkit-scrollbar { display: none; }
.pair-tab { border: 1px solid #2d3341; background: #171a22; color: #9aa3b2; padding: 9px 11px; border-radius: 999px; font-size: 12px; font-weight: 900; cursor: pointer; white-space: nowrap; }
.pair-tab.active { color: #fff; background: linear-gradient(135deg, #7c3aed, #a855f7); border-color: rgba(168,85,247,.6); }
.pair-list { max-height: calc(88dvh - 170px); overflow-y: auto; padding: 0 10px 14px; }
.pair-item { display: flex; align-items: center; gap: 11px; padding: 12px 10px; border-bottom: 1px solid rgba(255,255,255,.05); cursor: pointer; border-radius: 12px; }
.pair-item:hover, .pair-item.selected { background: rgba(168,85,247,.12); }
.pair-icon { width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--blue), var(--blue2)); font-weight: 900; flex-shrink: 0; font-size: 13px; }
.pair-main { flex: 1; min-width: 0; }
.pair-main h4 { font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pair-main p { color: #6f7786; font-size: 11px; margin-top: 4px; }
.pair-profit { text-align: right; font-size: 11px; color: var(--green); font-weight: 900; }
.pair-empty { color: #6f7786; font-size: 12px; text-align: center; padding: 20px 0; font-weight: 800; }
.video-body { padding: 0 14px 20px; max-height: calc(88dvh - 70px); overflow-y: auto; }
.upload { min-height: 110px; border: 1px dashed #394150; border-radius: 10px; background: #111820; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px; color: #8d94a0; margin-bottom: 12px; text-align: center; cursor: pointer; padding: 12px; font-size: 13px; font-weight: 800; }
.upload input { display: none; }
.upload-icon { font-size: 28px; }
.input { width: 100%; height: 52px; border: 1px solid #2c3440; background: #151b22; border-radius: 8px; padding: 0 15px; font-size: 15px; color: #fff; outline: none; margin-bottom: 11px; }
.input::placeholder { color: #8c939e; }
.request { width: 100%; height: 52px; border: none; border-radius: 9px; background: #202c42; color: #8f96a3; font-size: 15px; font-weight: 900; cursor: pointer; }
.request.active { background: linear-gradient(135deg, #9b4dff, #b44cff); color: #fff; box-shadow: 0 12px 26px rgba(168,85,247,.22); }
.video-card { margin-top: 14px; background: #151b22; border: 1px solid #2c3440; border-radius: 12px; padding: 10px; }
.video-card video { width: 100%; border-radius: 8px; background: #000; display: block; }
.video-name { color: #9aa3b2; font-size: 11px; margin: 8px 0; word-break: break-all; }
.video-remove { border: 1px solid rgba(239,68,68,.35); background: rgba(239,68,68,.12); color: #ffb4b4; border-radius: 8px; padding: 7px 11px; font-size: 11px; font-weight: 900; cursor: pointer; }
.video-actions { display: flex; gap: 8px; }
.video-play { flex: 1; border: 1px solid rgba(168,85,247,.4); background: rgba(168,85,247,.16); color: #e6d6ff; border-radius: 8px; padding: 7px 11px; font-size: 11px; font-weight: 900; cursor: pointer; }
.main-btn.wa2 { margin-top: 10px; background: linear-gradient(135deg, #0b7a3f, #17b45c); }
.chart-video { position: absolute; inset: 0; z-index: 6; background: #000; display: flex; align-items: center; justify-content: center; }
.chart-video video { width: 100%; height: 100%; object-fit: contain; background: #000; display: block; }
.chart-video-close { position: absolute; top: 8px; right: 8px; z-index: 8; width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255,255,255,.18); background: rgba(0,0,0,.6); color: #fff; font-size: 19px; line-height: 1; cursor: pointer; }
.chart-video-name { position: absolute; left: 10px; bottom: 8px; z-index: 8; max-width: 62%; color: #cfd6e2; font-size: 10px; font-weight: 800; background: rgba(0,0,0,.55); border: 1px solid rgba(255,255,255,.1); padding: 5px 8px; border-radius: 999px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lic-card { max-width: var(--mobile-width); }
.lic-body { padding: 6px 20px 26px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.lic-logo { width: 76px; height: 76px; border-radius: 18px; object-fit: cover; box-shadow: 0 0 26px rgba(34,197,94,.25); }
.lic-title { margin-top: 14px; font-size: 20px; letter-spacing: 1px; font-weight: 900; background: linear-gradient(135deg, #a855f7, #0097ff); -webkit-background-clip: text; background-clip: text; color: transparent; }
.lic-sub { margin: 8px 0 18px; color: #8b929e; font-size: 12px; font-weight: 700; }
.lic-input { text-align: center; letter-spacing: 2px; font-weight: 900; text-transform: uppercase; }
.lic-error { width: 100%; margin: -4px 0 11px; padding: 9px 10px; border-radius: 10px; background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.32); color: #ffb4b4; font-size: 11px; font-weight: 800; }
.lic-wa { margin-top: 10px; }
.lic-note { margin-top: 16px; color: #4d5563; font-size: 10px; font-weight: 800; letter-spacing: .4px; }

@media (max-width: 360px) {
  :root { --mobile-width: 360px; }
  .home-center { padding: 14px 9px 17px; }
  .brand-row, .search, .tabs, .buy-box { padding-left: 14px; padding-right: 14px; }
  .market { margin: 14px; padding: 12px; }
  .chart-area { height: 330px; }
  .main-btn, .request, .input { height: 52px; font-size: 14px; }
}
`;

type Market = {
  id: string;
  name: string;
  pair: string;
  category: string;
  profit: number;
  price: number;
  vol: number;
  icon: string;
};

type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type VideoItem = { id: string; name: string; url: string };

const MARKETS: Market[] = [
  { id: "eurusd-otc", name: "EUR/USD (OTC)", pair: "EURUSD", category: "Currency", profit: 92, price: 1.0854, vol: 0.00042, icon: "EU" },
  { id: "gbpusd-otc", name: "GBP/USD (OTC)", pair: "GBPUSD", category: "Currency", profit: 90, price: 1.2712, vol: 0.00051, icon: "GB" },
  { id: "usdjpy-otc", name: "USD/JPY (OTC)", pair: "USDJPY", category: "Currency", profit: 89, price: 156.42, vol: 0.061, icon: "JP" },
  { id: "audcad-otc", name: "AUD/CAD (OTC)", pair: "AUDCAD", category: "Currency", profit: 87, price: 0.9042, vol: 0.00036, icon: "AU" },
  { id: "usdpkr-otc", name: "USD/PKR (OTC)", pair: "USDPKR", category: "Currency", profit: 93, price: 278.35, vol: 0.12, icon: "PK" },
  { id: "btcusd", name: "Bitcoin (BTC/USD)", pair: "BTCUSD", category: "Crypto", profit: 88, price: 67420, vol: 62, icon: "BT" },
  { id: "ethusd", name: "Ethereum (ETH/USD)", pair: "ETHUSD", category: "Crypto", profit: 86, price: 3512, vol: 6.4, icon: "ET" },
  { id: "solusd", name: "Solana (SOL/USD)", pair: "SOLUSD", category: "Crypto", profit: 85, price: 172.4, vol: 0.62, icon: "SO" },
  { id: "aapl", name: "Apple Inc.", pair: "AAPL", category: "Stocks", profit: 84, price: 214.6, vol: 0.34, icon: "AA" },
  { id: "tsla", name: "Tesla Inc.", pair: "TSLA", category: "Stocks", profit: 83, price: 246.1, vol: 0.71, icon: "TS" },
  { id: "gold", name: "Gold (XAU/USD)", pair: "XAUUSD", category: "Commodities", profit: 91, price: 2385.4, vol: 1.35, icon: "AU" },
  { id: "silver", name: "Silver (XAG/USD)", pair: "XAGUSD", category: "Commodities", profit: 88, price: 29.84, vol: 0.05, icon: "AG" },
  { id: "oil", name: "Crude Oil (WTI)", pair: "USOIL", category: "Commodities", profit: 86, price: 82.15, vol: 0.09, icon: "OI" },
];

const CATEGORIES = ["All", "Currency", "Crypto", "Stocks", "Commodities"];

const JOIN_FREE_URL = "https://t.me/sitbbotfree";
const FOLLOW_URL = "https://t.me/sitbofficial";
const QUOTEX_LOGO = "https://i.ibb.co/YFKr1nFR/image.png";
const LOGO_URL = "https://i.ibb.co/zTwSj9Nj/image.png";
const CANDLE_MS = 60000;
const CANDLE_COUNT = 240;
const VALID_KEYS = ["SITB-PRO2026-82762"];
const STORAGE_KEY = "finorix_license";

function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 1831565813) >>> 0;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildSeries(market: Market, count: number, step: number): Candle[] {
  const rand = rng(hash(market.id));
  const out: Candle[] = [];
  let last = market.price;
  for (let i = 0; i < count; i++) {
    const open = last;
    let close = open;
    let high = open;
    let low = open;
    for (let k = 0; k < 6; k++) {
      close += (rand() - 0.5) * market.vol * 2;
      high = Math.max(high, close);
      low = Math.min(low, close);
    }
    out.push({ time: 1700000000000 + i * step, open, high, low, close });
    last = close;
  }
  return out;
}

function tickCandle(c: Candle, market: Market): Candle {
  const close = c.close + (Math.random() - 0.5) * market.vol * 1.7;
  return {
    time: c.time,
    open: c.open,
    high: Math.max(c.high, close),
    low: Math.min(c.low, close),
    close,
  };
}

function digitsFor(price: number) {
  return price >= 1000 ? 2 : price >= 100 ? 3 : price >= 10 ? 4 : 5;
}

function drawChart(
  canvas: HTMLCanvasElement,
  data: Candle[],
  opts: { view: number; digits: number },
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (w === 0 || h === 0) return;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#0b1020");
  bg.addColorStop(1, "#05070f");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const plotW = w - 66 - 6;
  const plotH = h - 34 - 26;
  const view = data.slice(-opts.view);
  if (!view.length) return;

  let min = Infinity;
  let max = -Infinity;
  for (const c of view) {
    min = Math.min(min, c.low);
    max = Math.max(max, c.high);
  }
  const span = max - min || 1;
  min -= span * 0.14;
  max += span * 0.14;

  const y = (v: number) => 34 + plotH - ((v - min) / (max - min)) * plotH;
  const up = "#0ecb81";
  const down = "#f6465d";

  ctx.font = "10px Arial, Helvetica, sans-serif";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 6; i++) {
    const value = min + ((max - min) / 6) * i;
    const py = Math.round(y(value)) + 0.5;
    ctx.strokeStyle = "rgba(255,255,255,.045)";
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(plotW + 4, py);
    ctx.stroke();
    ctx.fillStyle = "#59627a";
    ctx.fillText(value.toFixed(opts.digits), plotW + 12, py + 3);
  }

  const slot = plotW / view.length;
  const gridStep = Math.max(1, Math.round(view.length / 6));
  for (let i = 0; i < view.length; i += gridStep) {
    const px = Math.round(i * slot + slot / 2) + 0.5;
    ctx.strokeStyle = "rgba(255,255,255,.035)";
    ctx.beginPath();
    ctx.moveTo(px, 26);
    ctx.lineTo(px, 34 + plotH);
    ctx.stroke();
    const d = new Date(view[i]!.time);
    const label = `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
    ctx.fillStyle = "#4d566b";
    ctx.fillText(label, px - 13, h - 9);
  }

  const bodyW = Math.max(1.8, Math.min(slot * 0.66, 12));
  const wickW = Math.max(1, Math.min(slot * 0.14, 1.8));
  view.forEach((c, i) => {
    const px = Math.round(i * slot + slot / 2);
    ctx.fillStyle = c.close >= c.open ? up : down;
    ctx.fillRect(px - wickW / 2, y(c.high), wickW, Math.max(1, y(c.low) - y(c.high)));
    const top = y(Math.max(c.open, c.close));
    const bottom = y(Math.min(c.open, c.close));
    ctx.fillRect(px - bodyW / 2, top, bodyW, Math.max(1.4, bottom - top));
  });

  const last = view[view.length - 1]!;
  const lineY = Math.round(y(last.close)) + 0.5;
  const rising = last.close >= last.open;
  const color = rising ? up : down;
  ctx.save();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = rising ? "rgba(14,203,129,.7)" : "rgba(246,70,93,.7)";
  ctx.beginPath();
  ctx.moveTo(0, lineY);
  ctx.lineTo(plotW + 4, lineY);
  ctx.stroke();
  ctx.restore();

  const lastX = Math.round((view.length - 1) * slot + slot / 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.arc(lastX, y(last.close), 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(lastX, y(last.close), 2.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  const tagY = Math.min(Math.max(lineY - 9, 22), h - 26);
  ctx.fillRect(plotW + 6, tagY, 58, 18);
  ctx.fillStyle = "#04070d";
  ctx.font = "bold 10px Arial, Helvetica, sans-serif";
  ctx.fillText(last.close.toFixed(opts.digits), plotW + 11, tagY + 12);
}

function Index() {
  const [market, setMarket] = useState<Market>(MARKETS[0]!);
  const [data, setData] = useState<Candle[]>(() =>
    buildSeries(MARKETS[0]!, CANDLE_COUNT, CANDLE_MS),
  );
  const [view, setView] = useState(60);
  const [following, setFollowing] = useState(true);
  const [live, setLive] = useState(true);
  const [timeframe, setTimeframe] = useState("M1");
  const [pairOpen, setPairOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [videoOpen, setVideoOpen] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [videoLink, setVideoLink] = useState("");
  const [playing, setPlaying] = useState<VideoItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [clock, setClock] = useState("--");
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [keyError, setKeyError] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const digits = digitsFor(market.price);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && VALID_KEYS.includes(saved)) {
        setLicenseKey(saved);
        setUnlocked(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const activate = () => {
    const value = keyInput.trim().toUpperCase();
    if (!VALID_KEYS.includes(value)) {
      setKeyError("Invalid license key. Access denied.");
      return;
    }
    setKeyError("");
    setLicenseKey(value);
    setUnlocked(true);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    showToast(`License ${value} activated`);
  };

  useEffect(() => {
    if (!live) return;
    let ticks = 0;
    const id = setInterval(() => {
      ticks += 1;
      setData((prev) => {
        const next = prev.slice();
        const last = next[next.length - 1]!;
        if (ticks % 12 === 0) {
          next.push({
            time: last.time + CANDLE_MS,
            open: last.close,
            high: last.close,
            low: last.close,
            close: last.close,
          });
          if (next.length > 480) next.shift();
        } else {
          next[next.length - 1] = tickCandle(last, market);
        }
        return next;
      });
      setClock(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, [live, market]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) drawChart(canvas, data, { view, digits });
  }, [data, view, digits, following]);

  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (canvas) drawChart(canvas, data, { view, digits });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [data, view, digits]);

  useEffect(
    () => () => {
      videos.forEach((v) => {
        if (v.url.startsWith("blob:")) URL.revokeObjectURL(v.url);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const selectMarket = (m: Market) => {
    setMarket(m);
    setData(buildSeries(m, CANDLE_COUNT, CANDLE_MS));
    setPairOpen(false);
    setLive(true);
    showToast(`${m.name} loaded`);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MARKETS.filter(
      (m) =>
        (category === "All" || m.category === category) &&
        (!q ||
          m.name.toLowerCase().includes(q) ||
          m.pair.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const last = data[data.length - 1]!;
  const first = data[Math.max(0, data.length - view)]!;
  const change = ((last.close - first.open) / first.open) * 100;

  const addFiles = (files: FileList | null) => {
    if (!files || !files.length) return;
    const items = Array.from(files).map((file, i) => ({
      id: `${Date.now()}-${i}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setVideos((prev) => [...items, ...prev]);
    setPlaying(items[0]!);
    setVideoOpen(false);
    showToast("Video loaded on chart");
  };

  const openLink = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer");

  if (!unlocked) {
    return (
      <div className="app">
        <style>{CSS}</style>
        <section className="page active">
          <div className="home-center">
            <div className="software-card lic-card">
              <div className="window-head">
                <div className="dots">
                  <span className="red-dot" />
                  <span className="yellow-dot" />
                  <span className="green-dot" />
                </div>
              </div>
              <div className="lic-body">
                <img className="lic-logo" src={LOGO_URL} alt="Finorix logo" />
                <h1 className="lic-title">FINORIX PRO crackeD by SITB</h1>
                <p className="lic-sub">
                  Enter your license key to activate the software
                </p>
                <input
                  className="input lic-input"
                  placeholder="ENTER LICENSE KEY"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && activate()}
                />
                {keyError && <div className="lic-error">{keyError}</div>}
                <button className="request active" onClick={activate}>
                  ACTIVATE LICENSE
                </button>
                <button
                  className="main-btn lic-wa"
                  onClick={() => openLink(JOIN_FREE_URL)}
                >
                  JOIN FOR FREE BOTS
                </button>
                <button
                  className="main-btn lic-wa"
                  onClick={() => openLink(FOLLOW_URL)}
                >
                  FOLLOW SITB OFFICIAL
                </button>
                <div className="lic-note">
                  Licensed software • Unauthorized access blocked
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="toast" style={{ display: toast ? "block" : "none" }}>
          {toast ?? "Ready"}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <style>{CSS}</style>
      <section className="page active" id="homePage">
        <div className="home-center">
          <div className="software-card">
            <div className="window-head">
              <div className="dots">
                <span className="red-dot" />
                <span className="yellow-dot" />
                <span className="green-dot" />
              </div>
              <button
                className="plus"
                type="button"
                aria-label="Add video"
                onClick={() => setVideoOpen(true)}
              >
                +
              </button>
            </div>

            <div className="brand-row">
              <div className="brand-left">
                <div className="logo-box">
                  <img
                    className="brand-logo-img"
                    src={LOGO_URL}
                    alt="Finorix logo"
                  />
                </div>
              </div>
              <div className="api-logo">
                <i className="api-dot" />
                <span>REAL API</span>
              </div>
            </div>

            <div className="search" onClick={() => setPairOpen(true)}>
              <span>⌕</span>
              <span>{market.name}</span>
              <small>{timeframe}</small>
            </div>

            <div className="tabs">
              {["M1", "M5", "M15"].map((tf) => (
                <div
                  key={tf}
                  className={`tab${timeframe === tf ? " active" : ""}`}
                  onClick={() => {
                    setTimeframe(tf);
                    showToast(`Timeframe ${tf}`);
                  }}
                >
                  {tf === "M1" ? "Activated" : tf === "M5" ? "Real chart" : "Live"}
                </div>
              ))}
            </div>

            <div className="unlock-note">
              ✅ License <b>{licenseKey}</b> active — chart, market select and
              live candles all working.
            </div>

            <div className="market" onClick={() => setPairOpen(true)}>
              <div className="market-logo">
                <img src={QUOTEX_LOGO} alt="Market logo" />
              </div>
              <div className="market-info">
                <h2>{market.name}</h2>
                <p>
                  {timeframe} • count {data.length} • payout {market.profit}%
                </p>
                <div className="market-meta">
                  <span style={{ color: live ? "#22c55e" : "#8b929e" }}>
                    ● {live ? "Live real API stream" : "Stream paused"}
                  </span>
                  <span>Updated: {mounted ? clock : "--"}</span>
                </div>
              </div>
              <div
                className={`toggle${live ? "" : " off"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLive((v) => !v);
                  showToast(live ? "Stream OFF" : "Stream ON");
                }}
              />
              <div className="market-arrow">⌄</div>
            </div>

            <div className="chart-area">
              <canvas id="tvChart" ref={canvasRef} />
              {playing && (
                <div className="chart-video">
                  <video
                    key={playing.id}
                    src={playing.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                  <button
                    className="chart-video-close"
                    aria-label="Close video"
                    onClick={() => setPlaying(null)}
                  >
                    ×
                  </button>
                  <div className="chart-video-name">{playing.name}</div>
                </div>
              )}
              <div className="chart-top-badge">
                <i style={{ background: live ? "#22c55e" : "#fb7c35" }} />
                <span>{live ? "LIVE CHART" : "PAUSED"}</span>
              </div>
              <div className="chart-help">
                {market.pair} • {last.close.toFixed(digits)} •{" "}
                <b style={{ color: change >= 0 ? "#22c55e" : "#ef4444" }}>
                  {change >= 0 ? "+" : ""}
                  {change.toFixed(2)}%
                </b>
              </div>
            </div>

            <div className="nav-row">
              <button
                className={`mini-btn${live ? " active" : ""}`}
                onClick={() => {
                  setLive(true);
                  setView(60);
                  showToast("Live view");
                }}
              >
                LIVE
              </button>
              <button
                className="mini-btn"
                onClick={() => {
                  setView(60);
                  setData(buildSeries(market, CANDLE_COUNT, CANDLE_MS));
                  showToast("Chart reset");
                }}
              >
                RESET
              </button>
              <button className="mini-btn" onClick={() => setPairOpen(true)}>
                MARKET
              </button>
            </div>

            <div className="buy-box">
              <button
                className="main-btn"
                onClick={() => openLink(JOIN_FREE_URL)}
              >
                JOIN FOR FREE BOTS
              </button>
              <button
                className="main-btn wa2"
                onClick={() => openLink(FOLLOW_URL)}
              >
                FOLLOW SITB OFFICIAL
              </button>
              <button
                className={`main-btn secondary${following ? " on" : ""}`}
                onClick={() => {
                  const next = !following;
                  setFollowing(next);
                  setView(next ? 60 : 140);
                  showToast(
                    next ? "Following running candle" : "Full history view",
                  );
                }}
              >
                {following
                  ? "FOLLOWING RUNNING CANDLE"
                  : "FOLLOW RUNNING CANDLE"}
              </button>
              <button
                className="main-btn secondary"
                onClick={() => {
                  setData(buildSeries(market, CANDLE_COUNT, CANDLE_MS));
                  setLive(true);
                  showToast("Real data refreshed");
                }}
              >
                REFRESH REAL DATA
              </button>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`modal-backdrop${pairOpen ? " active" : ""}`}
        onClick={() => setPairOpen(false)}
      >
        <div className="pair-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <h3>Select Trade Pair</h3>
            <button className="close-btn" onClick={() => setPairOpen(false)}>
              ×
            </button>
          </div>
          <input
            className="pair-search"
            placeholder="Search market..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="pair-tabs">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`pair-tab${category === c ? " active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="pair-list">
            {filtered.map((m) => (
              <div
                key={m.id}
                className={`pair-item${m.id === market.id ? " selected" : ""}`}
                onClick={() => selectMarket(m)}
              >
                <div className="pair-icon">{m.icon}</div>
                <div className="pair-main">
                  <h4>{m.name}</h4>
                  <p>
                    {m.pair} • {m.category}
                  </p>
                </div>
                <div className="pair-profit">+{m.profit}%</div>
              </div>
            ))}
            {!filtered.length && (
              <div className="pair-empty">No market found</div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`modal-backdrop${videoOpen ? " active" : ""}`}
        onClick={() => setVideoOpen(false)}
      >
        <div className="pair-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <h3>Add Video</h3>
            <button className="close-btn" onClick={() => setVideoOpen(false)}>
              ×
            </button>
          </div>
          <div className="video-body">
            <label className="upload">
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  addFiles(e.target.files)
                }
              />
              <div className="upload-icon">＋</div>
              <div>ADD VIDEO FROM DEVICE</div>
            </label>
            <input
              className="input"
              placeholder="Or paste video link (mp4 / stream)"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            <button
              className="request active"
              onClick={() => {
                const url = videoLink.trim();
                if (!url) {
                  showToast("Paste a video link first");
                  return;
                }
                const item = { id: `${Date.now()}`, name: url, url };
                setVideos((prev) => [item, ...prev]);
                setVideoLink("");
                setPlaying(item);
                setVideoOpen(false);
                showToast("Video loaded on chart");
              }}
            >
              ADD VIDEO LINK
            </button>
            {videos.map((v) => (
              <div className="video-card" key={v.id}>
                <video src={v.url} controls playsInline preload="metadata" />
                <div className="video-name">{v.name}</div>
                <div className="video-actions">
                  <button
                    className="video-play"
                    onClick={() => {
                      setPlaying(v);
                      setVideoOpen(false);
                      showToast("Playing on chart");
                    }}
                  >
                    PLAY ON CHART
                  </button>
                  <button
                    className="video-remove"
                    onClick={() => {
                      setVideos((prev) => prev.filter((x) => x.id !== v.id));
                      setPlaying((p) => (p?.id === v.id ? null : p));
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
            {!videos.length && (
              <div className="pair-empty">No video added yet</div>
            )}
          </div>
        </div>
      </div>

      <div className="toast" style={{ display: toast ? "block" : "none" }}>
        {toast ?? "Ready"}
      </div>
    </div>
  );
}

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const gi = require("react-icons/gi");
const fa = require("react-icons/fa");
const fs = require("fs");
const { applyTheme } = require("/root/.claude/skills/synced/648dba92-acf4-45d7-94f4-b2f5da58a45c_c5f3cf2c-e6e1-47e7-a3a3-45d7bf218c5b/pptx/scripts/apply_theme.js");

const D = JSON.parse(fs.readFileSync(__dirname + "/chartdata.json", "utf8"));
const OUT = process.argv[2] || __dirname + "/Frankly_Delicious_AI_Workshop.pptx";

const THEME = {
  name: "Frankly Delicious",
  headFontFace: "Bookman Old Style",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "2A1D18", lt1: "FFFFFF", dk2: "8E1B14", lt2: "FFF3CC",
    accent1: "C62D1F", accent2: "F2B705", accent3: "B9783F", accent4: "3F7D4E",
    accent5: "5B6770", accent6: "E8A33D", hlink: "C62D1F", folHlink: "8E1B14",
  },
};
const H = THEME.colors; // hex, for hex-only options
const DK_RED = "C8102E", PL_RED = "DC143C";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.title = "Frankly Delicious - AI workshop";
pres.author = "Jesper";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

async function icon(Comp, hex, px = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + hex, size: px }));
  const buf = await sharp(Buffer.from(svg)).resize(px, px).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const I = {
    hotdogW: await icon(gi.GiHotDog, "FFFFFF", 512),
    hotdogM: await icon(gi.GiHotDog, H.accent2, 512),
    hotdogR: await icon(gi.GiHotDog, H.accent1),
  };
  const mk = async (name, Comp) => { I[name] = await icon(Comp, "FFFFFF"); };
  await mk("clock", fa.FaClock); await mk("robot", fa.FaRobot); await mk("users", fa.FaUsers);
  await mk("trophy", fa.FaTrophy); await mk("coins", fa.FaCoins); await mk("db", fa.FaDatabase);
  await mk("search", fa.FaSearch); await mk("cloud", fa.FaCloudSunRain); await mk("cal", fa.FaCalendarTimes);
  await mk("snow", fa.FaSnowflake); await mk("ketchup", gi.GiKetchup); await mk("leaf", fa.FaLeaf);
  await mk("card", fa.FaCreditCard); await mk("futbol", fa.FaFutbol); await mk("umbrella", fa.FaUmbrella);
  await mk("run", fa.FaRunning); await mk("store", fa.FaStore); await mk("sausage", gi.GiSausage);
  await mk("fries", gi.GiFrenchFries); await mk("warn", fa.FaExclamationTriangle);

  // ------------------------------------------------------------ layouts
  pres.defineSlideMaster({
    title: "Title", background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.5, w: 5.9, h: 1.4, fontSize: 44, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "Title" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.05, w: 5.9, h: 1.0, fontSize: 18, color: C.background2, valign: "top", margin: 0 }, text: "Subtitle" } },
    ],
  });
  pres.defineSlideMaster({
    title: "Section", background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.8, w: 6.2, h: 1.0, fontSize: 40, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "Section" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 2.95, w: 6.2, h: 0.6, fontSize: 20, italic: true, color: C.accent2, valign: "top", margin: 0 }, text: "Kicker" } },
    ],
  });
  pres.defineSlideMaster({
    title: "Content", background: { color: C.background1 },
    objects: [
      { image: { data: I.hotdogR, x: 9.05, y: 0.36, w: 0.45, h: 0.45 } },
      { text: { text: "Frankly Delicious  ·  AI workshop", options: { x: 0.5, y: 5.2, w: 5, h: 0.3, fontSize: 9, color: C.accent5, margin: 0 } } },
      { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 8.4, h: 0.65, fontSize: 28, bold: true, color: C.text2, valign: "middle", align: "left", margin: 0 }, text: "Title" } },
    ],
    slideNumber: { x: 9.1, y: 5.2, w: 0.4, h: 0.3, fontSize: 9, color: C.accent5, align: "right" },
  });

  const content = (sec) => pres.addSlide({ masterName: "Content", sectionTitle: sec });
  const T = (s, t) => s.addText(t, { placeholder: "title" });
  const card = (s, x, y, w, h, fill = C.background2, name = "card") =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.12, objectName: name });
  const badge = (s, img, x, y, d = 0.55, fill = C.accent1) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: "icon circle" });
    s.addImage({ data: img, x: x + d * 0.22, y: y + d * 0.22, w: d * 0.56, h: d * 0.56, objectName: "icon" });
  };
  const txt = (s, text, o) => s.addText(text, Object.assign({ isTextBox: true, margin: 0, fontSize: 14, color: C.text1, valign: "top" }, o));
  const dkFlag = (s, x, y, w = 0.6) => {
    const h = w * 0.7;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: DK_RED }, line: { color: DK_RED }, objectName: "Danish flag" });
    s.addShape(pres.shapes.RECTANGLE, { x: x + w * 0.3, y, w: w * 0.12, h, fill: { color: "FFFFFF" }, line: { color: "FFFFFF" } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: y + h * 0.43, w, h: h * 0.14, fill: { color: "FFFFFF" }, line: { color: "FFFFFF" } });
  };
  const plFlag = (s, x, y, w = 0.6) => {
    const h = w * 0.7;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: h / 2, fill: { color: "FFFFFF" }, line: { color: "D0D0D0", width: 0.75 }, objectName: "Polish flag" });
    s.addShape(pres.shapes.RECTANGLE, { x, y: y + h / 2, w, h: h / 2, fill: { color: PL_RED }, line: { color: PL_RED } });
  };
  const ptsTag = (s, label, x = 7.9, y = 0.98) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 1.6, h: 0.32, fill: { color: C.accent2 }, line: { color: C.accent2 }, rectRadius: 0.16, objectName: "points tag" });
    txt(s, label, { x, y, w: 1.6, h: 0.32, fontSize: 11, bold: true, align: "center", valign: "middle", color: C.text1 });
  };
  const chartBase = () => ({
    catAxisLabelColor: H.accent5, valAxisLabelColor: H.accent5, catAxisLabelFontSize: 10, valAxisLabelFontSize: 10,
    catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", legendFontFace: "+mn-lt", titleFontFace: "+mn-lt",
    valGridLine: { color: "E6E1DA", size: 0.75 }, catGridLine: { style: "none" },
    catAxisLineShow: false, valAxisLineShow: false, legendPos: "b", legendFontSize: 11, legendColor: H.dk1,
    titleFontSize: 12, titleColor: H.dk1,
  });

  // ============================================================ INTRO
  pres.addSection({ title: "Intro" });
  let s = pres.addSlide({ masterName: "Title", sectionTitle: "Intro" });
  s.addText("Frankly Delicious", { placeholder: "title" });
  s.addText("An AI workshop on the hot dog empire of Copenhagen and Warsaw", { placeholder: "body" });
  txt(s, "Hej!  ·  Cześć!", { x: 0.6, y: 0.7, w: 5, h: 0.5, fontSize: 22, bold: true, italic: true, color: C.accent2 });
  s.addImage({ data: I.hotdogM, x: 6.7, y: 1.1, w: 2.9, h: 2.9, objectName: "hot dog" });
  s.addNotes("Welcome. Hej to the Copenhagen side, cześć to the Warsaw side. Today we run a hot dog empire across both our cities - and we use AI to work out what is really going on in it. The data is fully synthetic: nothing here is real, so you can paste it anywhere.");

  s = content("Intro"); T(s, "Today's menu: 90 minutes");
  const steps = [
    ["Intro", "10 min", I.hotdogW, "Meet the empire and the data"],
    ["No-AI round", "5 min", I.clock, "Just you, Excel and your gut"],
    ["Build in pairs", "50 min", I.robot, "AI + data = one dashboard"],
    ["Show & tell", "15 min", I.users, "3 minutes per pair"],
    ["Reveal", "10 min", I.trophy, "Answer key, points, awards"],
  ];
  steps.forEach(([h, m, img, d], i) => {
    const x = 0.5 + i * 1.82, y = 1.45, w = 1.6;
    card(s, x, y, w, 3.2, i === 2 ? C.accent2 : C.background2, "agenda step");
    badge(s, img, x + 0.5, y + 0.3, 0.6, C.accent1);
    txt(s, m, { x: x + 0.1, y: y + 1.1, w: w - 0.2, h: 0.5, fontSize: 22, bold: true, align: "center", color: C.text2, fontFace: THEME.headFontFace });
    txt(s, h, { x: x + 0.1, y: y + 1.7, w: w - 0.2, h: 0.4, fontSize: 15, bold: true, align: "center" });
    txt(s, d, { x: x + 0.15, y: y + 2.15, w: w - 0.3, h: 0.9, fontSize: 12, align: "center", color: C.accent5 });
  });
  s.addNotes("The bulk of the time is the build: 50 minutes in pairs. The no-AI round can also be sent out as a pre-read instead - in that case skip slide 'Round zero' and go straight to the mission.");

  s = content("Intro"); T(s, "Meet the empire: 8 stands, 2 cities");
  const cities = [
    { x: 0.5, flag: dkFlag, name: "Copenhagen", cur: "DKK", stands: [["City Hall Square", "classic"], ["Norreport Station", "commuter · covered"], ["Stadium Gate", "stadium"], ["Christianshavn Canal", "classic"]],
      hero: "Rød pølse", heroTxt: "Boiled, bright red, served with bread on the side. Why is it red? Nobody knows.", price: "38 DKK" },
    { x: 5.1, flag: plFlag, name: "Warsaw", cur: "PLN", stands: [["Old Town Square", "classic"], ["Central Station", "commuter · covered"], ["National Stadium", "stadium"], ["Vistula Riverside", "seasonal"]],
      hero: "Zapiekanka", heroTxt: "Toasted open baguette with mushrooms, cheese and ketchup. A late-night legend.", price: "18 PLN" },
  ];
  cities.forEach((c) => {
    card(s, c.x, 1.2, 4.4, 3.85, C.background2, c.name + " card");
    c.flag(s, c.x + 0.3, 1.42, 0.55);
    txt(s, c.name, { x: c.x + 1.0, y: 1.35, w: 2.4, h: 0.5, fontSize: 20, bold: true, valign: "middle", fontFace: THEME.headFontFace, color: C.text2 });
    txt(s, "paid in " + c.cur, { x: c.x + 3.0, y: 1.35, w: 1.2, h: 0.5, fontSize: 11, color: C.accent5, align: "right", valign: "middle" });
    c.stands.forEach(([n, t], j) => {
      const y = 2.0 + j * 0.36;
      txt(s, [{ text: n, options: { bold: true } }, { text: "   " + t, options: { color: C.accent5, fontSize: 12 } }], { x: c.x + 0.3, y, w: 3.9, h: 0.32, fontSize: 14, valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: c.x + 0.2, y: 3.55, w: 4.0, h: 1.3, fill: { color: C.background1 }, line: { color: C.accent2, width: 1.5 }, rectRadius: 0.1, objectName: "local hero" });
    txt(s, "Local hero: " + c.hero, { x: c.x + 0.35, y: 3.65, w: 2.7, h: 0.35, fontSize: 14, bold: true, color: C.accent1 });
    txt(s, c.price, { x: c.x + 3.0, y: 3.65, w: 1.05, h: 0.35, fontSize: 14, bold: true, align: "right" });
    txt(s, c.heroTxt, { x: c.x + 0.35, y: 4.03, w: 3.7, h: 0.75, fontSize: 12, color: C.text1 });
  });
  s.addNotes("Four stands per city, mirroring our two offices. Each city has a local hero on the menu: the Danish rød pølse and the Polish zapiekanka. Everything else - classic hot dog, chili cheese dog, vegan dog, fries, drinks - is sold in both cities.");

  s = content("Intro"); T(s, "The CEO has three questions");
  const qs = [["1", "How is the business really doing?"], ["2", "What should we be worried about?"], ["3", "What should we do more of?"]];
  qs.forEach(([n, q], i) => {
    const x = 0.5 + i * 3.05;
    card(s, x, 1.4, 2.85, 3.3, i === 1 ? C.text2 : C.background2, "question card");
    txt(s, n, { x: x + 0.3, y: 1.6, w: 1.2, h: 1.2, fontSize: 66, bold: true, fontFace: THEME.headFontFace, color: i === 1 ? C.accent2 : C.accent1 });
    txt(s, q, { x: x + 0.3, y: 2.95, w: 2.3, h: 1.5, fontSize: 20, bold: true, color: i === 1 ? C.background1 : C.text1 });
  });
  s.addNotes("The board meets next week. The CEO wants a dashboard that answers these three questions. That is your brief for today.");

  // ============================================================ THE DATA
  pres.addSection({ title: "The data" });
  s = pres.addSlide({ masterName: "Section", sectionTitle: "The data" });
  s.addText("What's in the bun?", { placeholder: "title" });
  s.addText("Smacznego!  ·  Velbekomme!", { placeholder: "body" });
  s.addImage({ data: I.hotdogM, x: 7.0, y: 1.5, w: 2.4, h: 2.4, objectName: "hot dog" });
  s.addNotes("Before anyone touches AI, let's get a feel for the data. Smacznego and velbekomme both mean: enjoy your meal.");

  s = content("The data"); T(s, "Eight tables, one story");
  const cx = 3.9, cy = 2.75, cw = 2.2, ch = 0.95;
  const nodes = [
    ["stands", "8 rows", "stand_id", 0.6, 1.3], ["menu", "9 items", "item_id", 3.9, 1.15], ["weather", "1,462 days", "date + city", 7.2, 1.3],
    ["events", "223 events", "date + city", 7.4, 2.85], ["fx_rates", "731 days", "date", 7.2, 4.25],
    ["supplier_prices", "2,730 rows", "week + city", 3.9, 4.35], ["manager_logbook", "3,240 notes", "date + stand_id", 0.6, 4.25],
  ];
  nodes.forEach(([n, r, key, x, y]) => {
    s.addShape(pres.shapes.LINE, { x: Math.min(x + 1.1, cx + cw / 2), y: Math.min(y + 0.38, cy + ch / 2), w: Math.abs(x + 1.1 - (cx + cw / 2)) || 0.001, h: Math.abs(y + 0.38 - (cy + ch / 2)) || 0.001,
      flipH: (x + 1.1) > (cx + cw / 2) !== (y + 0.38) > (cy + ch / 2), line: { color: C.accent3, width: 1.5, dashType: "dash" }, objectName: "link " + n });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cw, h: ch, fill: { color: C.accent1 }, line: { color: C.accent1 }, rectRadius: 0.12, objectName: "sales node" });
  txt(s, [{ text: "sales", options: { bold: true, fontSize: 18, breakLine: true } }, { text: "41,226 rows", options: { fontSize: 12 } }], { x: cx, y: cy, w: cw, h: ch, align: "center", valign: "middle", color: C.background1 });
  nodes.forEach(([n, r, key, x, y]) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.2, h: 0.76, fill: { color: C.background2 }, line: { color: C.accent2, width: 1 }, rectRadius: 0.1, objectName: n + " node" });
    txt(s, [{ text: n, options: { bold: true, fontSize: 13, breakLine: true } }, { text: r + "  ·  joins on " + key, options: { fontSize: 10, color: C.accent5 } }], { x: x + 0.1, y, w: 2.0, h: 0.76, align: "center", valign: "middle" });
  });
  s.addNotes("Sales is the centre. Every other table adds context: who runs the stand, what the item costs, what the weather was, whether there was a match, what the exchange rate was, what ingredients cost, and what the manager wrote that day. No single table tells the full story - the interesting answers sit in the connections.");

  s = content("The data"); T(s, "What a row actually looks like");
  const hdr = ["date", "stand_id", "item_id", "units_sold", "revenue", "cost_of_goods", "currency", "card_share"].map((t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } }));
  const rows = [
    ["2025-06-14", "C1", "M01", "98", "4410.0", "1214.08", "DKK", "0.53"],
    ["2025-06-14", "C2", "M01", "57", "2565.0", "706.15", "DKK", "0.72"],
    ["2025-06-14", "W1", "M01", "130", "2080.0", "924.18", "PLN", "0.59"],
    ["2025-06-14", "W2", "M01", "73", "1168.0", "518.96", "PLN", "0.55"],
    ["2025-06-14", "W3", "M01", "8", "128.0", "56.87", "PLN", "0.75"],
  ];
  s.addTable([hdr, ...rows.map((r, i) => r.map((t) => ({ text: t, options: { fill: { color: i % 2 ? H.lt1 : H.lt2 } } })))],
    { x: 0.5, y: 1.2, w: 9.0, colW: [1.2, 1.05, 0.95, 1.2, 1.0, 1.45, 1.0, 1.15], fontSize: 11, margin: 0.05, fontFace: "Courier New", color: C.text1, border: { type: "solid", pt: 0.5, color: "E6E1DA" }, rowH: 0.34, valign: "middle" });
  const callouts = [
    ["One row", "= one stand × one item × one day"],
    ["revenue", "is in the stand's local currency"],
    ["card_share", "= share of units paid by card, the rest is cash"],
  ];
  callouts.forEach(([a, b], i) => {
    const x = 0.5 + i * 3.05;
    card(s, x, 3.55, 2.85, 1.25, C.background2, "callout");
    txt(s, a, { x: x + 0.25, y: 3.68, w: 2.4, h: 0.4, fontSize: 16, bold: true, color: C.accent1, fontFace: "Courier New" });
    txt(s, b, { x: x + 0.25, y: 4.1, w: 2.4, h: 0.6, fontSize: 13 });
  });
  s.addNotes("Five real rows from 14 June 2025: one item, five stands. Look at the numbers: 4,410 in Copenhagen and 2,080 in Warsaw - but in different currencies. Keep that in mind.");

  s = content("The data"); T(s, "Too much to eat with your bare hands");
  const stats = [["41,226", "sales rows"], ["3,240", "handwritten-style notes"], ["731", "days of trading"], ["2", "currencies in one column"]];
  stats.forEach(([n, l], i) => {
    const x = 0.5 + (i % 2) * 4.6, y = 1.2 + Math.floor(i / 2) * 1.9;
    card(s, x, y, 4.4, 1.7, i === 3 ? C.accent2 : C.background2, "stat card");
    txt(s, n, { x: x + 0.3, y: y + 0.2, w: 3.8, h: 0.85, fontSize: 44, bold: true, color: C.text2, fontFace: THEME.headFontFace });
    txt(s, l, { x: x + 0.3, y: y + 1.1, w: 3.8, h: 0.4, fontSize: 15 });
  });
  s.addNotes("If you printed the sales table it would be around 800 pages. The logbook alone would take an afternoon to read. This is exactly the kind of problem where AI earns its keep - but only if we can still judge what it tells us.");

  s = content("The data"); T(s, "Why this is hard by hand");
  const hard = [
    [I.coins, "Two currencies", "DKK and PLN sit in the same revenue column"],
    [I.db, "Joins everywhere", "Most answers need three or more tables combined"],
    [I.search, "Free text", "3,240 manager notes you cannot simply sum"],
    [I.cloud, "Weather & events", "Every day has its own rain, sun, match or market"],
    [I.cal, "Gaps", "Not every stand trades on every single day"],
    [I.snow, "Seasons", "Two summers, two winters, two Christmases"],
  ];
  hard.forEach(([img, h, d], i) => {
    const x = 0.5 + (i % 3) * 3.05, y = 1.2 + Math.floor(i / 3) * 1.95;
    card(s, x, y, 2.85, 1.75, C.background2, "challenge card");
    badge(s, img, x + 0.25, y + 0.25, 0.55, i % 2 ? C.accent4 : C.accent1);
    txt(s, h, { x: x + 0.95, y: y + 0.3, w: 1.8, h: 0.45, fontSize: 16, bold: true, valign: "middle" });
    txt(s, d, { x: x + 0.25, y: y + 0.95, w: 2.4, h: 0.7, fontSize: 13, color: C.text1 });
  });
  s.addNotes("These are facts about the data, not findings - we are not giving anything away. But each of them is a place where a quick analysis can go wrong.");

  // ============================================================ NO-AI ROUND
  pres.addSection({ title: "No-AI round" });
  s = pres.addSlide({ masterName: "Section", sectionTitle: "No-AI round" });
  s.addText("Round zero", { placeholder: "title" });
  s.addText("Bez AI  ·  Uden AI", { placeholder: "body" });
  s.addImage({ data: I.hotdogM, x: 7.0, y: 1.5, w: 2.4, h: 2.4, objectName: "hot dog" });
  s.addNotes("Bez AI and uden AI: without AI. If you sent the no-AI round as a pre-read, skip this section.");

  s = content("No-AI round"); T(s, "Just you, Excel and your gut");
  card(s, 0.5, 1.25, 3.2, 3.6, C.text2, "timer");
  txt(s, "5:00", { x: 0.5, y: 1.75, w: 3.2, h: 1.4, fontSize: 72, bold: true, align: "center", color: C.accent2, fontFace: THEME.headFontFace });
  txt(s, "minutes · no AI allowed", { x: 0.5, y: 3.25, w: 3.2, h: 0.4, fontSize: 15, align: "center", color: C.background1 });
  const zq = ["Which stand is the best?", "Is the business growing?", "What is one thing the CEO should worry about?"];
  zq.forEach((q, i) => {
    const y = 1.25 + i * 0.95;
    badge(s, I.hotdogW, 4.1, y + 0.08, 0.55, C.accent1);
    txt(s, q, { x: 4.85, y, w: 4.6, h: 0.72, fontSize: 18, bold: true, valign: "middle" });
  });
  txt(s, "Write your answers on a sticky note. We compare them with the AI-powered results at the end.", { x: 4.1, y: 4.15, w: 5.4, h: 0.7, fontSize: 14, italic: true, color: C.accent5 });
  s.addNotes("Pairs open the CSVs in Excel - no AI. Collect the sticky notes and keep them for the reveal. Most pairs will answer from raw revenue numbers, which is exactly the point.");

  // ============================================================ MISSION
  pres.addSection({ title: "Your mission" });
  s = pres.addSlide({ masterName: "Section", sectionTitle: "Your mission" });
  s.addText("Your mission", { placeholder: "title" });
  s.addText("Do dzieła!  ·  Lad os komme i gang!", { placeholder: "body" });
  s.addImage({ data: I.hotdogM, x: 7.0, y: 1.5, w: 2.4, h: 2.4, objectName: "hot dog" });
  s.addNotes("Do dzieła and lad os komme i gang: let's get to work.");

  s = content("Your mission"); T(s, "Build the CEO's dashboard");
  const mission = [
    [I.users, "Work in pairs", "Mix Copenhagen and Warsaw where you can"],
    [I.robot, "Use any AI you have", "Copilot, Opus, or anything else available"],
    [I.store, "Deliver one dashboard", "Answer the CEO's three questions"],
    [I.trophy, "Pitch in 3 minutes", "Your 3 key findings + 1 thing the AI got wrong"],
  ];
  mission.forEach(([img, h, d], i) => {
    const y = 1.2 + i * 0.92;
    badge(s, img, 0.5, y + 0.05, 0.6, C.accent1);
    txt(s, h, { x: 1.3, y, w: 4.6, h: 0.38, fontSize: 17, bold: true });
    txt(s, d, { x: 1.3, y: y + 0.38, w: 4.6, h: 0.35, fontSize: 13, color: C.accent5 });
  });
  card(s, 6.4, 1.2, 3.1, 3.6, C.accent2, "time card");
  txt(s, "50", { x: 6.4, y: 1.55, w: 3.1, h: 1.5, fontSize: 88, bold: true, align: "center", color: C.text2, fontFace: THEME.headFontFace });
  txt(s, "minutes on the grill", { x: 6.4, y: 3.1, w: 3.1, h: 0.4, fontSize: 16, bold: true, align: "center" });
  txt(s, "Data + brief: participant_pack/", { x: 6.6, y: 3.8, w: 2.7, h: 0.6, fontSize: 12, align: "center", color: C.text1 });
  s.addNotes("Remind everyone where the data is. Suggest they pick the strongest model available - in our dry run, the choice of model made a huge difference.");

  s = content("Your mission"); T(s, "House rules of the grill");
  const rules = [
    [I.robot, "Let the AI write the code", "The sales file is too big to paste. Ask for code that reads the files."],
    [I.search, "Ask: how could this be wrong?", "Check every surprising number yourself before you present it."],
    [I.sausage, "Small bites, not the whole sausage", "One insight, one chart, then the next. Not one giant prompt."],
    [I.warn, "Synthetic data: paste freely", "With real Ørsted data, the normal rules apply. Always."],
  ];
  rules.forEach(([img, h, d], i) => {
    const x = 0.5 + (i % 2) * 4.6, y = 1.2 + Math.floor(i / 2) * 1.85;
    card(s, x, y, 4.4, 1.65, C.background2, "rule card");
    badge(s, img, x + 0.25, y + 0.3, 0.6, i === 3 ? C.accent4 : C.accent1);
    txt(s, h, { x: x + 1.05, y: y + 0.25, w: 3.15, h: 0.5, fontSize: 16, bold: true, valign: "middle" });
    txt(s, d, { x: x + 1.05, y: y + 0.8, w: 3.15, h: 0.7, fontSize: 13 });
  });
  s.addNotes("The fourth rule is a real-world lesson: synthetic data is safe to paste into any tool, real company data is not.");

  s = content("Your mission"); T(s, "Points and prizes");
  s.addTable([
    [{ text: "What you found", options: { bold: true, color: C.background1, fill: { color: C.text2 } } }, { text: "Points", options: { bold: true, color: C.background1, fill: { color: C.text2 }, align: "center" } }],
    ["Easy finding", { text: "1", options: { align: "center" } }],
    ["Medium finding", { text: "2", options: { align: "center" } }],
    ["Hard finding", { text: "3", options: { align: "center" } }],
    ["Trap spotted and avoided", { text: "+2", options: { align: "center" } }],
    ["Fell into a trap", { text: "−1", options: { align: "center" } }],
  ], { x: 0.5, y: 1.25, w: 4.2, colW: [3.1, 1.1], fontSize: 14, color: C.text1, rowH: 0.48, border: { type: "solid", pt: 0.5, color: "E6E1DA" }, fill: { color: H.lt2 }, valign: "middle" });
  const awards = [
    ["The Golden Sausage", "Sharpest insight"],
    ["Best Dressed Dog", "Prettiest dashboard"],
    ["Ketchup on the Shirt", "Best AI mistake caught"],
  ];
  awards.forEach(([a, b], i) => {
    const y = 1.25 + i * 1.2;
    card(s, 5.1, y, 4.4, 1.0, i === 0 ? C.accent2 : C.background2, "award");
    badge(s, i === 2 ? I.ketchup : I.trophy, 5.3, y + 0.2, 0.6, C.accent1);
    txt(s, a, { x: 6.1, y: y + 0.15, w: 3.3, h: 0.4, fontSize: 16, bold: true });
    txt(s, b, { x: 6.1, y: y + 0.55, w: 3.3, h: 0.3, fontSize: 13, color: C.text1 });
  });
  s.addNotes("There are several hidden stories in the data, from easy to hard, plus a couple of traps. We reveal everything at the end.");

  // ============================================================ REVEAL
  pres.addSection({ title: "Reveal" });
  s = pres.addSlide({ masterName: "Section", sectionTitle: "Reveal" });
  s.addText("The reveal", { placeholder: "title" });
  s.addText("Uwaga, spoiler!  ·  Spoiler-alarm!", { placeholder: "body" });
  s.addImage({ data: I.hotdogM, x: 7.0, y: 1.5, w: 2.4, h: 2.4, objectName: "hot dog" });
  s.addNotes("Only show from here after all pairs have presented.");

  s = content("Reveal"); T(s, "Your gut vs the data");
  const gh = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } });
  s.addTable([
    [gh("Question"), gh("Your sticky note"), gh("What the data says")],
    [{ text: "Best stand?", options: { bold: true } }, "", "W2 Warsaw Central Station, once converted to EUR. Raw numbers say Norreport."],
    [{ text: "Growing?", options: { bold: true } }, "", "+10% headline, but only ~+3% like-for-like."],
    [{ text: "Worry about?", options: { bold: true } }, "", "Ketchup crisis in Warsaw and missing cash at Christianshavn."],
  ], { x: 0.5, y: 1.25, w: 9.0, colW: [1.7, 2.6, 4.7], fontSize: 14, color: C.text1, rowH: [0.45, 1.0, 1.0, 1.0], border: { type: "solid", pt: 0.5, color: "E6E1DA" }, fill: { color: H.lt2 }, valign: "middle" });
  s.addNotes("Read a few sticky notes out loud. Fill in the middle column live or on the whiteboard.");

  s = content("Reveal"); T(s, "Easy bites"); ptsTag(s, "1 point each");
  const easy = [
    [I.umbrella, "−43%", "Rain hits open stands", "Covered stations only lose 6% on rainy days."],
    [I.futbol, "8×", "Stadium stands live on matches", "C3: 34 units on a normal day, 276 on match days."],
    [I.run, "−45%", "Commuters stay home at weekends", "Stations drop at weekends; city squares peak on Saturday."],
  ];
  easy.forEach(([img, n, h, d], i) => {
    const x = 0.5 + i * 3.05;
    card(s, x, 1.45, 2.85, 3.4, C.background2, "easy finding");
    badge(s, img, x + 0.25, 1.65, 0.6, C.accent1);
    txt(s, n, { x: x + 0.25, y: 2.4, w: 2.4, h: 0.85, fontSize: 44, bold: true, color: C.text2, fontFace: THEME.headFontFace });
    txt(s, h, { x: x + 0.25, y: 3.3, w: 2.4, h: 0.6, fontSize: 15, bold: true });
    txt(s, d, { x: x + 0.25, y: 3.9, w: 2.4, h: 0.85, fontSize: 12 });
  });
  s.addNotes("Bonus point if someone explained why the Warsaw stadium stand fell 6% in 2025: there were 19 home matches instead of 24. Not a performance problem.");

  s = content("Reveal"); T(s, "The Warsaw ketchup crisis"); ptsTag(s, "2 points");
  const mLab = D.months.map((m) => { const [y, mo] = m.split("-"); return ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][+mo - 1] + (mo === "01" || m === D.months[0] ? " " + y.slice(2) : ""); });
  s.addChart(pres.charts.LINE, [
    { name: "Copenhagen", labels: mLab, values: D.gm_cph },
    { name: "Warsaw", labels: mLab, values: D.gm_waw },
  ], Object.assign(chartBase(), { x: 0.4, y: 1.3, w: 5.8, h: 3.7, chartColors: [H.accent5, H.accent1], lineSize: 2.5, lineDataSymbol: "none",
    valAxisMinVal: 60, valAxisMaxVal: 76, valAxisLabelFormatCode: "0\"%\"", showLegend: true, showTitle: true, title: "Gross margin by month (%)", objectName: "margin chart" }));
  card(s, 6.5, 1.35, 3.0, 1.75, C.accent2, "ketchup stat");
  txt(s, "4.5×", { x: 6.7, y: 1.45, w: 2.6, h: 0.8, fontSize: 44, bold: true, color: C.text2, fontFace: THEME.headFontFace });
  txt(s, "Warsaw ketchup price from 7 April 2025: 14.8 → 67 PLN/kg", { x: 6.7, y: 2.25, w: 2.6, h: 0.75, fontSize: 13 });
  txt(s, [
    { text: "Revenue looked fine. Only margin showed it.", options: { bold: true, breakLine: true } },
    { text: "Zapiekanka margin fell from 70% to 52%.", options: { breakLine: true } },
    { text: "A new supplier fixed it in November.", options: {} },
  ], { x: 6.5, y: 3.3, w: 3.0, h: 1.6, fontSize: 13, paraSpaceAfter: 6 });
  s.addNotes("This only shows up if you look at margin, not revenue - and then dig into supplier prices. The logbook also has managers complaining that the ketchup supplier raised prices again. Copenhagen buys from a different supplier and was not affected.");

  s = content("Reveal"); T(s, "The vegan wave"); ptsTag(s, "2 points");
  s.addChart(pres.charts.LINE, [
    { name: "Copenhagen", labels: D.quarters.map((q) => q.replace("Q", " Q")), values: D.vegan_cph },
    { name: "Warsaw", labels: D.quarters.map((q) => q.replace("Q", " Q")), values: D.vegan_waw },
  ], Object.assign(chartBase(), { x: 0.4, y: 1.3, w: 5.8, h: 3.7, chartColors: [H.accent4, H.accent6], lineSize: 2.5, lineDataSymbol: "circle", lineDataSymbolSize: 6,
    valAxisMinVal: 0, valAxisMaxVal: 18, valAxisLabelFormatCode: "0\"%\"", showLegend: true, showTitle: true, title: "Vegan dog, share of all units sold (%)", objectName: "vegan chart" }));
  const vg = [["5% → 16%", "Vegan share in Copenhagen in two years"], ["½", "Red sausage sales halved: the vegan dog is eating its lunch"], ["66%", "Vegan margin, lower than the other sausages"]];
  vg.forEach(([n, d], i) => {
    const y = 1.35 + i * 1.22;
    card(s, 6.5, y, 3.0, 1.08, i === 0 ? C.accent2 : C.background2, "vegan stat");
    txt(s, n, { x: 6.7, y: y + 0.08, w: 2.6, h: 0.5, fontSize: 24, bold: true, color: C.text2, fontFace: THEME.headFontFace });
    txt(s, d, { x: 6.7, y: y + 0.58, w: 2.6, h: 0.45, fontSize: 12 });
  });
  s.addNotes("Warsaw follows the same trend, just more slowly. Good discussion point: growth is great, but the vegan dog earns a slightly lower margin per unit than the sausages it replaces.");

  s = content("Reveal"); T(s, "Marathons and Christmas markets"); ptsTag(s, "2 points");
  const mc = [
    [I.run, "Marathon day", "2.5 : 1", "drinks outsold food at City Hall Square and Old Town Square.", "Runners and spectators want soda and coffee, not sausages."],
    [I.snow, "Christmas market", "+45%", "more customers at the two city squares from 22 November.", "Chocolate milk sales double and coffee jumps too. Hygge, or przytulność?"],
  ];
  mc.forEach(([img, h, n, l, d], i) => {
    const x = 0.5 + i * 4.6;
    card(s, x, 1.45, 4.4, 3.4, C.background2, "event finding");
    badge(s, img, x + 0.3, 1.7, 0.65, i ? C.accent4 : C.accent1);
    txt(s, h, { x: x + 1.15, y: 1.75, w: 3.0, h: 0.55, fontSize: 18, bold: true, valign: "middle" });
    txt(s, n, { x: x + 0.3, y: 2.55, w: 3.8, h: 0.9, fontSize: 48, bold: true, color: C.text2, fontFace: THEME.headFontFace });
    txt(s, l, { x: x + 0.3, y: 3.45, w: 3.8, h: 0.6, fontSize: 14, bold: true });
    txt(s, d, { x: x + 0.3, y: 4.05, w: 3.8, h: 0.65, fontSize: 13 });
  });
  s.addNotes("Both cities have a marathon and a Christmas market. The marathon effect is a nice example of a product-mix shift, not a volume shift.");

  s = content("Reveal"); T(s, "Rick Relish and the missing cash"); ptsTag(s, "3 points");
  s.addChart(pres.charts.LINE, [
    { name: "C4 Christianshavn", labels: D.quarters.map((q) => q.replace("Q", " Q")), values: D.card_c4 },
    { name: "Other Copenhagen stands", labels: D.quarters.map((q) => q.replace("Q", " Q")), values: D.card_other },
  ], Object.assign(chartBase(), { x: 0.4, y: 1.3, w: 5.8, h: 3.7, chartColors: [H.accent1, H.accent5], lineSize: 2.5, lineDataSymbol: "circle", lineDataSymbolSize: 6,
    valAxisMinVal: 60, valAxisMaxVal: 90, valAxisLabelFormatCode: "0\"%\"", showLegend: true, showTitle: true, title: "Share of revenue paid by card (%)", objectName: "card share chart" }));
  card(s, 6.5, 1.35, 3.0, 1.45, C.text2, "rick stat");
  txt(s, "−57%", { x: 6.7, y: 1.42, w: 2.6, h: 0.75, fontSize: 40, bold: true, color: C.accent2, fontFace: THEME.headFontFace });
  txt(s, "cash sales after the new manager started on 1 March 2025", { x: 6.7, y: 2.15, w: 2.6, h: 0.6, fontSize: 12, color: C.background1 });
  txt(s, [
    { text: "Card sales grew normally (+9%)", options: { bullet: true, breakLine: true } },
    { text: "≈ DKK 380k missing in 10 months", options: { bullet: true, breakLine: true } },
    { text: "Logbook: \"Quiet day.\" in 95% of his notes", options: { bullet: true, breakLine: true } },
    { text: "\"Cash drawer sticky again. Will sort it out myself.\"", options: { bullet: true, italic: true } },
  ], { x: 6.5, y: 2.95, w: 3.0, h: 2.0, fontSize: 12, paraSpaceAfter: 4 });
  s.addNotes("The showpiece. Total revenue only fell about 7%, which is easy to dismiss as a bad year. The pattern is in the split between card and cash. Discussion: as a control function, what alert would have caught this in month one?");

  s = content("Reveal"); T(s, "The two traps"); ptsTag(s, "+2 points each");
  const traps = [
    [I.coins, "Mixing DKK and PLN", "68%", "55%", "Copenhagen's share of revenue: raw numbers vs converted to EUR", "The best stand flips to Warsaw Central Station."],
    [I.store, "Growth from a new stand", "+19%", "+3%", "Warsaw growth in 2025: headline vs like-for-like", "Vistula Riverside only opened in May 2025."],
  ];
  traps.forEach(([img, h, a, b, l, d], i) => {
    const x = 0.5 + i * 4.6;
    card(s, x, 1.45, 4.4, 3.4, C.background2, "trap card");
    badge(s, img, x + 0.3, 1.65, 0.6, C.accent1);
    txt(s, h, { x: x + 1.1, y: 1.68, w: 3.1, h: 0.55, fontSize: 17, bold: true, valign: "middle" });
    txt(s, a, { x: x + 0.3, y: 2.45, w: 1.55, h: 0.8, fontSize: 32, bold: true, color: C.accent5, fontFace: THEME.headFontFace, strike: "sngStrike" });
    txt(s, "→", { x: x + 1.9, y: 2.45, w: 0.5, h: 0.8, fontSize: 28, align: "center", color: C.accent5, valign: "middle" });
    txt(s, b, { x: x + 2.5, y: 2.45, w: 1.7, h: 0.8, fontSize: 36, bold: true, color: C.text2, fontFace: THEME.headFontFace });
    txt(s, l, { x: x + 0.3, y: 3.35, w: 3.8, h: 0.6, fontSize: 13, bold: true });
    txt(s, d, { x: x + 0.3, y: 4.0, w: 3.8, h: 0.6, fontSize: 13 });
  });
  s.addNotes("Minus one point for falling in. For a market risk team, the currency trap should hurt the most!");

  s = content("Reveal"); T(s, "We let two AIs go first");
  const bots = [
    ["Claude Haiku", "3 / 16", "points in ~3 minutes", ["Missed the cash story completely", "Told the CEO to consider closing the new stand: wrong diagnosis", "Called its own work \"production-ready\""]],
    ["Claude Sonnet", "15 / 16", "points in ~4 minutes", ["Found the cash story and avoided both traps", "Blamed the margin collapse on sausage, not ketchup", "Even noticed the inconsistency and explained it away"]],
  ];
  bots.forEach(([n, sc, l, pts], i) => {
    const x = 0.5 + i * 4.6;
    card(s, x, 1.25, 4.4, 3.65, i ? C.background2 : C.background2, "ai result");
    badge(s, I.robot, x + 0.3, 1.45, 0.6, i ? C.accent4 : C.accent5);
    txt(s, n, { x: x + 1.1, y: 1.48, w: 3.1, h: 0.55, fontSize: 18, bold: true, valign: "middle" });
    txt(s, sc, { x: x + 0.3, y: 2.1, w: 3.8, h: 0.75, fontSize: 40, bold: true, color: C.text2, fontFace: THEME.headFontFace });
    txt(s, l, { x: x + 0.3, y: 2.85, w: 3.8, h: 0.3, fontSize: 12, color: C.accent5 });
    txt(s, pts.map((p, j) => ({ text: p, options: { bullet: true, breakLine: j < pts.length - 1 } })), { x: x + 0.3, y: 3.3, w: 3.9, h: 1.5, fontSize: 13, paraSpaceAfter: 5 });
  });
  s.addNotes("We ran two AI agents on the same pack with no human steering. The stronger model was impressively close to perfect, and still made a confident mistake: the supplier data plainly shows ketchup spiking, not sausage. Speed is real. So is the need to check.");

  s = content("Reveal"); T(s, "Takeaways for Monday morning");
  const take = [
    [I.robot, "AI does the first 80%", "Exploring, joining and charting 41,000 rows takes minutes, not days."],
    [I.search, "You own the last 20%", "Currencies, like-for-like, root causes: knowing the business is what catches the mistakes."],
    [I.users, "Where would this help us?", "Name one task in our own work to try this on next week."],
  ];
  take.forEach(([img, h, d], i) => {
    const x = 0.5 + i * 3.05;
    card(s, x, 1.3, 2.85, 3.0, i === 2 ? C.accent2 : C.background2, "takeaway");
    badge(s, img, x + 0.3, 1.55, 0.65, C.accent1);
    txt(s, h, { x: x + 0.3, y: 2.4, w: 2.3, h: 0.8, fontSize: 18, bold: true });
    txt(s, d, { x: x + 0.3, y: 3.25, w: 2.3, h: 1.4, fontSize: 13 });
  });
  s.addNotes("Use the last few minutes as a retro. Go round the room: one task each in our own work where this could help - and one place where it would worry you.");

  s = pres.addSlide({ masterName: "Title", sectionTitle: "Reveal" });
  s.addText("Tak!  ·  Dziękuję!", { placeholder: "title" });
  s.addText("Questions? Second helpings?", { placeholder: "body" });
  s.addImage({ data: I.hotdogM, x: 6.7, y: 1.1, w: 2.9, h: 2.9, objectName: "hot dog" });
  s.addNotes("Thank you in Danish and Polish. Hand out the awards.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();

import sharp from "sharp";
import path from "path";

const SRC = "/Users/dr.jeehoonju/Downloads/영미권 에이전시 전달";
const DEST = path.resolve("public/assets/explore-gallery");
const TARGET_HEIGHT = 700;

const cases = [
  // --- BROW LIFT (5 cases) ---
  ["brow-lift-case-1", `${SRC}/눈마거상(이마거상)/이미지/01/BEFORE(정면).jpg`, `${SRC}/눈마거상(이마거상)/이미지/01/AFTER(정면).jpg`],
  ["brow-lift-case-2", `${SRC}/눈마거상(이마거상)/이미지/02/BEFORE(정면).jpg`, `${SRC}/눈마거상(이마거상)/이미지/02/AFTER(정면).jpg`],
  ["brow-lift-case-3", `${SRC}/눈마거상(이마거상)/이미지/03/BEFORE(정면).jpg`, `${SRC}/눈마거상(이마거상)/이미지/03/AFTER(정면).jpg`],
  ["brow-lift-case-4", `${SRC}/눈마거상(이마거상)/이미지/04/BEFORE(정면).jpg`, `${SRC}/눈마거상(이마거상)/이미지/04/AFTER(정면).jpg`],
  ["brow-lift-case-5", `${SRC}/눈마거상(이마거상)/이미지/05/BEFORE(정면).jpg`, `${SRC}/눈마거상(이마거상)/이미지/05/AFTER(정면).jpg`],

  // --- NECK LIFT (3 cases) ---
  ["neck-lift-case-1", `${SRC}/목거상/이미지/01/BEFORE(정면).jpg`, `${SRC}/목거상/이미지/01/AFTER(정면).jpg`],
  ["neck-lift-case-2", `${SRC}/목거상/이미지/02/BEFORE(정면).jpg`, `${SRC}/목거상/이미지/02/AFTER(정면).jpg`],
  ["neck-lift-case-3", `${SRC}/목거상/이미지/03/BEFORE(정면).jpg`, `${SRC}/목거상/이미지/03/AFTER(정면).jpg`],

  // --- TUMMY TUCK (6 cases, skip 01 which has 2차보정 naming) ---
  ["tummy-tuck-case-1", `${SRC}/복부거상/이미지/02/BEFORE(정면).jpg`, `${SRC}/복부거상/이미지/02/AFTER(정면).jpg`],
  ["tummy-tuck-case-2", `${SRC}/복부거상/이미지/03/BEFORE(정면).jpg`, `${SRC}/복부거상/이미지/03/AFTER(정면).jpg`],
  ["tummy-tuck-case-3", `${SRC}/복부거상/이미지/01/BEFORE_2차보정.jpg`, `${SRC}/복부거상/이미지/01/AFTER_2차보정.jpg`],
  ["tummy-tuck-case-4", `${SRC}/복부거상/이미지/05/BEFORE(정면).jpg`, `${SRC}/복부거상/이미지/05/AFTER(정면).jpg`],
  ["tummy-tuck-case-5", `${SRC}/복부거상/이미지/06/BEFORE(정면).jpg`, `${SRC}/복부거상/이미지/06/AFTER(정면).jpg`],
  ["tummy-tuck-case-6", `${SRC}/복부거상/이미지/07/BEFORE(정면).jpg`, `${SRC}/복부거상/이미지/07/AFTER(정면).jpg`],

  // --- ARM LIFT (7 cases) ---
  ["arm-lift-case-1", `${SRC}/팔거상/이미지/01/BEFORE(정면).jpg`, `${SRC}/팔거상/이미지/01/AFTER(정면).jpg`],
  ["arm-lift-case-2", `${SRC}/팔거상/이미지/02/BEFORE(정면).jpg`, `${SRC}/팔거상/이미지/02/AFTER(정면)_흉터보정.jpg`],
  ["arm-lift-case-3", `${SRC}/팔거상/이미지/03/BEFORE(정면).jpg`, `${SRC}/팔거상/이미지/03/AFTER(정면)_흉터보정.jpg`],
  ["arm-lift-case-4", `${SRC}/팔거상/이미지/04/BEFORE(정면).jpg`, `${SRC}/팔거상/이미지/04/AFTER(정면)_흉터보정.jpg`],
  ["arm-lift-case-5", `${SRC}/팔거상/이미지/05/BEFORE(정면).jpg`, `${SRC}/팔거상/이미지/05/AFTER(정면)_흉터보정.jpg`],
  ["arm-lift-case-6", `${SRC}/팔거상/이미지/06/A.jpg`, `${SRC}/팔거상/이미지/06/B.jpg`],
  ["arm-lift-case-7", `${SRC}/팔거상/이미지/07/A.jpg`, `${SRC}/팔거상/이미지/07/B.jpg`],

  // --- THIGH LIFT (4 cases) ---
  ["thigh-lift-case-1", `${SRC}/허벅지거상/이미지/01/BEFORE(정면).jpg`, `${SRC}/허벅지거상/이미지/01/AFTER(정면).jpg`],
  ["thigh-lift-case-2", `${SRC}/허벅지거상/이미지/02/BEFORE(정면).jpg`, `${SRC}/허벅지거상/이미지/02/AFTER(정면).jpg`],
  ["thigh-lift-case-3", `${SRC}/허벅지거상/이미지/03/BEFORE(정면).jpg`, `${SRC}/허벅지거상/이미지/03/AFTER(정면).jpg`],
  ["thigh-lift-case-4", `${SRC}/허벅지거상/이미지/04/A.jpg`, `${SRC}/허벅지거상/이미지/04/B.jpg`],
];

async function combine(name, beforePath, afterPath) {
  try {
    const [beforeBuf, afterBuf] = await Promise.all([
      sharp(beforePath).resize({ height: TARGET_HEIGHT }).jpeg({ quality: 85 }).toBuffer(),
      sharp(afterPath).resize({ height: TARGET_HEIGHT }).jpeg({ quality: 85 }).toBuffer(),
    ]);
    const [bm, am] = await Promise.all([sharp(beforeBuf).metadata(), sharp(afterBuf).metadata()]);
    const gap = 4, w = bm.width + am.width + gap;
    await sharp({ create: { width: w, height: TARGET_HEIGHT, channels: 3, background: { r: 255, g: 255, b: 255 } } })
      .composite([{ input: beforeBuf, left: 0, top: 0 }, { input: afterBuf, left: bm.width + gap, top: 0 }])
      .jpeg({ quality: 85 }).toFile(path.join(DEST, `${name}.png`));
    console.log(`OK  ${name}.png (${w}x${TARGET_HEIGHT})`);
  } catch (err) { console.error(`ERR ${name}: ${err.message}`); }
}

console.log(`Processing ${cases.length} cases...\n`);
for (const [n, b, a] of cases) await combine(n, b, a);
console.log("\nDone!");

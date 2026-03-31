import sharp from "sharp";
import path from "path";

const SRC = "/Users/dr.jeehoonju/Downloads/영미권 에이전시 전달";
const DEST = path.resolve("public/assets/explore-gallery");

// Additional cases — these will be numbered 5, 6, 7, 8 (appended after existing 1-4)
const cases = [
  // --- FACELIFT 5-7 ---
  ["facelift-case-5", `${SRC}/안면거상/이미지/02/BEFORE(정면).jpg`, `${SRC}/안면거상/이미지/02/AFTER(정면).jpg`],
  ["facelift-case-6", `${SRC}/안면거상/이미지/03/BEFORE(정면).jpg`, `${SRC}/안면거상/이미지/03/AFTER(정면).jpg`],
  ["facelift-case-7", `${SRC}/안면거상/이미지/07/BEFORE(정면).jpg`, `${SRC}/안면거상/이미지/07/AFTER(정면).jpg`],

  // --- RHINOPLASTY 5-8 ---
  ["rhinoplasty-case-5", `${SRC}/코/이미지/03/BEFORE(측면).jpg`, `${SRC}/코/이미지/03/AFTER(측면).jpg`],
  ["rhinoplasty-case-6", `${SRC}/코/이미지/04/BEFORE(측면).jpg`, `${SRC}/코/이미지/04/AFTER(측면).jpg`],
  ["rhinoplasty-case-7", `${SRC}/코/이미지/05/BEFORE(측면).jpg`, `${SRC}/코/이미지/05/AFTER(측면).jpg`],
  ["rhinoplasty-case-8", `${SRC}/코/이미지/06/A.jpg`, `${SRC}/코/이미지/06/B.jpg`],

  // --- FACIAL CONTOURING 5-8 ---
  ["facial-contouring-case-5", `${SRC}/안면윤곽/이미지/02/BEFORE(정면).jpg`, `${SRC}/안면윤곽/이미지/02/AFTER(정면).jpg`],
  ["facial-contouring-case-6", `${SRC}/안면윤곽/이미지/03/BEFORE(정면).jpg`, `${SRC}/안면윤곽/이미지/03/AFTER(정면).jpg`],
  ["facial-contouring-case-7", `${SRC}/안면윤곽/이미지/04/BEFORE(정면).jpg`, `${SRC}/안면윤곽/이미지/04/AFTER(정면).jpg`],
  ["facial-contouring-case-8", `${SRC}/안면윤곽/이미지/06/A.jpg`, `${SRC}/안면윤곽/이미지/06/B.jpg`],

  // --- EYES 5-8 ---
  ["eyes-case-5", `${SRC}/눈/이미지/쌍커풀/01/BEFORE(정면).jpg`, `${SRC}/눈/이미지/쌍커풀/01/AFTER(정면).jpg`],
  ["eyes-case-6", `${SRC}/눈/이미지/쌍커풀/02/BEFORE(정면).jpg`, `${SRC}/눈/이미지/쌍커풀/02/AFTER(정면).jpg`],
  ["eyes-case-7", `${SRC}/눈/이미지/눈밑지/01/BEFORE(정면).jpg`, `${SRC}/눈/이미지/눈밑지/01/AFTER(정면).jpg`],
  ["eyes-case-8", `${SRC}/눈/이미지/눈밑지/02/BEFORE(정면).jpg`, `${SRC}/눈/이미지/눈밑지/02/AFTER(정면).jpg`],

  // --- DOUBLE CHIN 5-8 ---
  ["double-chin-case-5", `${SRC}/이중턱/이미지/01/BEFORE(반측면).jpg`, `${SRC}/이중턱/이미지/01/AFTER(반측면).jpg`],
  ["double-chin-case-6", `${SRC}/이중턱/이미지/02/BEFORE(반측면).jpg`, `${SRC}/이중턱/이미지/02/AFTER(반측면).jpg`],
  ["double-chin-case-7", `${SRC}/이중턱/이미지/03/BEFORE(반측면).jpg`, `${SRC}/이중턱/이미지/03/AFTER(반측면).jpg`],
  ["double-chin-case-8", `${SRC}/이중턱/이미지/05/BEFORE(반측면).jpg`, `${SRC}/이중턱/이미지/05/AFTER(반측면).jpg`],

  // --- BREAST AUG 5-8 ---
  ["breast-augmentation-case-5", `${SRC}/가슴확대/이미지/01/BEFORE(정면).jpg`, `${SRC}/가슴확대/이미지/01/AFTER(정면).jpg`],
  ["breast-augmentation-case-6", `${SRC}/가슴확대/이미지/03/BEFORE(정면).jpg`, `${SRC}/가슴확대/이미지/03/AFTER(정면).jpg`],
  ["breast-augmentation-case-7", `${SRC}/가슴확대/이미지/04/BEFORE(반측면).jpg`, `${SRC}/가슴확대/이미지/04/AFTER(반측면).jpg`],
  ["breast-augmentation-case-8", `${SRC}/가슴확대/이미지/06/BEFORE(정면).jpg`, `${SRC}/가슴확대/이미지/06/AFTER(정면).jpg`],

  // --- BREAST RED 5-8 (skip names, use anonymized sources) ---
  ["breast-reduction-case-5", `${SRC}/가슴축소/이미지/09/A.jpg`, `${SRC}/가슴축소/이미지/09/B.jpg`],
  ["breast-reduction-case-6", `${SRC}/가슴축소/이미지/01/김유나_before.jpg`, `${SRC}/가슴축소/이미지/01/김유나_after.jpg`],
  ["breast-reduction-case-7", `${SRC}/가슴축소/이미지/02/송미현_before.jpg`, `${SRC}/가슴축소/이미지/02/송미현_after.jpg`],
  ["breast-reduction-case-8", `${SRC}/가슴축소/이미지/03/신선미_before.jpg`, `${SRC}/가슴축소/이미지/03/신선미_after.jpg`],

  // --- LIPOSUCTION 4-7 ---
  ["liposuction-case-4", `${SRC}/지방흡입/이미지/복부/01/BEFORE(정면).jpg`, `${SRC}/지방흡입/이미지/복부/01/AFTER(정면).jpg`],
  ["liposuction-case-5", `${SRC}/지방흡입/이미지/복부/02/BEFORE(정면).jpg`, `${SRC}/지방흡입/이미지/복부/02/AFTER(정면).jpg`],
  ["liposuction-case-6", `${SRC}/지방흡입/이미지/허벅지/01/BEFORE.jpg`, `${SRC}/지방흡입/이미지/허벅지/01/AFTER.jpg`],
  ["liposuction-case-7", `${SRC}/지방흡입/이미지/허벅지/02/BEFORE.jpg`, `${SRC}/지방흡입/이미지/허벅지/02/AFTER.jpg`],
];

const TARGET_HEIGHT = 700;

async function combine(name, beforePath, afterPath) {
  try {
    const [beforeBuf, afterBuf] = await Promise.all([
      sharp(beforePath).resize({ height: TARGET_HEIGHT }).jpeg({ quality: 85 }).toBuffer(),
      sharp(afterPath).resize({ height: TARGET_HEIGHT }).jpeg({ quality: 85 }).toBuffer(),
    ]);
    const [beforeMeta, afterMeta] = await Promise.all([
      sharp(beforeBuf).metadata(),
      sharp(afterBuf).metadata(),
    ]);
    const gap = 4;
    const totalWidth = beforeMeta.width + afterMeta.width + gap;
    await sharp({
      create: { width: totalWidth, height: TARGET_HEIGHT, channels: 3, background: { r: 255, g: 255, b: 255 } },
    })
      .composite([
        { input: beforeBuf, left: 0, top: 0 },
        { input: afterBuf, left: beforeMeta.width + gap, top: 0 },
      ])
      .jpeg({ quality: 85 })
      .toFile(path.join(DEST, `${name}.png`));
    console.log(`OK  ${name}.png (${totalWidth}x${TARGET_HEIGHT})`);
  } catch (err) {
    console.error(`ERR ${name}: ${err.message}`);
  }
}

console.log(`Processing ${cases.length} additional cases...\n`);
for (const [name, before, after] of cases) {
  await combine(name, before, after);
}
console.log("\nDone!");

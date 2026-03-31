import sharp from "sharp";
import path from "path";
import { mkdirSync } from "fs";

const SRC = "/Users/dr.jeehoonju/Downloads/영미권 에이전시 전달";
const DEST = path.resolve("public/assets/explore-gallery");
mkdirSync(DEST, { recursive: true });

// Each entry: [outputName, beforePath, afterPath]
// A = before, B = after for A/B naming
const cases = [
  // --- FACELIFT ---
  ["facelift-case-1", `${SRC}/안면거상/이미지/01/BEFORE(정면).jpg`, `${SRC}/안면거상/이미지/01/AFTER(정면).jpg`],
  ["facelift-case-2", `${SRC}/안면거상/이미지/04/BEFORE(정면).jpg`, `${SRC}/안면거상/이미지/04/AFTER(정면).jpg`],
  ["facelift-case-3", `${SRC}/안면거상/이미지/05/BEFORE(정면).jpg`, `${SRC}/안면거상/이미지/05/AFTER(정면).jpg`],
  ["facelift-case-4", `${SRC}/안면거상/이미지/06/BEFORE(정면).jpg`, `${SRC}/안면거상/이미지/06/AFTER(정면).jpg`],

  // --- RHINOPLASTY ---
  ["rhinoplasty-case-1", `${SRC}/코/이미지/01/BEFORE(측면).png`, `${SRC}/코/이미지/01/AFTER(측면).jpg`],
  ["rhinoplasty-case-2", `${SRC}/코/이미지/02/BEFORE(측면).png`, `${SRC}/코/이미지/02/AFTER(측면).jpg`],
  ["rhinoplasty-case-3", `${SRC}/코/이미지/08/A.jpg`, `${SRC}/코/이미지/08/B.jpg`],
  ["rhinoplasty-case-4", `${SRC}/코/이미지/09/A.jpg`, `${SRC}/코/이미지/09/B.jpg`],

  // --- FACIAL CONTOURING ---
  ["facial-contouring-case-1", `${SRC}/안면윤곽/이미지/01/BEFORE(정면).jpg`, `${SRC}/안면윤곽/이미지/01/AFTER(정면).jpg`],
  ["facial-contouring-case-2", `${SRC}/안면윤곽/이미지/05/BEFORE(정면).png`, `${SRC}/안면윤곽/이미지/05/AFTER(정면).png`],
  ["facial-contouring-case-3", `${SRC}/안면윤곽/이미지/08/A.jpg`, `${SRC}/안면윤곽/이미지/08/B.jpg`],
  ["facial-contouring-case-4", `${SRC}/안면윤곽/이미지/10/A.jpg`, `${SRC}/안면윤곽/이미지/10/B.jpg`],

  // --- EYES ---
  ["eyes-case-1", `${SRC}/눈/이미지/쌍커풀/04/BEFORE(정면).jpg`, `${SRC}/눈/이미지/쌍커풀/04/AFTER(정면).jpg`],
  ["eyes-case-2", `${SRC}/눈/이미지/쌍커풀/06/A.jpg`, `${SRC}/눈/이미지/쌍커풀/06/B.jpg`],
  ["eyes-case-3", `${SRC}/눈/이미지/눈밑지/04/BEFORE(정면).jpg`, `${SRC}/눈/이미지/눈밑지/04/AFTER(정면).jpg`],
  ["eyes-case-4", `${SRC}/눈/이미지/눈밑지/15/A.jpg`, `${SRC}/눈/이미지/눈밑지/15/B.jpg`],

  // --- DOUBLE CHIN ---
  ["double-chin-case-1", `${SRC}/이중턱/이미지/04/BEFORE(반측면).jpg`, `${SRC}/이중턱/이미지/04/AFTER(반측면).jpg`],
  ["double-chin-case-2", `${SRC}/이중턱/이미지/07/BEFORE(반측면).jpg`, `${SRC}/이중턱/이미지/07/AFTER(반측면).jpg`],
  ["double-chin-case-3", `${SRC}/이중턱/이미지/11/A.jpg`, `${SRC}/이중턱/이미지/11/B.jpg`],
  ["double-chin-case-4", `${SRC}/이중턱/이미지/12/A.jpg`, `${SRC}/이중턱/이미지/12/B.jpg`],

  // --- BREAST AUGMENTATION ---
  ["breast-augmentation-case-1", `${SRC}/가슴확대/이미지/02/BEFORE(정면).jpg`, `${SRC}/가슴확대/이미지/02/AFTER(정면).jpg`],
  ["breast-augmentation-case-2", `${SRC}/가슴확대/이미지/10/A.jpg`, `${SRC}/가슴확대/이미지/10/B.jpg`],
  ["breast-augmentation-case-3", `${SRC}/가슴확대/이미지/12/A.jpg`, `${SRC}/가슴확대/이미지/12/B.jpg`],
  ["breast-augmentation-case-4", `${SRC}/가슴확대/이미지/13/A.jpg`, `${SRC}/가슴확대/이미지/13/B.jpg`],

  // --- BREAST REDUCTION ---
  ["breast-reduction-case-1", `${SRC}/가슴축소/이미지/06/A.jpg`, `${SRC}/가슴축소/이미지/06/B.jpg`],
  ["breast-reduction-case-2", `${SRC}/가슴축소/이미지/07/A.jpg`, `${SRC}/가슴축소/이미지/07/B.jpg`],
  ["breast-reduction-case-3", `${SRC}/가슴축소/이미지/08/A.jpg`, `${SRC}/가슴축소/이미지/08/B.jpg`],
  ["breast-reduction-case-4", `${SRC}/가슴축소/이미지/10/A.jpg`, `${SRC}/가슴축소/이미지/10/B.jpg`],

  // --- LIPOSUCTION ---
  ["liposuction-case-1", `${SRC}/지방흡입/이미지/복부/06/A.jpg`, `${SRC}/지방흡입/이미지/복부/06/B.jpg`],
  ["liposuction-case-2", `${SRC}/지방흡입/이미지/허벅지/06/A.jpg`, `${SRC}/지방흡입/이미지/허벅지/06/B.jpg`],
  ["liposuction-case-3", `${SRC}/지방흡입/이미지/팔/06/A (1).jpg`, `${SRC}/지방흡입/이미지/팔/06/B (1).jpg`],
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
      create: {
        width: totalWidth,
        height: TARGET_HEIGHT,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
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

console.log(`Processing ${cases.length} cases...\n`);
for (const [name, before, after] of cases) {
  await combine(name, before, after);
}
console.log("\nDone!");

const fs = require('fs');
const path = require('path');

const dictionaries = {
  en: {
    badge: "More Domains",
    title: "Comprehensive Case Library",
    subtitle: "Explore our expanding range of specialized procedures. Click a category to preview.",
    comingSoon: "Detailed cases are being prepared.",
    categories: {
      threadLifting: "Thread Lifting",
      facelift: "Facelift",
      rhinoplasty: "Rhinoplasty",
      fatGrafting: "Fat Grafting",
      liposuction: "Liposuction",
      orthognathic: "Orthognathic Surgery",
      orthodontics: "Orthodontics"
    }
  },
  ko: {
    badge: "기타 진료 분야",
    title: "종합 케이스 라이브러리",
    subtitle: "확장 중인 다양한 전문 시술 사례들을 확인해보세요. 카테고리를 클릭하면 확대됩니다.",
    comingSoon: "상세 케이스 사진을 준비 중입니다.",
    categories: {
      threadLifting: "실리프팅",
      facelift: "안면거상",
      rhinoplasty: "코 성형",
      fatGrafting: "지방이식",
      liposuction: "지방흡입",
      orthognathic: "양악수술",
      orthodontics: "치아교정"
    }
  },
  zh: {
    badge: "更多领域",
    title: "综合案例库",
    subtitle: "探索我们不断扩展的专业手术范围。点击类别进行预览。",
    comingSoon: "详细案例照片正在准备中。",
    categories: {
      threadLifting: "埋线提升",
      facelift: "面部提升",
      rhinoplasty: "鼻部整形",
      fatGrafting: "脂肪移植",
      liposuction: "吸脂",
      orthognathic: "双颚手术",
      orthodontics: "牙齿矫正"
    }
  },
  ja: {
    badge: "その他の分野",
    title: "総合症例ライブラリ",
    subtitle: "拡大中の様々な専門施術をご覧ください。カテゴリーをクリックするとプレビューが表示されます。",
    comingSoon: "詳細な症例写真を準備中です。",
    categories: {
      threadLifting: "糸リフト",
      facelift: "切開フェイスリフト",
      rhinoplasty: "鼻整形",
      fatGrafting: "脂肪注入",
      liposuction: "脂肪吸引",
      orthognathic: "両顎手術",
      orthodontics: "歯科矯正"
    }
  },
  th: {
    badge: "สาขาอื่นๆ",
    title: "คลังกรณีศึกษาแบบครอบคลุม",
    subtitle: "สำรวจขั้นตอนเฉพาะทางที่หลากหลายของเรา คลิกหมวดหมู่เพื่อดูตัวอย่าง",
    comingSoon: "กำลังเตรียมรูปถ่ายกรณีศึกษาโดยละเอียด",
    categories: {
      threadLifting: "ร้อยไหม",
      facelift: "ดึงหน้า",
      rhinoplasty: "ศัลยกรรมจมูก",
      fatGrafting: "ฉีดไขมัน",
      liposuction: "ดูดไขมัน",
      orthognathic: "ศัลยกรรมขากรรไกร",
      orthodontics: "จัดฟัน"
    }
  },
  ru: {
    badge: "Другие направления",
    title: "Комплексная библиотека случаев",
    subtitle: "Изучите наш расширяющийся спектр специализированных процедур. Нажмите на категорию для предварительного просмотра.",
    comingSoon: "Подробные фотографии случаев находятся в стадии подготовки.",
    categories: {
      threadLifting: "Нитевой лифтинг",
      facelift: "Подтяжка лица",
      rhinoplasty: "Ринопластика",
      fatGrafting: "Липофилинг",
      liposuction: "Липосакция",
      orthognathic: "Ортогнатическая хирургия",
      orthodontics: "Ортодонтия"
    }
  }
};

const dir = path.join(__dirname, 'src', 'i18n', 'dictionaries');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (!file.endsWith('.json')) return;
  const lang = path.basename(file, '.json');
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (data.explore) {
    const translations = dictionaries[lang] || dictionaries.en;
    
    // Add moreCategories after caseStudies
    data.explore.moreCategories = translations;
    
    // Write back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Patched ${lang}`);
  }
});

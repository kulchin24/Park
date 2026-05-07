// app.jsx — Ojima-Komatsugawa Park homepage

// note: don't destructure React hooks at module scope — multiple Babel scripts share scope
const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;
const useMemo = React.useMemo;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "season": "spring",
  "lang": "ja",
  "palette": ["#2a4226", "#c2532a", "#f3ede0"],
  "serif": true
}/*EDITMODE-END*/;

// ── translations ──────────────────────────────────────────────────────────
const T = {
  nav: {
    overview: { ja: '園について', en: 'Overview' },
    activities: { ja: '楽しみ方', en: 'Activities' },
    map: { ja: '園内マップ', en: 'Map' },
    facilities: { ja: '施設案内', en: 'Facilities' },
    events: { ja: 'イベント', en: 'Events' },
    history: { ja: '公園の歩み', en: 'History' },
    rules: { ja: 'ご利用案内', en: 'Rules' },
    access: { ja: 'アクセス', en: 'Access' },
  },
  hero: {
    eyebrow: { ja: '東京都立公園', en: 'A Tokyo Metropolitan Park' },
    title1: { ja: '川を渡り、', en: 'Cross the river,' },
    title2: { ja: '風の丘へ。', en: 'climb the hill of wind.' },
    sub: {
      ja: '荒川と旧中川にはさまれた、千本の桜と広い芝生の公園。江戸川区と江東区にまたがります。',
      en: 'Between the Arakawa and Old Nakagawa rivers — a thousand cherry trees, wide lawns, and a long greenway across Edogawa and Koto wards.'
    },
    cta1: { ja: '園内マップを見る', en: 'See the park map' },
    cta2: { ja: 'アクセス・営業時間', en: 'Hours & access' },
  },
  facts: [
    { v: '24.6', u: 'ha', ja: '園地面積', en: 'Park area' },
    { v: '1,000', u: '本', ja: '桜の木', en: 'Cherry trees' },
    { v: '3', u: '分', ja: '東大島駅から', en: 'From the station' },
    { v: '2', u: 'つ', ja: '区にまたがる', en: 'City wards spanned' },
  ],
};

// ── data ──────────────────────────────────────────────────────────────────
const ACTIVITIES = [
  { id: 'sakura', ja: '桜の下を歩く', en: 'Walk under the sakura',
    desc_ja: '春、千本桜が園を薄紅に染めます。早朝の散策がおすすめ。',
    desc_en: 'In spring, a thousand cherry trees flush the park pink. Early mornings are quietest.',
    season: 'spring' },
  { id: 'jog', ja: '荒川沿いを走る', en: 'Run the riverside',
    desc_ja: '1km以上のジョギングコース。河川敷ともつながっています。',
    desc_en: 'Over 1km of jogging paths, continuous with the Arakawa riverbed course.',
    season: 'all' },
  { id: 'bbq', ja: 'バーベキュー', en: 'Barbecue with friends',
    desc_ja: '予約制のバーベキュー広場。手ぶらプランあり。',
    desc_en: 'Reservation-only BBQ area. Plans available — bring nothing but yourselves.',
    season: 'summer' },
  { id: 'play', ja: '子どもと遊ぶ', en: 'Play with the kids',
    desc_ja: '冒険広場とアスレチックで一日中遊べます。',
    desc_en: 'Adventure plaza and athletic field — a full day of running around.',
    season: 'all' },
  { id: 'sport', ja: 'スポーツをする', en: 'Sports',
    desc_ja: '野球場・テニスコート・サッカー場(要予約)。',
    desc_en: 'Baseball, tennis courts, and a soccer pitch (reservation required).',
    season: 'all' },
  { id: 'view', ja: '風の広場で空を見る', en: 'Look out from the Wind Hill',
    desc_ja: '園内一の高台。スカイツリーと荒川が一望できます。',
    desc_en: 'The highest point in the park — Skytree and the Arakawa in one sweep.',
    season: 'all' },
];

const EVENTS = [
  { date: '03.29', month: 'Mar', ja: '小松川千本桜まつり', en: 'Senbon Sakura Festival', tag: '春', tagEn: 'Spring' },
  { date: '05.04', month: 'May', ja: 'みどりの日 自然観察会', en: 'Greenery Day Nature Walk', tag: '春', tagEn: 'Spring' },
  { date: '07.20', month: 'Jul', ja: '夏休みこども広場', en: 'Summer Kids Plaza', tag: '夏', tagEn: 'Summer' },
  { date: '08.10', month: 'Aug', ja: '夕涼みコンサート', en: 'Evening Cool Concert', tag: '夏', tagEn: 'Summer' },
  { date: '10.18', month: 'Oct', ja: '秋の自由広場ピクニック', en: 'Autumn Picnic on Freedom Plaza', tag: '秋', tagEn: 'Autumn' },
  { date: '11.23', month: 'Nov', ja: '紅葉ウォーク', en: 'Autumn Leaves Walk', tag: '秋', tagEn: 'Autumn' },
];

const FACILITIES = [
  { id: 'bbq', ja: 'バーベキュー広場', en: 'BBQ Area', meta_ja: '要予約・有料', meta_en: 'Reservation, paid' },
  { id: 'baseball', ja: '野球場', en: 'Baseball Diamonds', meta_ja: '3面・予約制', meta_en: '3 fields, reserve' },
  { id: 'tennis', ja: 'テニスコート', en: 'Tennis Courts', meta_ja: '予約制・有料', meta_en: 'Reserve, paid' },
  { id: 'soccer', ja: 'サッカー場', en: 'Soccer Field', meta_ja: '予約制', meta_en: 'Reservation' },
  { id: 'play', ja: 'アスレチック・冒険広場', en: 'Athletic & Play', meta_ja: '無料・自由利用', meta_en: 'Free, open' },
  { id: 'parking', ja: '駐車場', en: 'Parking', meta_ja: '有料・約100台', meta_en: 'Paid, ~100 cars' },
  { id: 'wc', ja: 'お手洗い', en: 'Restrooms', meta_ja: '園内6か所・多目的有', meta_en: '6 sites, accessible' },
  { id: 'lock', ja: 'コインロッカー', en: 'Lockers', meta_ja: '管理事務所付近', meta_en: 'By the office' },
];

const RULES = [
  { ja: '指定場所以外での火気使用はできません', en: 'No open flame outside designated areas' },
  { ja: 'ペットはリードを着用してください', en: 'Pets must be on a leash' },
  { ja: 'ゴミはお持ち帰りください', en: 'Please carry out your trash' },
  { ja: '自転車は徐行・指定通路でお願いします', en: 'Cycle slowly, on designated paths' },
  { ja: 'ドローンの使用は禁止されています', en: 'Drones are prohibited' },
  { ja: '夜間の大声や花火はご遠慮ください', en: 'No loud noise or fireworks at night' },
];

const SEASONS = [
  { id: 'spring', ja: '春', en: 'Spring', tagline_ja: '桜が咲く', tagline_en: 'Cherry bloom', months: '3 — 5' },
  { id: 'summer', ja: '夏', en: 'Summer', tagline_ja: '緑が深まる', tagline_en: 'Deep green', months: '6 — 8' },
  { id: 'autumn', ja: '秋', en: 'Autumn', tagline_ja: '紅葉と風', tagline_en: 'Leaves & wind', months: '9 — 11' },
  { id: 'winter', ja: '冬', en: 'Winter', tagline_ja: '澄んだ空', tagline_en: 'Clear skies', months: '12 — 2' },
];

// ── animated hero background (SVG with motion) ────────────────────────────
function HeroMotion({ season }) {
  const seasonColors = {
    spring: { sky1: '#f6e7df', sky2: '#e8d4d0', hill1: '#a8c47a', hill2: '#7fa86b', water: '#bcd6dc',
              petals: '#f2b6c6', sun: '#f2c79a' },
    summer: { sky1: '#dfeaf0', sky2: '#bcd6dc', hill1: '#7fa86b', hill2: '#4d6b3a', water: '#a8c8d0',
              petals: '#ffffff', sun: '#f5d77a' },
    autumn: { sky1: '#f1d9b8', sky2: '#e0a766', hill1: '#c2853a', hill2: '#7e5f47', water: '#9fb0b3',
              petals: '#d99a55', sun: '#e89a4a' },
    winter: { sky1: '#dfe4e8', sky2: '#c4cdd1', hill1: '#a8a89a', hill2: '#7c7c70', water: '#b9c9cc',
              petals: '#ffffff', sun: '#e9e2d0' },
  }[season];

  const numPetals = 28;
  const petals = useMemo(() => Array.from({ length: numPetals }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 14,
    dur: 12 + Math.random() * 14,
    scale: 0.4 + Math.random() * 0.8,
    drift: -8 + Math.random() * 16,
  })), [season]);

  return (
    <div className="hero-motion" aria-hidden>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"
           style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={seasonColors.sky1}/>
            <stop offset="1" stopColor={seasonColors.sky2}/>
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={seasonColors.water}/>
            <stop offset="1" stopColor={seasonColors.water} stopOpacity="0.6"/>
          </linearGradient>
        </defs>

        {/* sky */}
        <rect width="1600" height="900" fill="url(#sky)"/>

        {/* sun / moon */}
        <circle cx="1180" cy="240" r="80" fill={seasonColors.sun} opacity="0.8"/>

        {/* far ridges */}
        <path d="M 0 480 Q 200 420 420 460 T 820 470 T 1280 440 T 1600 460 L 1600 900 L 0 900 Z"
              fill={seasonColors.hill1} opacity="0.55"/>
        <path d="M 0 560 Q 240 500 480 540 T 920 530 T 1360 520 T 1600 540 L 1600 900 L 0 900 Z"
              fill={seasonColors.hill1} opacity="0.85"/>

        {/* river */}
        <path d="M 0 700 Q 400 670 800 700 T 1600 700 L 1600 800 Q 1200 770 800 800 T 0 800 Z"
              fill="url(#water)"/>
        {/* river highlights — waves */}
        <g className="hero-waves" opacity="0.55">
          <path d="M 0 720 q 100 -10 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0"
                fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4"/>
          <path d="M 0 760 q 100 -10 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0"
                fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
        </g>

        {/* foreground hill */}
        <path d="M 0 800 Q 300 700 700 760 T 1600 740 L 1600 900 L 0 900 Z"
              fill={seasonColors.hill2}/>

        {/* trees on near hill */}
        <g>
          {[120, 260, 380, 540, 680, 820, 980, 1120, 1280, 1440].map((x, i) => (
            <g key={i} transform={`translate(${x} ${770 + (i%2)*8})`}>
              <ellipse cx="0" cy="0" rx="22" ry="26" fill={season === 'autumn' ? '#d99a55' : seasonColors.hill1} opacity="0.95"/>
              <ellipse cx="-8" cy="-8" rx="14" ry="16" fill={season === 'spring' ? seasonColors.petals : seasonColors.hill1} opacity="0.55"/>
              <rect x="-2" y="14" width="4" height="14" fill="#5a4a3a" opacity="0.8"/>
            </g>
          ))}
        </g>

        {/* a single tall cherry tree silhouette */}
        <g transform="translate(280 800)">
          <path d="M 0 0 L 0 -120" stroke="#3a2e22" strokeWidth="6" fill="none"/>
          <path d="M 0 -60 L -40 -90 M 0 -80 L 35 -100 M 0 -100 L -30 -130 M 0 -110 L 30 -130"
                stroke="#3a2e22" strokeWidth="3" fill="none"/>
          <circle cx="0" cy="-130" r="50" fill={seasonColors.petals} opacity="0.9"/>
          <circle cx="-30" cy="-110" r="28" fill={seasonColors.petals} opacity="0.85"/>
          <circle cx="30" cy="-115" r="26" fill={seasonColors.petals} opacity="0.85"/>
        </g>
      </svg>

      {/* falling petals (CSS animated) */}
      <div className="hero-petals" style={{ '--petal-color': seasonColors.petals }}>
        {petals.map((p, i) => (
          <span key={i} className="petal"
                style={{ left: p.x + '%', animationDelay: -p.delay + 's',
                         animationDuration: p.dur + 's',
                         '--scale': p.scale, '--drift': p.drift + 'vw' }}/>
        ))}
      </div>
    </div>
  );
}

// ── header ────────────────────────────────────────────────────────────────
function Header({ lang, setLang, season }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'site-hd' + (scrolled ? ' scrolled' : '')}>
      <a href="#top" className="logo">
        <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden>
          <circle cx="20" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M 20 8 Q 14 16 20 22 Q 26 16 20 8 Z" fill="currentColor"/>
          <circle cx="20" cy="22" r="2.5" fill="currentColor"/>
        </svg>
        <span className="logo-text">
          <b>{lang === 'ja' ? '大島小松川公園' : 'Ojima-Komatsugawa'}</b>
          <em>{lang === 'ja' ? 'Ojima-Komatsugawa Park' : '大島小松川公園'}</em>
        </span>
      </a>
      <nav>
        {Object.entries(T.nav).map(([k, v]) => (
          <a key={k} href={'#' + k}>{v[lang]}</a>
        ))}
      </nav>
      <div className="hd-right">
        <button className={'lang-btn' + (lang === 'ja' ? ' active' : '')} onClick={() => setLang('ja')}>JA</button>
        <span className="lang-sep">·</span>
        <button className={'lang-btn' + (lang === 'en' ? ' active' : '')} onClick={() => setLang('en')}>EN</button>
      </div>
    </header>
  );
}

// ── season toggle ────────────────────────────────────────────────────────
function SeasonStrip({ season, setSeason, lang }) {
  return (
    <div className="season-strip">
      <span className="season-strip-label">
        {lang === 'ja' ? '季節を切り替える' : 'Change season'}
      </span>
      <div className="season-tabs" role="tablist">
        {SEASONS.map(s => (
          <button key={s.id}
                  role="tab"
                  className={'season-tab ' + s.id + (season === s.id ? ' active' : '')}
                  onClick={() => setSeason(s.id)}>
            <span className="st-dot"/>
            <span className="st-ja">{s.ja}</span>
            <span className="st-en">{s.en}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── hero ─────────────────────────────────────────────────────────────────
function Hero({ lang, season, setSeason }) {
  return (
    <section id="top" className="hero">
      <HeroMotion season={season}/>
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="he-dot"/> {T.hero.eyebrow[lang]}
          <span className="he-sep">／</span>
          <span className="he-id">No. 81</span>
        </div>

        <h1 className="hero-title">
          <span className="ht-line">{T.hero.title1[lang]}</span>
          <span className="ht-line ht-line-2">{T.hero.title2[lang]}</span>
        </h1>

        <p className="hero-sub">{T.hero.sub[lang]}</p>

        <div className="hero-cta">
          <a className="btn btn-primary" href="#map">
            {T.hero.cta1[lang]}
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10 M8 3l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a className="btn btn-ghost" href="#access">{T.hero.cta2[lang]}</a>
        </div>
      </div>

      {/* facts strip at bottom */}
      <div className="hero-facts">
        {T.facts.map((f, i) => (
          <div key={i} className="fact">
            <div className="fact-num"><b>{f.v}</b><span>{f.u}</span></div>
            <div className="fact-lab">{lang === 'ja' ? f.ja : f.en}</div>
          </div>
        ))}
      </div>

      <SeasonStrip season={season} setSeason={setSeason} lang={lang}/>
    </section>
  );
}

window.Hero = Hero;
window.Header = Header;
window.ACTIVITIES = ACTIVITIES;
window.EVENTS = EVENTS;
window.FACILITIES = FACILITIES;
window.RULES = RULES;
window.SEASONS = SEASONS;
window.T = T;
window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;

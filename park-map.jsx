// park-map.jsx
// Stylized illustrated map of Ojima-Komatsugawa Park.
// East side: Freedom Plaza, BBQ, Athletic field, Kaze no Hiroba (windy hill viewpoint)
// West side: Wanzaka Plaza, baseball, tennis, soccer
// Old Nakagawa River runs N-S between them; bridges Sakura Ohashi & Momiji Ohashi.
// Arakawa River on the east edge.
//
// Props: season ('spring'|'summer'|'autumn'|'winter'), activeId, onHover(id|null), onSelect(id), palette
//
// All coords in a 1000x640 viewBox.

const PARK_POIS = [
  { id: 'kaze',   ja: '風の広場',     en: 'Kaze no Hiroba',  cx: 760, cy: 240, kind: 'hill',   note: '展望の丘 / Lookout hill' },
  { id: 'free',   ja: '自由の広場',   en: 'Freedom Plaza',   cx: 660, cy: 360, kind: 'lawn',   note: '広い芝生 / Open lawn' },
  { id: 'bbq',    ja: 'バーベキュー広場', en: 'BBQ Area',     cx: 720, cy: 460, kind: 'bbq',    note: '要予約 / Reservation' },
  { id: 'ath',    ja: 'アスレチック',  en: 'Athletic Field',  cx: 580, cy: 470, kind: 'play',   note: '遊具 / Play structures' },
  { id: 'play',   ja: '冒険広場',      en: 'Adventure Plaza', cx: 620, cy: 250, kind: 'play',   note: 'こども向け / Kids' },
  { id: 'wan',    ja: 'わんさか広場',   en: 'Wanzaka Plaza',  cx: 280, cy: 330, kind: 'lawn',   note: '芝生・ピクニック' },
  { id: 'base',   ja: '野球場',        en: 'Baseball',        cx: 180, cy: 200, kind: 'sport',  note: '3面 / 3 diamonds' },
  { id: 'ten',    ja: 'テニスコート',   en: 'Tennis',          cx: 130, cy: 410, kind: 'sport',  note: 'コート / Courts' },
  { id: 'soc',    ja: 'サッカー場',     en: 'Soccer',          cx: 220, cy: 510, kind: 'sport',  note: 'グラウンド' },
  { id: 'sakura', ja: '桜の小径',       en: 'Cherry Walk',     cx: 845, cy: 110, kind: 'walk',   note: '千本桜 / 1,000 sakura' },
  { id: 'sakubr', ja: '桜大橋',         en: 'Sakura Ohashi',   cx: 430, cy: 220, kind: 'bridge', note: '橋' },
  { id: 'momiji', ja: '紅葉大橋',       en: 'Momiji Ohashi',   cx: 430, cy: 470, kind: 'bridge', note: '橋' },
  { id: 'sta',    ja: '東大島駅',       en: 'Higashi-Ojima Sta.', cx: 70, cy: 590, kind: 'station', note: '都営新宿線 徒歩3分' },
  { id: 'park',   ja: '駐車場',         en: 'Parking',          cx: 490, cy: 580, kind: 'parking', note: '有料 / Paid' },
];

window.PARK_POIS = PARK_POIS;

function ParkMap({ season = 'spring', activeId = null, onHover = () => {}, onSelect = () => {}, lang = 'ja' }) {
  // season-driven foliage colors
  const seasons = {
    spring: { tree: '#cfe3b8', accent: '#f2b6c6', accent2: '#e9a7b8', water: '#bcd6dc', grass: '#d8e3b8', soil: '#e6dcc6' },
    summer: { tree: '#7fa86b', accent: '#cfe1a8', accent2: '#a8c47a', water: '#a8c8d0', grass: '#a9c388', soil: '#e0d4ba' },
    autumn: { tree: '#d99a55', accent: '#c2532a', accent2: '#e7b56a', water: '#9fb0b3', grass: '#c9b380', soil: '#d8c69e' },
    winter: { tree: '#b9b6a8', accent: '#e8e2d0', accent2: '#d6cfb8', water: '#b9c9cc', grass: '#cfc8b3', soil: '#d2c8b3' },
  };
  const s = seasons[season] || seasons.spring;

  // deterministic PRNG for tree clusters
  const rand = (seed) => { let x = Math.sin(seed) * 10000; return x - Math.floor(x); };

  // tree clusters: zones where trees grow
  const treeZones = [
    // east side trees (cherry walk along arakawa)
    ...Array.from({ length: 38 }, (_, i) => ({ x: 800 + (rand(i+1)-0.5)*60, y: 80 + i*12, r: 6 + rand(i+11)*5, kind: 'cherry' })),
    // around freedom plaza
    ...Array.from({ length: 22 }, (_, i) => ({ x: 540 + rand(i+30)*220, y: 180 + rand(i+40)*220, r: 7 + rand(i+50)*4, kind: 'tree' })),
    // east edge sakura
    ...Array.from({ length: 16 }, (_, i) => ({ x: 510 + rand(i+60)*40, y: 100 + i*22, r: 5 + rand(i+70)*4, kind: 'cherry' })),
    // west side scattered
    ...Array.from({ length: 26 }, (_, i) => ({ x: 60 + rand(i+80)*340, y: 100 + rand(i+90)*460, r: 6 + rand(i+100)*4, kind: 'tree' })),
  ];

  const poiColor = (kind) => ({
    hill: '#a98c5a', lawn: '#7fa86b', bbq: '#c2532a', play: '#d4a13a',
    sport: '#5b7a8c', walk: '#d68aa3', bridge: '#8b6b3e', station: '#29261b', parking: '#6b6353'
  }[kind] || '#29261b');

  const Tree = ({ x, y, r, kind, i }) => {
    const c = kind === 'cherry' ? s.accent : s.tree;
    const c2 = kind === 'cherry' ? s.accent2 : s.tree;
    return (
      <g transform={`translate(${x},${y})`} opacity="0.95">
        <ellipse cx="1.5" cy="2" rx={r*0.9} ry={r*0.35} fill="rgba(0,0,0,0.08)"/>
        <circle cx="0" cy="0" r={r} fill={c}/>
        <circle cx={-r*0.35} cy={-r*0.25} r={r*0.55} fill={c2} opacity="0.7"/>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 1000 640" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <pattern id="grass" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill={s.grass}/>
          <path d="M0 6 L1 4 M3 6 L4 4" stroke={s.tree} strokeWidth="0.4" opacity="0.5"/>
        </pattern>
        <pattern id="water" width="20" height="8" patternUnits="userSpaceOnUse">
          <rect width="20" height="8" fill={s.water}/>
          <path d="M0 4 q5 -2 10 0 t10 0" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.6"/>
        </pattern>
        <pattern id="path" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={s.soil}/>
        </pattern>
      </defs>

      {/* base / park outline */}
      <rect x="0" y="0" width="1000" height="640" fill="#f3ede0"/>

      {/* west park area */}
      <path d="M 30 80 L 410 80 L 410 580 L 30 580 Z" fill="url(#grass)" opacity="0.85"/>
      {/* east park area (larger) */}
      <path d="M 460 60 L 940 60 L 970 100 L 970 600 L 470 600 Z" fill="url(#grass)" opacity="0.85"/>

      {/* Old Nakagawa river (between west and east) */}
      <path d="M 410 60 L 460 60 L 470 600 L 410 600 Z" fill="url(#water)"/>
      {/* Arakawa river along right edge */}
      <path d="M 940 40 L 1000 40 L 1000 620 L 970 620 Z" fill="url(#water)"/>

      {/* paths / jogging course */}
      <path d="M 80 130 Q 240 90 380 140 Q 280 280 180 380 Q 100 460 90 560"
            fill="none" stroke={s.soil} strokeWidth="9" strokeLinecap="round" opacity="0.85"/>
      <path d="M 510 110 Q 680 130 880 110 Q 920 280 880 480 Q 760 560 540 580 Q 500 380 510 110 Z"
            fill="none" stroke={s.soil} strokeWidth="11" strokeLinecap="round" opacity="0.85"/>

      {/* hill (kaze no hiroba) - contour lines */}
      <g opacity="0.85">
        <ellipse cx="760" cy="240" rx="90" ry="55" fill={s.tree} opacity="0.35"/>
        <ellipse cx="760" cy="240" rx="65" ry="38" fill={s.tree} opacity="0.45"/>
        <ellipse cx="760" cy="240" rx="38" ry="22" fill={s.tree} opacity="0.6"/>
      </g>

      {/* freedom plaza (large open lawn) */}
      <ellipse cx="660" cy="360" rx="140" ry="80" fill={s.grass} opacity="0.8" stroke={s.tree} strokeOpacity="0.3" strokeWidth="1"/>

      {/* baseball diamonds (west) */}
      <g transform="translate(140 180)" opacity="0.85">
        <circle cx="0" cy="0" r="38" fill="#e6dcc6" stroke={s.soil} strokeWidth="1"/>
        <path d="M 0 12 L 12 0 L 0 -12 L -12 0 Z" fill="none" stroke={s.soil} strokeWidth="1.5"/>
        <circle cx="60" cy="20" r="34" fill="#e6dcc6" stroke={s.soil} strokeWidth="1"/>
        <path d="M 60 32 L 72 20 L 60 8 L 48 20 Z" fill="none" stroke={s.soil} strokeWidth="1.5"/>
      </g>

      {/* tennis courts */}
      <g transform="translate(110 400)" opacity="0.9">
        {[0,1,2].map(i => (
          <g key={i} transform={`translate(${i*22} 0)`}>
            <rect x="0" y="0" width="18" height="38" fill="#7e5f47" stroke="#fff" strokeWidth="0.8"/>
            <line x1="0" y1="19" x2="18" y2="19" stroke="#fff" strokeWidth="0.6"/>
          </g>
        ))}
      </g>

      {/* soccer field */}
      <g transform="translate(180 480)" opacity="0.9">
        <rect x="0" y="0" width="100" height="60" rx="2" fill={s.grass} stroke="#fff" strokeWidth="1"/>
        <line x1="50" y1="0" x2="50" y2="60" stroke="#fff" strokeWidth="0.6"/>
        <circle cx="50" cy="30" r="8" fill="none" stroke="#fff" strokeWidth="0.6"/>
      </g>

      {/* athletic / playground */}
      <g transform="translate(560 460)" opacity="0.9">
        <circle cx="0" cy="0" r="22" fill={s.soil}/>
        <circle cx="35" cy="10" r="14" fill={s.soil}/>
        <rect x="-10" y="-30" width="20" height="6" rx="2" fill="#c2532a"/>
        <rect x="20" y="-15" width="14" height="4" rx="2" fill="#5b7a8c"/>
      </g>

      {/* bridges */}
      <g opacity="0.9">
        <rect x="408" y="216" width="54" height="10" fill="#8b6b3e" rx="2"/>
        <rect x="408" y="466" width="54" height="10" fill="#8b6b3e" rx="2"/>
      </g>

      {/* trees */}
      {treeZones.map((t, i) => <Tree key={i} {...t} i={i} />)}

      {/* bordering streets */}
      <rect x="0" y="0" width="1000" height="40" fill="#e9e2d0"/>
      <rect x="0" y="600" width="1000" height="40" fill="#e9e2d0"/>

      {/* station marker bottom-left, outside park */}
      <g transform="translate(70 605)">
        <rect x="-30" y="-12" width="60" height="22" rx="3" fill="#29261b"/>
        <text x="0" y="3" textAnchor="middle" fill="#f6f3ec" fontSize="10" fontFamily="ui-sans-serif">
          東大島駅
        </text>
      </g>

      {/* POI markers */}
      {PARK_POIS.filter(p => p.id !== 'sta').map((p) => {
        const active = p.id === activeId;
        const col = poiColor(p.kind);
        return (
          <g key={p.id}
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => onHover(p.id)}
             onMouseLeave={() => onHover(null)}
             onClick={() => onSelect(p.id)}>
            <circle cx={p.cx} cy={p.cy} r={active ? 22 : 14} fill={col} opacity={active ? 0.18 : 0.0}/>
            <circle cx={p.cx} cy={p.cy} r={active ? 9 : 6.5} fill={col} stroke="#f6f3ec" strokeWidth="2"/>
            {active && (
              <g>
                <rect x={p.cx + 14} y={p.cy - 18} width={lang === 'ja' ? 96 : 116} height="36" rx="4"
                      fill="#29261b" opacity="0.95"/>
                <text x={p.cx + 22} y={p.cy - 4} fill="#f6f3ec" fontSize="11" fontWeight="600"
                      fontFamily="ui-sans-serif">
                  {lang === 'ja' ? p.ja : p.en}
                </text>
                <text x={p.cx + 22} y={p.cy + 10} fill="rgba(246,243,236,0.7)" fontSize="9"
                      fontFamily="ui-sans-serif">
                  {lang === 'ja' ? p.en : p.ja}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* River labels */}
      <text x="436" y="50" fill="#5b7a8c" fontSize="11" fontWeight="500"
            transform="rotate(90 436 50)" opacity="0.7" fontFamily="ui-sans-serif">
        旧中川 Old Nakagawa
      </text>
      <text x="980" y="50" fill="#5b7a8c" fontSize="11" fontWeight="500"
            transform="rotate(90 980 50)" opacity="0.7" fontFamily="ui-sans-serif">
        荒川 Arakawa
      </text>

      {/* Compass */}
      <g transform="translate(930 80)" opacity="0.7">
        <circle r="18" fill="#f6f3ec" stroke="#29261b" strokeWidth="0.8"/>
        <path d="M 0 -14 L 4 0 L 0 14 L -4 0 Z" fill="#29261b"/>
        <text y="-22" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-sans-serif">N</text>
      </g>
    </svg>
  );
}

window.ParkMap = ParkMap;

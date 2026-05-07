// sections.jsx — content sections below the hero

const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM } = React;

// ── Overview / intro ─────────────────────────────────────────────────────
function Overview({ lang }) {
  return (
    <section id="overview" className="sect sect-overview">
      <div className="overview-grid">
        <div className="ov-text">
          <div className="eyebrow">
            <span className="dash"/>
            {lang === 'ja' ? '園について' : 'About the Park'}
          </div>
          <h2 className="sect-title">
            {lang === 'ja'
              ? <>江東区と江戸川区を<br/>またぐ、東京の広場。</>
              : <>A wide place across<br/>Koto and Edogawa.</>}
          </h2>
          <div className="ov-body">
            <p>
              {lang === 'ja'
                ? '大島小松川公園は、震災時の避難場所として整備された防災公園。日常は1,000本の桜と広い芝生、川沿いの散歩道で多くの人を迎えます。'
                : 'Ojima-Komatsugawa was built as a disaster-prevention park — a safe place to gather. On ordinary days, it welcomes visitors with a thousand cherry trees, wide lawns, and riverside paths.'}
            </p>
            <p>
              {lang === 'ja'
                ? '旧中川を挟んで西と東に分かれ、桜大橋・紅葉大橋でつながっています。スポーツ、バーベキュー、ピクニック、ジョギング ── どんな一日にも、ちょうどいい場所があります。'
                : 'Divided east and west by the Old Nakagawa, joined by the Sakura and Momiji bridges. Sports, barbecue, picnic, jogging — there is a place here for any kind of day.'}
            </p>
          </div>

          <div className="ov-meta">
            <div><span>{lang === 'ja' ? '開園' : 'Opened'}</span><b>1997</b></div>
            <div><span>{lang === 'ja' ? '面積' : 'Area'}</span><b>24.6 ha</b></div>
            <div><span>{lang === 'ja' ? '所在地' : 'Located'}</span><b>{lang === 'ja' ? '江東区・江戸川区' : 'Koto · Edogawa'}</b></div>
            <div><span>{lang === 'ja' ? '最寄り駅' : 'Station'}</span><b>{lang === 'ja' ? '東大島駅 徒歩3分' : 'Higashi-Ojima · 3 min'}</b></div>
          </div>
        </div>

        <figure className="ov-photo">
          <image-slot id="ov-hero-photo" shape="rect" radius="2px"
                      placeholder={lang === 'ja' ? '園内の写真をドラッグ' : 'Drop a park photo'}/>
          <figcaption>
            {lang === 'ja' ? '自由の広場 ── 朝の光' : 'Freedom Plaza, morning light'}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ── Activities ───────────────────────────────────────────────────────────
function Activities({ lang, season }) {
  const items = ACTIVITIES.map((a, i) => ({ ...a, idx: String(i+1).padStart(2, '0') }));

  return (
    <section id="activities" className="sect sect-activities">
      <header className="sect-head">
        <div className="eyebrow"><span className="dash"/>{lang === 'ja' ? '楽しみ方' : 'Activities'}</div>
        <h2 className="sect-title">
          {lang === 'ja' ? '一日の過ごし方は、いろいろ。' : 'Many ways to spend a day.'}
        </h2>
      </header>

      <div className="act-grid">
        {items.map(a => (
          <article key={a.id} className={'act-card' + (a.season === season ? ' is-seasonal' : '')}>
            <div className="act-num">{a.idx}</div>
            <h3 className="act-title">{lang === 'ja' ? a.ja : a.en}</h3>
            <p className="act-desc">{lang === 'ja' ? a.desc_ja : a.desc_en}</p>
            <div className="act-foot">
              <ActIcon kind={a.id}/>
              {a.season !== 'all' && (
                <span className={'act-tag tag-' + a.season}>
                  {{spring: lang==='ja'?'春のおすすめ':'Best in spring',
                    summer: lang==='ja'?'夏のおすすめ':'Best in summer',
                    autumn: lang==='ja'?'秋のおすすめ':'Best in autumn',
                    winter: lang==='ja'?'冬のおすすめ':'Best in winter'}[a.season]}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActIcon({ kind }) {
  const props = { width: 28, height: 28, viewBox: '0 0 28 28', fill: 'none',
                  stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (kind) {
    case 'sakura':
      return <svg {...props}><path d="M14 6 Q11 9 14 12 Q17 9 14 6"/><path d="M14 22 Q11 19 14 16 Q17 19 14 22"/><path d="M6 14 Q9 11 12 14 Q9 17 6 14"/><path d="M22 14 Q19 11 16 14 Q19 17 22 14"/><circle cx="14" cy="14" r="1.5"/></svg>;
    case 'jog':
      return <svg {...props}><circle cx="17" cy="6" r="2"/><path d="M16 11 L12 16 L8 14 M16 11 L20 14 L18 21 M16 11 L17 16 L13 22"/></svg>;
    case 'bbq':
      return <svg {...props}><path d="M5 10 L23 10 L20 18 L8 18 Z"/><path d="M10 18 L9 23 M18 18 L19 23"/><path d="M11 6 q1 -2 0 -4 M14 6 q1 -2 0 -4 M17 6 q1 -2 0 -4"/></svg>;
    case 'play':
      return <svg {...props}><path d="M5 22 L9 8 L15 22 M5 14 L15 14"/><path d="M19 22 L19 10 M14 14 L24 14"/><circle cx="19" cy="6" r="2"/></svg>;
    case 'sport':
      return <svg {...props}><circle cx="14" cy="14" r="9"/><path d="M5 14 L23 14 M14 5 L14 23"/></svg>;
    case 'view':
      return <svg {...props}><path d="M3 22 L10 12 L14 16 L20 8 L25 22 Z"/><circle cx="20" cy="6" r="2"/></svg>;
    default:
      return null;
  }
}

// ── Map section ──────────────────────────────────────────────────────────
function MapSection({ lang, season, setSeason }) {
  const [active, setActive] = useS(null);
  const [hover, setHover] = useS(null);
  const showId = hover || active;
  const poi = (window.PARK_POIS || []).find(p => p.id === showId);

  return (
    <section id="map" className="sect sect-map">
      <header className="sect-head">
        <div className="eyebrow"><span className="dash"/>{lang === 'ja' ? '園内マップ' : 'Park Map'}</div>
        <h2 className="sect-title">
          {lang === 'ja' ? '川を挟んで、東と西。' : 'East and west, across the river.'}
        </h2>
        <p className="sect-lede">
          {lang === 'ja'
            ? 'マップ上のポイントをタップして、各エリアを確認できます。'
            : 'Tap any point on the map to see what\'s there.'}
        </p>
      </header>

      <div className="map-wrap">
        <div className="map-canvas">
          <ParkMap season={season} lang={lang}
                   activeId={hover || active}
                   onHover={setHover}
                   onSelect={setActive}/>
        </div>
        <aside className="map-side">
          <div className="map-legend">
            <h4>{lang === 'ja' ? 'エリア凡例' : 'Areas'}</h4>
            <ul>
              {[
                { k: 'lawn', col: '#7fa86b', ja: '芝生・広場', en: 'Lawns & Plazas' },
                { k: 'sport', col: '#5b7a8c', ja: 'スポーツ', en: 'Sports' },
                { k: 'play', col: '#d4a13a', ja: '遊具', en: 'Playgrounds' },
                { k: 'bbq', col: '#c2532a', ja: 'バーベキュー', en: 'BBQ' },
                { k: 'walk', col: '#d68aa3', ja: '桜の小径', en: 'Cherry walk' },
                { k: 'bridge', col: '#8b6b3e', ja: '橋', en: 'Bridges' },
                { k: 'station', col: '#29261b', ja: '駅', en: 'Station' },
              ].map(l => (
                <li key={l.k}><span className="lg-dot" style={{ background: l.col }}/>{lang === 'ja' ? l.ja : l.en}</li>
              ))}
            </ul>
          </div>

          <div className="map-info">
            {poi ? (
              <>
                <div className="mi-eyebrow">{lang === 'ja' ? '選択中' : 'Selected'}</div>
                <h3>{lang === 'ja' ? poi.ja : poi.en}</h3>
                <div className="mi-sub">{lang === 'ja' ? poi.en : poi.ja}</div>
                <p>{poi.note}</p>
              </>
            ) : (
              <>
                <div className="mi-eyebrow">{lang === 'ja' ? 'ヒント' : 'Tip'}</div>
                <h3>{lang === 'ja' ? 'マップを動かしてみる' : 'Try the map'}</h3>
                <p>
                  {lang === 'ja'
                    ? '13ヶ所のスポットがあります。下のタブで季節を切り替えると、マップの色も変わります。'
                    : '13 spots in total. Use the seasonal tabs to recolor the map.'}
                </p>
              </>
            )}
          </div>

          <div className="map-season-mini">
            {SEASONS.map(s => (
              <button key={s.id}
                      className={'msm-btn ' + s.id + (season === s.id ? ' active' : '')}
                      onClick={() => setSeason(s.id)}>
                {lang === 'ja' ? s.ja : s.en}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

// ── Facilities ───────────────────────────────────────────────────────────
function Facilities({ lang }) {
  return (
    <section id="facilities" className="sect sect-facilities">
      <header className="sect-head">
        <div className="eyebrow"><span className="dash"/>{lang === 'ja' ? '施設案内' : 'Facilities'}</div>
        <h2 className="sect-title">
          {lang === 'ja' ? '園内のいろいろ。' : 'What is in the park.'}
        </h2>
      </header>
      <div className="fac-grid">
        {FACILITIES.map((f, i) => (
          <div key={f.id} className="fac-card">
            <div className="fac-num">{String(i+1).padStart(2, '0')}</div>
            <div className="fac-body">
              <div className="fac-ja">{f.ja}</div>
              <div className="fac-en">{f.en}</div>
              <div className="fac-meta">{lang === 'ja' ? f.meta_ja : f.meta_en}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Events ───────────────────────────────────────────────────────────────
function Events({ lang }) {
  return (
    <section id="events" className="sect sect-events">
      <header className="sect-head">
        <div className="eyebrow"><span className="dash"/>{lang === 'ja' ? 'イベント' : 'Events'}</div>
        <h2 className="sect-title">
          {lang === 'ja' ? '今年の催し。' : 'This year in the park.'}
        </h2>
      </header>
      <ol className="ev-list">
        {EVENTS.map((e, i) => (
          <li key={i} className="ev-row">
            <div className="ev-date">
              <b>{e.date.split('.')[1]}</b>
              <span>{lang === 'ja' ? e.month + '月' : e.month}</span>
            </div>
            <div className="ev-body">
              <div className="ev-ja">{lang === 'ja' ? e.ja : e.en}</div>
              <div className="ev-en">{lang === 'ja' ? e.en : e.ja}</div>
            </div>
            <div className="ev-tag">{lang === 'ja' ? e.tag : e.tagEn}</div>
            <div className="ev-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M3 8h10 M9 4l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ── History ──────────────────────────────────────────────────────────────
const HISTORY = [
  { y: '1923', ja: '関東大震災', en: 'Great Kantō Earthquake',
    note_ja: '震災の記憶が、この公園構想の出発点となります。', note_en: 'The disaster eventually shaped the park\'s purpose.' },
  { y: '1969', ja: '江東防災再開発の構想', en: 'Koto disaster-prevention plan',
    note_ja: '江東デルタ地帯の避難拠点として広場の整備が計画される。', note_en: 'A network of evacuation plazas is planned across the Koto delta.' },
  { y: '1990s', ja: '段階的開園', en: 'Phased opening',
    note_ja: '旧中川の改修と並行して、東西の広場が順次開かれる。', note_en: 'East and west plazas open in stages alongside river works.' },
  { y: '1997', ja: '全面開園', en: 'Full opening',
    note_ja: '24.6haの公園として全面開園。桜の植樹も進む。', note_en: 'The full 24.6 ha park opens; cherry plantings continue.' },
  { y: 'Today', ja: '日常の広場として', en: 'A place for everyday',
    note_ja: 'いざという時の備えと、毎日の憩い ── 二つの役目を担います。', note_en: 'A refuge in emergencies; a daily gathering place the rest of the time.' },
];

function History({ lang }) {
  return (
    <section id="history" className="sect sect-history">
      <header className="sect-head">
        <div className="eyebrow"><span className="dash"/>{lang === 'ja' ? '公園の歩み' : 'A Brief History'}</div>
        <h2 className="sect-title">
          {lang === 'ja' ? '備えと、憩いと。' : 'A refuge, and a rest.'}
        </h2>
      </header>
      <ol className="hist-list">
        {HISTORY.map((h, i) => (
          <li key={i} className="hist-item">
            <div className="hist-year">{h.y}</div>
            <div className="hist-body">
              <h4>{lang === 'ja' ? h.ja : h.en}</h4>
              <p>{lang === 'ja' ? h.note_ja : h.note_en}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ── Rules ────────────────────────────────────────────────────────────────
function Rules({ lang }) {
  return (
    <section id="rules" className="sect sect-rules">
      <header className="sect-head">
        <div className="eyebrow"><span className="dash"/>{lang === 'ja' ? 'ご利用案内' : 'Park Rules'}</div>
        <h2 className="sect-title">
          {lang === 'ja' ? 'みんなで気持ちよく。' : 'Share the park kindly.'}
        </h2>
      </header>
      <ul className="rules-list">
        {RULES.map((r, i) => (
          <li key={i} className="rule-item">
            <span className="rule-num">{String(i+1).padStart(2, '0')}</span>
            <div className="rule-body">
              <div className="rule-ja">{r.ja}</div>
              <div className="rule-en">{r.en}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Access / Contact ─────────────────────────────────────────────────────
function Access({ lang }) {
  return (
    <section id="access" className="sect sect-access">
      <div className="access-grid">
        <div className="access-text">
          <div className="eyebrow"><span className="dash"/>{lang === 'ja' ? 'アクセス' : 'Access'}</div>
          <h2 className="sect-title">
            {lang === 'ja' ? 'いつでも、開いています。' : 'Always open. Always free.'}
          </h2>

          <dl className="access-list">
            <div>
              <dt>{lang === 'ja' ? '所在地' : 'Address'}</dt>
              <dd>
                {lang === 'ja'
                  ? <>〒136-0072<br/>東京都江東区大島9丁目9番<br/>東京都江戸川区小松川1丁目7番</>
                  : <>9-9 Ojima, Koto-ku, Tokyo 136-0072<br/>1-7 Komatsugawa, Edogawa-ku</>}
              </dd>
            </div>
            <div>
              <dt>{lang === 'ja' ? '電車' : 'Train'}</dt>
              <dd>
                {lang === 'ja'
                  ? <>都営新宿線「東大島駅」より徒歩3分</>
                  : <>3 min walk from Higashi-Ojima Sta. (Toei Shinjuku Line)</>}
              </dd>
            </div>
            <div>
              <dt>{lang === 'ja' ? 'バス' : 'Bus'}</dt>
              <dd>
                {lang === 'ja' ? '都営バス「東大島駅前」下車' : 'Toei Bus stop "Higashi-Ojima-Eki-Mae"'}
              </dd>
            </div>
            <div>
              <dt>{lang === 'ja' ? '駐車場' : 'Parking'}</dt>
              <dd>
                {lang === 'ja'
                  ? <>有料・約100台<br/>普通車 1時間 300円<br/>(以後30分毎 100円)<br/>8:00 — 21:30</>
                  : <>Paid · ~100 spaces<br/>¥300 / first hour<br/>¥100 / each 30 min after<br/>8:00 AM — 9:30 PM</>}
              </dd>
            </div>
            <div>
              <dt>{lang === 'ja' ? '開園時間' : 'Hours'}</dt>
              <dd>{lang === 'ja' ? '常時開園(施設は時間あり)' : 'Always open (facilities have hours)'}</dd>
            </div>
            <div>
              <dt>{lang === 'ja' ? '休園日' : 'Closed'}</dt>
              <dd>{lang === 'ja' ? 'なし' : 'None'}</dd>
            </div>
            <div>
              <dt>{lang === 'ja' ? '入園料' : 'Admission'}</dt>
              <dd>{lang === 'ja' ? '無料' : 'Free'}</dd>
            </div>
            <div>
              <dt>{lang === 'ja' ? 'お問い合わせ' : 'Contact'}</dt>
              <dd>03-3636-9365<br/>{lang === 'ja' ? '管理事務所' : 'Park office'}</dd>
            </div>
          </dl>
        </div>

        <div className="access-map" aria-hidden>
          <svg viewBox="0 0 480 480" style={{ width: '100%', height: '100%' }}>
            <rect width="480" height="480" fill="#efe9da"/>
            {/* river */}
            <path d="M 0 320 Q 120 290 240 310 T 480 320 L 480 360 Q 240 340 0 360 Z" fill="#bcd6dc"/>
            <path d="M 0 340 q 60 -8 120 0 t 120 0 t 120 0 t 120 0" stroke="#fff" fill="none" strokeWidth="1" opacity="0.7"/>
            {/* park area */}
            <path d="M 60 80 L 380 60 L 420 240 L 360 360 L 100 380 L 50 200 Z" fill="#a8c47a" opacity="0.6"/>
            {/* path */}
            <path d="M 100 120 Q 220 100 320 140 Q 380 220 320 320 Q 200 360 120 300 Q 80 200 100 120 Z" fill="none" stroke="#d8c69e" strokeWidth="6"/>
            {/* trees */}
            {Array.from({ length: 24 }).map((_, i) => {
              const x = 80 + (i*17 % 320) + (i%3)*4;
              const y = 90 + ((i*23) % 280);
              return <circle key={i} cx={x} cy={y} r="6" fill="#7fa86b"/>;
            })}
            {/* station */}
            <g transform="translate(80 410)">
              <rect x="-30" y="-12" width="80" height="22" rx="3" fill="#29261b"/>
              <text x="10" y="3" textAnchor="middle" fill="#f6f3ec" fontSize="11" fontFamily="ui-sans-serif">
                東大島駅
              </text>
            </g>
            {/* park label */}
            <g transform="translate(220 200)">
              <text textAnchor="middle" fontSize="22" fontWeight="700" fill="#29261b" fontFamily="ui-sans-serif">
                公園
              </text>
            </g>
            {/* compass */}
            <g transform="translate(440 60)">
              <circle r="16" fill="#fff" stroke="#29261b"/>
              <path d="M 0 -12 L 4 0 L 0 12 L -4 0 Z" fill="#29261b"/>
              <text y="-20" textAnchor="middle" fontSize="9" fontWeight="700">N</text>
            </g>
          </svg>
          <div className="access-map-caption">
            {lang === 'ja' ? '東大島駅から徒歩3分' : '3 min walk from Higashi-Ojima Sta.'}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────
function Footer({ lang }) {
  return (
    <footer className="site-ft">
      <div className="ft-top">
        <div className="ft-brand">
          <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden>
            <circle cx="20" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M 20 8 Q 14 16 20 22 Q 26 16 20 8 Z" fill="currentColor"/>
            <circle cx="20" cy="22" r="2.5" fill="currentColor"/>
          </svg>
          <div>
            <b>{lang === 'ja' ? '東京都立 大島小松川公園' : 'Tokyo Metropolitan Ojima-Komatsugawa Park'}</b>
            <em>{lang === 'ja' ? 'Tokyo Metropolitan Park · No. 81' : '東京都立公園 No.81'}</em>
          </div>
        </div>
        <div className="ft-cols">
          <div className="ft-col">
            <h5>{lang === 'ja' ? '園内' : 'In the park'}</h5>
            <a href="#activities">{lang === 'ja' ? '楽しみ方' : 'Activities'}</a>
            <a href="#map">{lang === 'ja' ? '園内マップ' : 'Park map'}</a>
            <a href="#facilities">{lang === 'ja' ? '施設' : 'Facilities'}</a>
            <a href="#events">{lang === 'ja' ? 'イベント' : 'Events'}</a>
          </div>
          <div className="ft-col">
            <h5>{lang === 'ja' ? 'ご利用について' : 'Visiting'}</h5>
            <a href="#access">{lang === 'ja' ? 'アクセス' : 'Access'}</a>
            <a href="#rules">{lang === 'ja' ? 'ご利用案内' : 'Rules'}</a>
            <a href="#history">{lang === 'ja' ? '公園の歩み' : 'History'}</a>
          </div>
          <div className="ft-col">
            <h5>{lang === 'ja' ? 'お問い合わせ' : 'Contact'}</h5>
            <span>03-3636-9365</span>
            <span>{lang === 'ja' ? '9:00 — 17:00' : '9 AM — 5 PM'}</span>
          </div>
        </div>
      </div>
      <div className="ft-bottom">
        <span>© Tokyo Metropolitan Park Association</span>
        <span>{lang === 'ja' ? '指定管理者' : 'Park operator'}</span>
      </div>
    </footer>
  );
}

window.Overview = Overview;
window.Activities = Activities;
window.MapSection = MapSection;
window.Facilities = Facilities;
window.Events = Events;
window.History = History;
window.Rules = Rules;
window.Access = Access;
window.Footer = Footer;

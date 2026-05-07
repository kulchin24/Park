// intro.jsx — full-bleed intro animation

function Intro({ onDone }) {
  const useStateI = React.useState;
  const useEffectI = React.useEffect;
  const useMemoI = React.useMemo;
  const [skip, setSkip] = useStateI(false);
  const [gone, setGone] = useStateI(false);

  useEffectI(() => {
    document.body.classList.add('intro-active');
    const total = skip ? 600 : 5800;
    const t = setTimeout(() => {
      document.body.classList.remove('intro-active');
      setGone(true);
      onDone && onDone();
    }, total);
    return () => clearTimeout(t);
  }, [skip]);

  // sessionStorage check — only show once per session
  useEffectI(() => {
    if (sessionStorage.getItem('intro-seen')) {
      setSkip(true);
    } else {
      sessionStorage.setItem('intro-seen', '1');
    }
  }, []);

  const petals = useMemoI(() => Array.from({ length: 36 }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 3.5,
    dur: 4 + Math.random() * 3,
    scale: 0.4 + Math.random() * 1.2,
    dx: (-15 + Math.random() * 30) + 'vw',
  })), []);

  if (gone) return null;

  const titleChars = ['大', '島', '小', '松', '川', '公', '園'];

  return (
    <div className={'intro-overlay' + (skip ? ' skip' : '')} onClick={() => setSkip(true)}>
      {/* atmospheric background */}
      <div className="intro-bg" aria-hidden>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
              <stop offset="0" stopColor="#3f5a35" stopOpacity="0.4"/>
              <stop offset="1" stopColor="#1a2818" stopOpacity="0.95"/>
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#vignette)"/>
          {/* distant ridge */}
          <path d="M 0 660 Q 240 600 480 640 T 920 620 T 1360 600 T 1600 620 L 1600 900 L 0 900 Z"
                fill="#2a4226" opacity="0.6"/>
          <path d="M 0 740 Q 300 680 700 720 T 1600 700 L 1600 900 L 0 900 Z"
                fill="#1f3220" opacity="0.85"/>

          {/* a single tall cherry tree silhouette */}
          <g transform="translate(800 760)" opacity="0.95">
            <path d="M 0 0 L 0 -200" stroke="#1a1410" strokeWidth="6" fill="none"/>
            <path d="M 0 -100 L -60 -150 M 0 -130 L 50 -160 M 0 -160 L -40 -210 M 0 -180 L 40 -220"
                  stroke="#1a1410" strokeWidth="3" fill="none"/>
            <circle cx="0" cy="-220" r="60" fill="#f2b6c6" opacity="0.85"/>
            <circle cx="-50" cy="-180" r="36" fill="#f2b6c6" opacity="0.78"/>
            <circle cx="50" cy="-190" r="32" fill="#f2b6c6" opacity="0.78"/>
            <circle cx="-25" cy="-240" r="28" fill="#fbd9e2" opacity="0.7"/>
          </g>

          {/* stars / fireflies */}
          {Array.from({ length: 30 }).map((_, i) => (
            <circle key={i}
                    cx={50 + (i*53) % 1500} cy={50 + (i*89) % 400}
                    r={0.6 + (i%4)*0.4}
                    fill="#fbf7ec" opacity={0.3 + (i%5)*0.1}/>
          ))}
        </svg>
      </div>

      {/* falling petals */}
      <div className="intro-petals" aria-hidden>
        {petals.map((p, i) => (
          <span key={i} className="petal"
                style={{ left: p.x + '%',
                         animationDelay: p.delay + 's',
                         animationDuration: p.dur + 's',
                         transform: `scale(${p.scale})`,
                         '--dx': p.dx }}/>
        ))}
      </div>

      {/* center content */}
      <div className="intro-content">
        <svg className="intro-mark" viewBox="0 0 96 96" aria-hidden>
          <circle cx="48" cy="52" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <g className="blossom">
            <path d="M 48 22 Q 38 36 48 52 Q 58 36 48 22 Z" fill="#f2b6c6"/>
            <path d="M 22 52 Q 36 42 48 52 Q 36 62 22 52 Z" fill="#f2b6c6" opacity="0.85"/>
            <path d="M 74 52 Q 60 42 48 52 Q 60 62 74 52 Z" fill="#f2b6c6" opacity="0.85"/>
            <path d="M 48 82 Q 38 68 48 52 Q 58 68 48 82 Z" fill="#f2b6c6" opacity="0.7"/>
          </g>
          <circle cx="48" cy="52" r="3" fill="#c2532a"/>
        </svg>

        <div className="intro-eyebrow">Tokyo Metropolitan Park · No. 81</div>

        <h1 className="intro-title-ja">
          {titleChars.map((c, i) => (
            <span key={i} style={{ animationDelay: (1.2 + i*0.12) + 's' }}>{c}</span>
          ))}
        </h1>

        <div className="intro-line"/>
        <p className="intro-title-en">Ojima — Komatsugawa Park</p>
      </div>

      <button className="intro-skip" onClick={(e) => { e.stopPropagation(); setSkip(true); }}>
        Skip ›
      </button>
    </div>
  );
}

window.Intro = Intro;

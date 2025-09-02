import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="CryptoConsult Pro Home">
      <svg
        width="160"
        height="40"
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold"
      >
        <style>
          {`
            .text-gold {
              color: #D4AF37;
            }
            .chart-green-light {
                color: #A09051;
            }
            .chart-green-dark {
                color: #7a6d34;
            }
          `}
        </style>
        {/* Candlestick charts */}
        <g id="Candlesticks">
          {/* Candle 1 */}
          <rect x="5" y="20" width="8" height="15" fill="currentColor" className="chart-green-dark" rx="1" />
          <line x1="9" y1="15" x2="9" y2="20" stroke="currentColor" className="chart-green-dark" strokeWidth="1.5" />
          <line x1="9" y1="35" x2="9" y2="40" stroke="currentColor" className="chart-green-dark" strokeWidth="1.5" />
          
          {/* Candle 2 */}
          <rect x="18" y="15" width="8" height="18" fill="currentColor" className="chart-green-light" rx="1"/>
          <line x1="22" y1="10" x2="22" y2="15" stroke="currentColor" className="chart-green-light" strokeWidth="1.5" />
          <line x1="22" y1="33" x2="22" y2="38" stroke="currentColor" className="chart-green-light" strokeWidth="1.5" />

          {/* Candle 3 */}
          <rect x="31" y="10" width="8" height="20" fill="currentColor" className="chart-green-dark" rx="1"/>
          <line x1="35" y1="5" x2="35" y2="10" stroke="currentColor" className="chart-green-dark" strokeWidth="1.5" />
          <line x1="35" y1="30" x2="35" y2="35" stroke="currentColor" className="chart-green-dark" strokeWidth="1.5" />

          {/* Candle 4 */}
          <rect x="44" y="5" width="8" height="18" fill="currentColor" className="chart-green-light" rx="1"/>
          <line x1="48" y1="0" x2="48" y2="5" stroke="currentColor" className="chart-green-light" strokeWidth="1.5" />
          <line x1="48" y1="23" x2="48" y2="28" stroke="currentColor" className="chart-green-light" strokeWidth="1.5" />
        </g>
        
        {/* Bitcoin Logo */}
        <g id="Bitcoin-Logo" transform="translate(15, -2)">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="15" fill="url(#goldGradient)" stroke="#FFD700" strokeWidth="1.5"/>
                <defs>
                    <radialGradient id="goldGradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
                    <stop offset="0%" stopColor="#FFF7E0" />
                    <stop offset="100%" stopColor="#D4AF37" />
                    </radialGradient>
                </defs>
                <path d="M14.03 8.5H18.86C20.14 8.5 21.13 9.02 21.6 10C22.08 10.98 21.98 12.11 21.35 13.01C20.72 13.91 19.68 14.5 18.5 14.5H14.03V8.5ZM14.03 16.5H19.5C20.84 16.5 21.92 17.06 22.5 18.09C23.08 19.12 22.92 20.37 22.2 21.31C21.48 22.25 20.4 22.83 19.13 22.83H14.03V16.5Z" fill="white"/>
                <path d="M12.5 7V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"/>
                <path d="M15.5 7V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"/>
            </svg>
        </g>
        
        {/* Company Name */}
        <text 
            x="78" 
            y="25" 
            fontFamily="Playfair Display, serif" 
            fontSize="18" 
            fontWeight="bold" 
            fill="hsl(var(--foreground))"
        >
            CryptoConsult
        </text>
      </svg>
    </Link>
  )
}

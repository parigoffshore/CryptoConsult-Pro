import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="CryptoConsult Pro Home">
      <Image 
        src="/logo.png" 
        alt="CryptoConsult Pro Logo" 
        width={150} 
        height={35}
        className="dark:invert"
      />
    </Link>
  )
}

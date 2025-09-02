import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="CryptoConsult Pro Home">
      <Image 
        src="https://picsum.photos/150/35" 
        alt="CryptoConsult Pro Logo" 
        width={150} 
        height={35}
        data-ai-hint="logo"
        className="dark:invert"
      />
    </Link>
  )
}

import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="CryptoConsult Pro Home">
      <Image 
        src="/Logo_CryptoConsult_V1.png" 
        alt="CryptoConsult Pro" 
        width={180} 
        height={180} 
        priority 
      />
    </Link>
  );
}

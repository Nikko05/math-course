import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';

const goToOffers = {
  background: 'bg-blue-400', 
  color: 'text-slate-950', 
  name: 'Zobacz najlepsze oferty', 
  type: 'text',
  paddingY: 'py-2',
  paddingX: 'px-0',
  width: 'w-1/2'
};

export default function Home() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      {/* left section */}
      <div className="w-1/2 h-full py-20">
        <h1 className="text-5xl font-bold leading-tight">
          Zrozum Matematykę <br /> <span className="text-blue-500">na Nowo</span>
        </h1>
        <div className="py-6 pr-20 text-lg text-neutral-600 dark:text-neutral-400">
          Zapomnij o stresie przed sprawdzianami. Oferujemy interaktywne kursy, krok po kroku wyjaśniane zagadnienia oraz dostęp do doświadczonych korepetytorów. Niezależnie czy przygotowujesz się do matury, czy nadrabiasz zaległości – z nami matematyka staje się prosta i logiczna!
        </div>
        <Link href="/courses">
          <Button btnData={goToOffers}></Button>
        </Link>
      </div>
      {/* right section */}
      <div className="w-1/2 p-5 h-full flex justify-center">
                <Image
                src="/homeAnimation.svg"
                alt="home animation image"
                width={500}
                height={500}
              />
      </div>
    </div>
  );
}

import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';

const goToOffers = {
  background: 'bg-blue-400', 
  color: 'text-slate-950', 
  name: 'Zobacz najlepsze oferty', 
  type: 'text',
  paddingY: 'py-3',
  paddingX: 'px-0',
  width: 'w-full sm:w-3/4 lg:w-2/3',
  textClass: 'font-semibold text-lg'
};

export default function Home() {
  return (
    <div className="py-5 w-full flex flex-col lg:flex-row justify-center items-center px-6 lg:px-16 gap-10 ">
      {/* left section */}
      <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Zrozum Matematykę <br /> <span className="text-blue-500">na Nowo</span>
        </h1>
        <div className="py-6 lg:pr-24 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
          Zapomnij o stresie przed sprawdzianami. Oferujemy interaktywne kursy, krok po kroku wyjaśniane zagadnienia oraz dostęp do doświadczonych korepetytorów. Niezależnie czy przygotowujesz się do matury, czy nadrabiasz zaległości – z nami matematyka staje się prosta i logiczna!
        </div>
        <Link href="/courses" className="w-full flex justify-center lg:justify-start">
          <Button btnData={goToOffers}></Button>
        </Link>
      </div>
      {/* right section */}
      <div className="w-full lg:w-2/5 p-5 flex justify-center">
                <Image
                src="/homeAnimation.svg"
                alt="home animation image"
                width={400}
                height={400}
                className="w-full max-w-[250px] sm:max-w-xs lg:max-w-sm xl:max-w-md"
              />
      </div>
    </div>
  );
}

import Button from '@/components/Button';
import Image from 'next/image';

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
        <h1 className="text-5xl">Hello World</h1>
        <div className="py-5 pr-20">
          Aute fugiat ut esse commodo veniam ut qui esse officia laborum quis ipsum nostrud ex eiusmod tempor tempor deserunt duis excepteur et tempor amet reprehenderit mollit minim nisi quis reprehenderit irure consequat pariatur laborum ea ipsum commodo amet labore consequat consectetur sint sunt eu amet veniam et labore amet fugiat veniam dolore do ipsum ea aliquip id magna nisi et qui nulla consequat non.
        </div>
        <Button btnData={goToOffers}></Button>
      </div>
      {/* right section */}
      <div className="w-1/2 p-5 h-full flex justify-center">
        <Image src="./homeAnimation.svg" alt="home animation image" />
      </div>
    </div>
  );
}

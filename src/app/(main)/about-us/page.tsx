import React from 'react';
import ProfileTutor from '@/components/ProfileTutor';

const tutors = [
  {
    id: 1,
    name: 'Kamil Nowak',
    img: './avatar.png',
    description: 'Specjalista od algebry liniowej i analizy matematycznej. Pomaga w przygotowaniach do egzaminów. Jego supermoc to tłumaczenie skomplikowanych całek na prostych, życiowych przykładach.'
  },
  {
    id: 2,
    name: 'Anna Kowalska',
    img: './avatar.png',
    description: 'Nauczycielka z 10-letnim stażem. Mistrzyni w przygotowaniach do matury rozszerzonej z matematyki. Dzięki niej stereometria i prawdopodobieństwo stają się w pełni logiczne i przewidywalne.'
  },
  {
    id: 3,
    name: 'Piotr Wiśniewski',
    img: './avatar.png',
    description: 'Pasjonat matematyki dyskretnej i algorytmiki. Świetnie radzi sobie z uczniami przygotowującymi się do olimpiad. Cierpliwy, dokładny i zawsze potrafi zarazić miłością do trudnych zagadek.'
  }
];

export default function AboutUs() {
  return (
    <div className='flex flex-col justify-center items-center py-10 w-full'>
      <h1 className='text-5xl font-bold mb-12'>Poznaj nasz zespół</h1>
      <div className='flex flex-wrap justify-center items-stretch gap-8 max-w-7xl px-4 w-full'>
        {tutors.map(tutor => (
          <ProfileTutor key={tutor.id} profile={tutor}/>
        ))}
      </div>
    </div>
  );
};
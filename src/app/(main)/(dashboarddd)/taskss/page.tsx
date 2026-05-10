import React from 'react';
// import Input from '@/components/Input';
import Select from '@/components/Select';

// const level = {
//   name: 'level',
//   label: 'Wybierz klasę',
//   placeholder: '',
//   fontSize: 'text-base',
//   paddingY: 'py-1.5',
//   paddingX: 'px-2',
//   type: 'checkbox'
// }

// filters shoul be pass from api
const selectLevel = {
  label: 'Wybierz klasę',
  name: 'level',
  id: 'level-select',
  optionsAmount: 6,
  options: [
    {
      value: '',
      level: '--wybierz klasę--',
    },
    {
      value: 'level4',
      level: 'Klasa 4',
    },
    {
      value: 'level5',
      level: 'Klasa 5',
    },
    {
      value: 'level6',
      level: 'Klasa 6',
    },
    {
      value: 'level7',
      level: 'Klasa 7',
    },
    {
      value: 'level8',
      level: 'Klasa 8',
    }
  ],
}

const selectSubject = {
  label: 'Wybierz temat',
  name: 'subject',
  id: 'subject-select',
  optionsAmount: 6,
  options: [
    {
      value: '',
      level: '--wybierz temat--',
    },
    {
      value: 'level4',
      level: '1. Ułamki proste',
    },
    {
      value: 'level5',
      level: '2. Ułamki dziesiętne',
    },
    {
      value: 'level6',
      level: '3. Pierwiastki',
    },
    {
      value: 'level7',
      level: '4. Potęgi',
    },
  ],
}

const selectDifficulty = {
  label: 'Wybierz poziom trudności',
  name: 'difficulty',
  id: 'difficulty-select',
  optionsAmount: 6,
  options: [
    {
      value: '',
      level: '--wybierz poziom trudności--',
    },
    {
      value: '1',
      level: 'Nic nie umiem',
    },
    {
      value: '2',
      level: 'Coś mi świta',
    },
    {
      value: '3',
      level: 'Chcę być lepszy',
    },
    {
      value: '4',
      level: 'Chcę wiedzieć jak najwięcej',
    },
    {
      value: '5',
      level: 'Chcę wiedzieć więcej niz muszę',
    },
  ],
}


export default function Tasks() {
  return (
    <div className='flex flex-col w-full h-full'>
      {/* part with filters */}
      <div className='flex flex-row flex-wrap justify-around items-start h-1/4 w-full'>
        <Select selectData={selectLevel}></Select>
        <Select selectData={selectSubject}></Select>
        <Select selectData={selectDifficulty}></Select>
      </div>
      {/* part with tasks */}
      <div className=''>
        <div></div>
      </div>
      {/* <Input inputData={level}/> */}
    </div>
  );
};

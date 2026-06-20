"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from '@/components/Select';
import { addToCart, Course } from '@/lib/cart';

const selectLevel = {
  label: 'Wybierz klasę',
  name: 'level',
  id: 'level-select',
  optionsAmount: 6,
  options: [
    { value: '', level: '--wybierz klasę--' },
    { value: 'podstawówka', level: 'Podstawówka' },
    { value: 'liceum', level: 'Liceum' },
    { value: 'technikum', level: 'Technikum' },
  ],
};

const selectSubject = {
  label: 'Wybierz temat',
  name: 'subject',
  id: 'subject-select',
  optionsAmount: 7,
  options: [
    { value: '', level: '--wybierz temat--' },
    { value: 'Matura Podstawowa', level: 'Matura Podstawowa' },
    { value: 'Matura Rozszerzona', level: 'Matura Rozszerzona' },
    { value: 'Ósmoklasista', level: 'Ósmoklasista' },
    { value: 'Podstawówka', level: 'Podstawówka' },
    { value: 'Technikum', level: 'Technikum' },
    { value: 'Liceum', level: 'Liceum' },
  ],
};

const selectDifficulty = {
  label: 'Wybierz poziom trudności',
  name: 'difficulty',
  id: 'difficulty-select',
  optionsAmount: 6,
  options: [
    { value: '', level: '--wybierz poziom trudności--' },
    { value: '1', level: 'Nic nie umiem' },
    { value: '2', level: 'Coś mi świta' },
    { value: '3', level: 'Chcę być lepszy' },
    { value: '4', level: 'Chcę wiedzieć jak najwięcej' },
    { value: '5', level: 'Chcę wiedzieć więcej niż muszę' },
  ],
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error('Błąd pobierania kursów:', error);
        setMessage('Nie udało się załadować kursów.');
      } finally {
        setLoading(false);
      }
    }

    async function checkAuth() {
      try {
        const response = await fetch('/api/auth');
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Błąd sprawdzania autoryzacji:', error);
      }
    }

    checkAuth();
    fetchCourses();
  }, []);

  const handleAddToCart = (course: Course) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    addToCart(course);
    setMessage(`Dodano kurs „${course.title}” do koszyka.`);
    setTimeout(() => setMessage(''), 2500);
  };

  const filterByDifficulty = (course: Course) => {
    if (!filterDifficulty) return true;

    const price = course.price;
    switch (filterDifficulty) {
      case '1':
        return price < 100;
      case '2':
        return price >= 100 && price < 130;
      case '3':
        return price >= 130 && price < 160;
      case '4':
        return price >= 160 && price < 220;
      case '5':
        return price >= 220;
      default:
        return true;
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchLevel = filterLevel ? course.level === filterLevel : true;
    const matchSubject = filterSubject ? course.category === filterSubject : true;
    return matchLevel && matchSubject && filterByDifficulty(course);
  });

  const hasFilters = filterLevel || filterSubject || filterDifficulty;

  return (
    <div className='flex flex-col w-full h-full gap-8 p-5'>
      <div className='flex flex-wrap justify-between gap-4'>
        <Select selectData={selectLevel} value={filterLevel} onChange={setFilterLevel} />
        <Select selectData={selectSubject} value={filterSubject} onChange={setFilterSubject} />
        <Select selectData={selectDifficulty} value={filterDifficulty} onChange={setFilterDifficulty} />
      </div>

      {hasFilters && (
        <div className='flex flex-wrap items-center gap-3'>
          <div className='text-sm text-slate-600'>Filtry aktywne.</div>
          <button
            type='button'
            onClick={() => {
              setFilterLevel('');
              setFilterSubject('');
              setFilterDifficulty('');
            }}
            className='rounded-full border px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition'
          >
            Wyczyść filtry
          </button>
        </div>
      )}

      {message && (
        <div className='rounded-xl bg-green-100 text-green-900 px-4 py-3'>{message}</div>
      )}

      <div className='text-2xl font-semibold'>Dostępne kursy</div>
      {loading ? (
        <div>Ładowanie kursów...</div>
      ) : filteredCourses.length === 0 ? (
        <div>Brak dostępnych kursów.</div>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredCourses.map((course) => (
            <div key={course._id} className='border rounded-3xl p-6 shadow-sm hover:shadow-md transition'>
              <div className='h-40 w-full rounded-2xl bg-slate-100 flex items-center justify-center mb-4'>
                <img src={course.image} alt={course.title} className='max-h-full' />
              </div>
              <div className='text-sm uppercase text-slate-500 mb-2'>{course.category}</div>
              <div className='text-xl font-bold mb-2'>{course.title}</div>
              <div className='text-sm text-slate-600 mb-3'>{course.description}</div>
              <div className='flex items-center justify-between gap-3 mb-4'>
                <span className='text-sm text-slate-500'>{course.level}</span>
                <span className='text-2xl font-bold text-fuchsia-700'>{course.price} PLN</span>
              </div>
              <button
                type='button'
                onClick={() => handleAddToCart(course)}
                className='w-full rounded-2xl bg-blue-600 text-white py-3 text-sm font-semibold hover:bg-blue-700 transition'
              >
                Dodaj do koszyka
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

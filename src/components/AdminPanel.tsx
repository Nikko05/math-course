"use client";

import { useEffect, useState } from 'react';
import Button from './Button';

type Course = {
  _id: string;
  title: string;
  category: string;
  level: string;
  price: number;
  description: string;
  image: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
};

type Props = {
  adminName: string;
};

const initialCourse = {
  title: '',
  category: '',
  level: '',
  price: 0,
  description: '',
  image: '',
};

export default function AdminPanel({ adminName }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [courseForm, setCourseForm] = useState(initialCourse);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchUsers();
  }, []);

  async function fetchCourses() {
    const response = await fetch('/api/admin/courses');
    const data = await response.json();
    setCourses(data.courses || []);
  }

  async function fetchUsers() {
    const response = await fetch('/api/admin/users');
    const data = await response.json();
    setUsers(data.users || []);
  }

  async function createCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    const response = await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseForm),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data?.message || 'Wystąpił błąd podczas tworzenia kursu.');
      return;
    }

    setCourseForm(initialCourse);
    setMessage('Kurs został utworzony.');
    fetchCourses();
  }

  async function deleteCourse(id: string) {
    if (!window.confirm('Czy na pewno chcesz usunąć ten kurs?')) return;
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const data = await response.json();
      setError(data?.message || 'Usuwanie kursu nie powiodło się.');
      return;
    }

    setMessage('Kurs został usunięty.');
    fetchCourses();
  }

  async function deleteUser(id: string) {
    if (!window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) return;
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const data = await response.json();
      setError(data?.message || 'Usuwanie użytkownika nie powiodło się.');
      return;
    }

    setMessage('Użytkownik został usunięty.');
    fetchUsers();
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold">Panel administratora</h1>
          <p className="mt-2 text-sm text-slate-600">Witaj, {adminName}. Możesz dodawać kursy oraz usuwać użytkowników.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Dodaj nowy kurs</h2>
            <form className="space-y-4" onSubmit={createCourse}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">Tytuł</span>
                  <input
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Kategoria</span>
                  <input
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">Poziom</span>
                  <input
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Cena (PLN)</span>
                  <input
                    type="number"
                    min="0"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium">Opis</span>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  rows={4}
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">URL obrazka</span>
                <input
                  value={courseForm.image}
                  onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  placeholder="/logo_basic.svg"
                  required
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button btnData={{ background: 'bg-blue-600', color: 'text-white', name: loading ? 'Tworzenie...' : 'Utwórz kurs', type: 'text', paddingY: 'py-3', paddingX: 'px-6', textClass: 'font-semibold' }} />
                {message && <p className="text-sm text-green-600">{message}</p>}
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Użytkownicy</h2>
            {users.length === 0 ? (
              <p className="text-sm text-slate-500">Brak zarejestrowanych użytkowników.</p>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user._id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-slate-600">{user.email}</div>
                      {user.isAdmin && <div className="mt-1 text-xs text-blue-600">Administrator</div>}
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteUser(user._id)}
                      className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Kursy</h2>
          {courses.length === 0 ? (
            <p className="text-sm text-slate-500">Brak kursów w bazie.</p>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-lg font-semibold">{course.title}</div>
                      <div className="text-sm text-slate-600">{course.category} • {course.level}</div>
                      <div className="mt-2 text-sm text-slate-700">{course.description}</div>
                    </div>
                    <div className="flex flex-col gap-3 items-start md:items-end">
                      <span className="text-xl font-bold text-slate-900">{course.price} PLN</span>
                      <button
                        type="button"
                        onClick={() => deleteCourse(course._id)}
                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Usuń kurs
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

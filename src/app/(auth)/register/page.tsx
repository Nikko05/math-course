"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email || !password || !confirmPassword) {
      setError("Proszę wypełnić wszystkie pola.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Hasła nie są takie same.");
      return;
    }

    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (response.ok) {
      setSuccess("Rejestracja zakończona sukcesem. Możesz się teraz zalogować.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
      return;
    }

    const data = await response.json();
    setError(data?.message || "Wystąpił błąd podczas rejestracji.");
  }

  return (
    <div className="h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-neutral-950 p-8 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Rejestracja</h2>
          <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">Utwórz konto, aby korzystać z panelu logowania.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Imię</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 bg-transparent rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Imię i nazwisko"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Adres email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Hasło</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Hasło"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Powtórz hasło</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 bg-transparent rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Powtórz hasło"
              />
            </div>
          </div>

          {error ? <div className="text-sm text-red-600 dark:text-red-400">{error}</div> : null}
          {success ? <div className="text-sm text-green-600 dark:text-green-400">{success}</div> : null}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-60"
            >
              {loading ? "Rejestracja..." : "Zarejestruj się"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

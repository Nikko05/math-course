"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
<<<<<<< HEAD
  const [email, setEmail] = useState("");
=======
  const [login, setLogin] = useState("");
>>>>>>> cms
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

<<<<<<< HEAD
    if (!email || !password) {
      setError("Proszę podać email i hasło.");
=======
    if (!login || !password) {
      setError("Proszę podać login i hasło.");
>>>>>>> cms
      return;
    }

    setLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
<<<<<<< HEAD
      body: JSON.stringify({ email, password }),
=======
      body: JSON.stringify({ login, password }),
>>>>>>> cms
    });

    setLoading(false);

    if (response.ok) {
      setSuccess("Zalogowano pomyślnie. Przekierowuję...");
<<<<<<< HEAD
      setEmail("");
=======
      setLogin("");
>>>>>>> cms
      setPassword("");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
      return;
    }

    const data = await response.json();
    setError(data?.message || "Błąd logowania.");
  }

  return (
    <div className="h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-neutral-950 p-8 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Zaloguj się</h2>
<<<<<<< HEAD
          <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">Użyj swojego adresu email i hasła.</p>
=======
          <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">Użyj adresu email lub loginu i hasła. Dla admina: admin / admin.</p>
>>>>>>> cms
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
<<<<<<< HEAD
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 bg-transparent rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Adres email"
=======
              <label htmlFor="login" className="sr-only">Email lub login</label>
              <input
                id="login"
                name="login"
                type="text"
                autoComplete="username"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 bg-transparent rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email lub login"
>>>>>>> cms
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Hasło</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 bg-transparent rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Hasło"
              />
            </div>
          </div>

          {error ? <div className="text-sm text-red-600 dark:text-red-400">{error}</div> : null}
          {success ? <div className="text-sm text-green-600 dark:text-green-400">{success}</div> : null}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-neutral-900 disabled:opacity-60"
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 text-center">
          Nie masz konta? <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
}

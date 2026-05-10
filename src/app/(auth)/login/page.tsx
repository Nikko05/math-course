"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Proszę podać email i hasło.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
      setSuccess("Zalogowano pomyślnie. Przekierowuję...");
      setEmail("");
      setPassword("");
      setTimeout(() => router.push("/"), 1200);
      return;
    }

    const data = await response.json();
    setError(data?.message || "Błąd logowania.");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">Zaloguj się</h2>
          <p className="mt-2 text-center text-sm text-slate-500">Użyj swojego adresu email i hasła.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
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
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Adres email"
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
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Hasło"
              />
            </div>
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          {success ? <div className="text-sm text-green-600">{success}</div> : null}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-slate-500 text-center">
          Nie masz konta? <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
}

import AdminPanel from '@/components/AdminPanel';
import { getAdminUser } from '@/lib/auth';

export default async function AdminPage() {
  const adminUser = await getAdminUser();

  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="rounded-3xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 p-8 text-center shadow-md">
          <h1 className="text-2xl font-semibold text-red-700 dark:text-red-400">Brak dostępu</h1>
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">
            Do panelu administratora mają dostęp wyłącznie użytkownicy z uprawnieniami administratora.
          </p>
        </div>
      </div>
    );
  }

  return <AdminPanel adminName={adminUser.name} />;
}

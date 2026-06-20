import AdminPanel from '@/components/AdminPanel';
import { getAdminUser } from '@/lib/auth';

export default async function AdminPage() {
  const adminUser = await getAdminUser();

  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-md">
          <h1 className="text-2xl font-semibold text-red-700">Brak dostępu</h1>
          <p className="mt-4 text-sm text-red-600">
            Do panelu administratora mają dostęp wyłącznie użytkownicy z uprawnieniami administratora.
          </p>
        </div>
      </div>
    );
  }

  return <AdminPanel adminName={adminUser.name} />;
}

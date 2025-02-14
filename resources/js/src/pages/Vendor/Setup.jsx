import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/Layout";

export default function VendorSetup({ message, auth, notifications, flash }) {
  return (
    <MainLayout auth={auth} notifications={notifications} flash={flash}>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Setup Profil Vendor</h1>
          <p className="text-gray-600 mb-4">{message}</p>

          <Link
            href={route('vendor.profile.setup')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Mulai Setup
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

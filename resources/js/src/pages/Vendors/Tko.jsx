// {vendor ? (
//   <div className="container mx-auto p-4">
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//       {/* Banner Toko */}
//       <div className="relative">
//         <img
//           src={vendor.banner ? `/storage/${vendor.banner}` : '/default-banner.jpg'}
//           alt="Banner Toko"
//           className="w-full h-40 object-cover"
//         />
//         <div className="absolute -bottom-10 left-4">
//           <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
//             <img
//               src={vendor.logo ? `/storage/${vendor.logo}` : '/default-vendor-logo.jpg'}
//               alt={vendor.nama}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       </div>
//       {/* Informasi Biodata Vendor */}
//       <div className="pt-12 p-4">
//         <h2 className="text-2xl font-bold">{vendor.nama}</h2>
//         <p className="text-gray-500 mb-2">
//           {vendor.rating ? `Rating: ${vendor.rating} / 5` : 'Belum ada rating'}
//         </p>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-700">Tentang Toko</h3>
//           <p className="text-gray-600">
//             {vendor.deskripsi || 'Deskripsi tidak tersedia.'}
//           </p>
//         </div>
//         <div className="flex items-center mb-2">
//           <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 0C6.134 0 3 3.134 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
//           </svg>
//           <span className="text-gray-600">
//             {vendor.alamat || 'Alamat tidak tersedia'}
//           </span>
//         </div>
//         <div className="flex items-center">
//           <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9a2 2 0 100-4 2 2 0 000 4z" />
//           </svg>
//           <span className="text-gray-600">
//             Harga Mulai:{" "}
//             {vendor.harga_mulai
//               ? `Rp${Number(vendor.harga_mulai).toLocaleString("id-ID")}`
//               : "Tidak tersedia"}
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// ) : (
//   <div className="container mx-auto p-4">
//     <p>Data vendor tidak ditemukan.</p>
//   </div>
// )}

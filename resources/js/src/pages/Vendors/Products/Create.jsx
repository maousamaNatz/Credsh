import React, { useEffect, useRef } from 'react';
import { useForm, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/models/dom/model.min.js';
// Impor file CSS skin TinyMCE agar tidak terjadi error 404 saat memuat skin
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';

export default function Create({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    nama: '',
    deskripsi: '',
    harga: '',
    gambar: [],
    category_ids: []
  });

  const editorRef = useRef(null);
  const [previews, setPreviews] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);

  useEffect(() => {
    // Perbarui konfigurasi TinyMCE untuk mengatasi error "Failed to load model: dom"
    // dan agar stylesheet skin ter-load melalui bundler
    tinymce.init({
      selector: '#deskripsi',
      tinymceScriptSrc: '/assets/tinymce/tinymce.min.js',
      menubar: false,
      plugins: 'autolink lists link image charmap preview',
      toolbar: 'undo redo | bold italic underline | bullist numlist | link image',
      suffix: '.min',
      // Nonaktifkan opsi skin_url dan content_css agar tidak mencari file secara terpisah
      skin: false,
      content_css: false,
      base_url: '/assets/tinymce',
      content_style:
        "@import url('http://localhost:8000/font/La%20Gagliane.otf'); body { font-family: 'La Gagliane', sans-serif; }",
      init_instance_callback: (editor) => {
        console.log('TinyMCE editor berhasil diinisialisasi');
      },
      setup: (editor) => {
        editor.on('change keyup', () => {
          setData('deskripsi', editor.getContent());
        });
      },
    });

    return () => {
      tinymce.remove();
    };
  }, []);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...data.gambar, ...newFiles].slice(0, 5);
    setData('gambar', combinedFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews].slice(0, 5));
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('products.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setData({
          nama: '',
          deskripsi: '',
          harga: '',
          gambar: [],
          category_ids: []
        });
        setPreviews([]);
      },
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tambah Produk Baru</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="nama" className="block text-gray-700 font-medium">
              Nama:
            </label>
            <input
              id="nama"
              type="text"
              value={data.nama}
              onChange={(e) => setData('nama', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
            {errors.nama && <div className="text-red-600">{errors.nama}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="deskripsi" className="block text-gray-700 font-medium">
              Deskripsi:
            </label>
            <textarea
              id="deskripsi"
              ref={editorRef}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            ></textarea>
            {errors.deskripsi && <div className="text-red-600">{errors.deskripsi}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="harga" className="block text-gray-700 font-medium">
              Harga:
            </label>
            <input
              id="harga"
              type="number"
              value={data.harga}
              onChange={(e) => setData('harga', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              min="0"
              step="1000"
            />
            {errors.harga && <div className="text-red-600">{errors.harga}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Kategori:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((category) => {
                const isSelected = data.category_ids.includes(category.id.toString());
                return (
                  <label
                    key={category.id}
                    className={`flex items-center p-2 border rounded cursor-pointer ${isSelected ? 'bg-green-200 border-green-500' : 'bg-white border-gray-300'}`}
                  >
                    <input
                      type="checkbox"
                      value={category.id}
                      checked={isSelected}
                      onChange={(e) => {
                        let selected = [...data.category_ids];
                        if (e.target.checked) {
                          selected.push(e.target.value);
                        } else {
                          selected = selected.filter((id) => id !== e.target.value);
                        }
                        setData('category_ids', selected);
                      }}
                      className="mr-2"
                    />
                    {category.nama}
                  </label>
                );
              })}
            </div>
            {errors.category_ids && <div className="text-red-600">{errors.category_ids}</div>}
            {errors['category_ids.*'] && <div className="text-red-600">{errors['category_ids.*']}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="gambar" className="block text-gray-700 font-medium">
              Gambar (maks. 5):
            </label>
            <input
              id="gambar"
              type="file"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full"
              accept="image/*"
            />
            {errors.gambar && <div className="text-red-600">{errors.gambar}</div>}
            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-32 border rounded cursor-pointer"
                    onClick={() => handleImageClick(src)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {processing ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
            <Link
              href={route('products.index')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Full Preview" className="max-w-full max-h-full" />
        </div>
      )}
    </Layout>
  );
}

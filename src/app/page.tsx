// kode-wilayah\src\app\page.tsx

import fs from "fs";
import path from "path";

import SearchWilayah from "@/components/SearchWilayah";

// =====================
// METADATA BROWSER
// =====================

export const metadata = {
  title: "API Kode Wilayah Indonesia",
};

// =====================
// GET LATEST YEAR
// =====================

function getLatestYear() {

  const wilayahDir = path.join(
    process.cwd(),
    "public",
    "api",
    "wilayah"
  );

  const years = fs
    .readdirSync(wilayahDir)
    .filter((name) => /^\d{4}$/.test(name))
    .sort()
    .reverse();

  return years[0];
}

// =====================
// LOAD JSON FILE
// =====================

function loadJson(filePath: string) {

  const fileContent = fs.readFileSync(
    filePath,
    "utf-8"
  );

  return JSON.parse(fileContent);
}

// =====================
// PAGE
// =====================

export default async function HomePage() {

  // =====================
  // GET LATEST YEAR
  // =====================

  const latestYear = getLatestYear();

  // =====================
  // BASE PATH
  // =====================

  const basePath = path.join(
    process.cwd(),
    "public",
    "api",
    "wilayah",
    latestYear
  );

  const provinsi = loadJson(
  path.join(basePath, "provinsi.json")
);

 
  // =====================
  // METADATA
  // =====================

  const metadataData = provinsi.metadata;

  return (

    <main className="min-h-screen bg-gray-100 text-black p-8">

      {/* ===================== */}
      {/* WRAPPER */}
      {/* ===================== */}

      <div className="max-w-4xl mx-auto">

        {/* ===================== */}
        {/* HEADER */}
        {/* ===================== */}

        <h1 className="text-4xl font-bold mb-4">
          API Kode Wilayah Indonesia
        </h1>

        <p className="text-lg text-gray-700 mb-2">
          API kode wilayah administrasi Indonesia
          berdasarkan Kepmendagri terbaru <br />
          Sumber data dari <strong>https://github.com/cahyadsn/wilayah</strong>
        </p>

        <div className="text-sm text-gray-500 mb-8">
          Version {metadataData.version}
        </div>

        {/* ===================== */}
        {/* PLAYGROUND */}
        {/* ===================== */}

        <section className="mb-12">

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-3xl p-6 shadow-sm">

            {/* HEADER */}

            <div className="mb-6">

              <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Silakan Dicoba
              </div>

              <h2 className="text-3xl font-bold mb-2">
                Pencarian Kode Wilayah
              </h2>

              <p className="text-gray-700">
                Cari wilayah berdasarkan nama atau kode wilayah.
              </p>

            </div>

            {/* LABELS */}

            <div className="grid md:grid-cols-2 gap-4 mb-3">

              <div className="text-sm font-semibold text-gray-700">
                Cari berdasarkan nama atau kode wilayah
              </div>

            </div>

            {/* SEARCH */}

            <SearchWilayah />

            {/* FOOTNOTE */}

            <div className="text-xs text-gray-500 mt-4">
              Contoh kode:
              11, 11.01, 11.01.01, atau 1101012001
            </div>

          </div>

        </section>

{/* ===================== */}
{/* ENDPOINTS */}
{/* ===================== */}

<section className="mb-10">

  <h2 className="text-2xl font-semibold mb-4">
    Endpoints
  </h2>

  <div className="space-y-6">

    {/* ===================== */}
    {/* LATEST */}
    {/* ===================== */}

    <div className="bg-white p-5 rounded-2xl border">

      <div className="font-semibold text-lg mb-2">
        Data terbaru
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Mengambil data kode wilayah terbaru tanpa
        perlu menentukan tahun.
      </p>

      <code className="block text-sm break-all bg-gray-100 rounded-xl p-3">
        https://api.kemendesa.link/kode-wilayah/api/wilayah/latest/[satuan-wilayah]
      </code>

      <div className="mt-4 text-sm text-gray-700">

        <div className="font-semibold mb-2">
          Jenis wilayah yang tersedia:
        </div>

        <div className="flex flex-wrap gap-2">

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            provinsi
          </span>

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            kabupaten
          </span>

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            kecamatan
          </span>

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            desa
          </span>

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            kelurahan
          </span>

        </div>

      </div>

      <div className="mt-4 text-sm text-gray-600">

        Contoh:

        <div className="mt-2 space-y-2">

          <code className="block break-all bg-gray-100 rounded-xl p-3">
            https://api.kemendesa.link/kode-wilayah/api/wilayah/latest/provinsi
          </code>

          <code className="block break-all bg-gray-100 rounded-xl p-3">
            https://api.kemendesa.link/kode-wilayah/api/wilayah/latest/desa
          </code>

        </div>

      </div>

    </div>

    {/* ===================== */}
    {/* YEAR */}
    {/* ===================== */}

    <div className="bg-white p-5 rounded-2xl border">

      <div className="font-semibold text-lg mb-2">
        Data per tahun
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Mengambil data kode wilayah berdasarkan
        tahun tertentu.
      </p>

      <code className="block text-sm break-all bg-gray-100 rounded-xl p-3">
        https://api.kemendesa.link/kode-wilayah/api/wilayah/[tahun]/[satuan-wilayah].json
      </code>

      <div className="mt-4 text-sm text-gray-600">

        Contoh:

        <div className="mt-2 space-y-2">

          <code className="block break-all bg-gray-100 rounded-xl p-3">
            https://api.kemendesa.link/kode-wilayah/api/wilayah/<strong>{latestYear}</strong>/provinsi.json
          </code>

          <code className="block break-all bg-gray-100 rounded-xl p-3">
            https://api.kemendesa.link/kode-wilayah/api/wilayah/<strong>{latestYear}</strong>/kecamatan.json
          </code>

        </div>

      </div>

    </div>

  </div>

</section>

        {/* ===================== */}
        {/* RESPONSE EXAMPLE */}
        {/* ===================== */}

        <section className="mb-10">

          <h2 className="text-2xl font-semibold mb-4">
            Contoh Response
          </h2>

          <pre className="bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`{
  "metadata": {
    "version": "${metadataData.version}",
    "source": {
      "name": "${metadataData.source.name}",
      "url": "${metadataData.source.url}",
      "total_data": 38
    }
  },

  "data": [
    {
      "code": "11",
      "name": "Aceh"
    }
  ]
}`}
          </pre>

        </section>

        {/* ===================== */}
        {/* FIELD EXPLANATION */}
        {/* ===================== */}

        <section className="mb-10">

          <h2 className="text-2xl font-semibold mb-4">
            Penjelasan Struktur Kode
          </h2>

          <div className="space-y-4">

            <div className="bg-white p-4 rounded-xl border">

              <div className="font-semibold mb-1">
                Provinsi
              </div>

              <div className="text-sm text-gray-700">
                Format:
                <code className="ml-2">
                  11
                </code>
              </div>

            </div>

            <div className="bg-white p-4 rounded-xl border">

              <div className="font-semibold mb-1">
                Kabupaten / Kota
              </div>

              <div className="text-sm text-gray-700">
                Format:
                <code className="ml-2">
                  11.01
                </code>
              </div>

            </div>

            <div className="bg-white p-4 rounded-xl border">

              <div className="font-semibold mb-1">
                Kecamatan
              </div>

              <div className="text-sm text-gray-700">
                Format:
                <code className="ml-2">
                  11.01.01
                </code>
              </div>

            </div>

            <div className="bg-white p-4 rounded-xl border">

              <div className="font-semibold mb-1">
                Desa / Kelurahan
              </div>

              <div className="text-sm text-gray-700">
                Format:
                <code className="ml-2">
                  11.01.01.2001
                </code>
              </div>

            </div>

          </div>

        </section>

        {/* ===================== */}
        {/* METADATA */}
        {/* ===================== */}

        <section className="mb-10">

          <h2 className="text-2xl font-semibold mb-4">
            Metadata
          </h2>

          <div className="bg-white p-4 rounded-xl border space-y-2 text-sm">

            <div>
              <span className="font-semibold">
                Version:
              </span>{" "}
              {metadataData.version}
            </div>

            <div>
              <span className="font-semibold">
                Latest Year:
              </span>{" "}
              {latestYear}
            </div>

          </div>

        </section>

        {/* ===================== */}
        {/* SOURCE */}
        {/* ===================== */}

        <section>

          <h2 className="text-2xl font-semibold mb-4">
            Sumber Data
          </h2>

          <a
            href={metadataData.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {metadataData.source.name}
          </a>

        </section>

      </div>

    </main>
  );
}
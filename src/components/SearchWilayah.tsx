"use client";

import { useEffect, useState } from "react";

type Wilayah = {
  code: string;
  name: string;
  type: string;
  breadcrumb?: string;
  summary?: string;
};

export default function SearchWilayah() {

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState<Wilayah[]>([]);

  // =====================
  // SEARCH
  // =====================

  useEffect(() => {

    // =====================
    // EMPTY QUERY
    // =====================

    if (!query.trim()) {

      setResults([]);

      return;
    }

    // =====================
    // FETCH
    // =====================

    const timeout = setTimeout(
      async () => {

        setLoading(true);

        try {

          const response =
            await fetch(
              `/kode-wilayah/api/search?q=${encodeURIComponent(query)}`
            );

          const json =
            await response.json();

          setResults(json.data || []);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);
        }

      },
      300
    );

    return () =>
      clearTimeout(timeout);

  }, [query]);

  return (

    <section>

      {/* SEARCH */}

<div className="relative">

  <input
    type="text"
    placeholder="Cari berdasarkan nama / kode wilayah..."
    value={query}
    onChange={(e) =>
      setQuery(e.target.value)
    }
    className="w-full bg-white border rounded-2xl p-4 pr-12"
  />

  {query && (

    <button
      type="button"
      onClick={() => {

        setQuery("");

        setResults([]);
      }}
      className="
  absolute
  right-3
  top-1/2
  -translate-y-1/2
  w-7
  h-7
  rounded-full
  bg-red-500
  hover:bg-red-600
  text-white
  flex
  items-center
  justify-center
  text-sm
  font-bold
  transition
"
    >
      ×
    </button>

  )}

</div>

      {/* LOADING */}

      {loading && (

        <div className="mt-4 text-sm text-gray-500">
          Mencari...
        </div>

      )}

{/* RESULTS */}

{results.length > 0 && (

  <>

    <div className="mt-6 mb-3 text-sm font-semibold text-gray-700">
      Hasil pencarian: <br />(dibatasi max 5 entry karena datasetnya besar)
    </div>

    <div className="space-y-4">

      {results.map((item) => (

        <div
          key={item.code}
          className="bg-white border rounded-2xl p-4"
        >

          <div className="font-mono text-sm text-gray-500 mb-1">
            {item.code}
          </div>

          <div className="font-semibold text-lg">
            {item.name}
          </div>

          <div className="text-sm text-gray-600 mt-2">
            Tipe: {item.type}
          </div>

          {item.breadcrumb && (

            <div className="text-sm text-gray-500 mt-1">
              {item.breadcrumb}
            </div>

          )}

          {item.summary && (

            <div className="text-sm text-gray-500 mt-1">
              Meliputi: {item.summary}
            </div>

          )}

        </div>

      ))}

    </div>

  </>

)}

    </section>
  );
}
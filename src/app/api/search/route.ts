import fs from "fs";
import path from "path";

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
// LOAD JSON
// =====================

function loadJson(filePath: string) {

  const fileContent = fs.readFileSync(
    filePath,
    "utf-8"
  );

  return JSON.parse(fileContent);
}

// =====================
// GET TYPE
// =====================

function getType(code: string) {

  const parts = code.split(".");

  if (parts.length === 1) {
    return "Provinsi";
  }

  if (parts.length === 2) {

    const second =
      Number(parts[1]);

    if (second >= 71) {
      return "Kota";
    }

    return "Kabupaten";
  }

  if (parts.length === 3) {
    return "Kecamatan";
  }

  if (parts.length === 4) {

    const last = parts[3];

    if (last.startsWith("1")) {
      return "Kelurahan";
    }

    if (last.startsWith("2")) {
      return "Desa";
    }

    if (last.startsWith("3")) {
      return "Desa Adat";
    }

    return "Wilayah";
  }

  return "Unknown";
}

// =====================
// API
// =====================

export async function GET(
  request: Request
) {

  const { searchParams } =
    new URL(request.url);

  const q =
    searchParams.get("q") || "";

  if (!q.trim()) {

    return Response.json({
      success: true,
      data: [],
    });
  }

  // =====================
  // GET YEAR
  // =====================

  const latestYear =
    getLatestYear();

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

  // =====================
  // LOAD DATA
  // =====================

  const provinsi = loadJson(
    path.join(basePath, "provinsi.json")
  );

  const kabupaten = loadJson(
    path.join(basePath, "kabupaten.json")
  );

  const kecamatan = loadJson(
    path.join(basePath, "kecamatan.json")
  );

  const desa = loadJson(
    path.join(basePath, "desa.json")
  );

  const kelurahan = loadJson(
    path.join(basePath, "kelurahan.json")
  );

  // =====================
  // COMBINE
  // =====================

  const allData = [

    ...provinsi.data,
    ...kabupaten.data,
    ...kecamatan.data,
    ...desa.data,
    ...kelurahan.data,

  ];

  // =====================
  // NORMALIZE QUERY
  // =====================

  const normalizedQuery =
    q
      .toLowerCase()
      .replaceAll(".", "")
      .trim();

  // =====================
  // FILTER
  // =====================

  const filtered = allData.filter(
    (item: any) => {

      const normalizedCode =
        item.code.replaceAll(".", "");

      const normalizedName =
        item.name.toLowerCase();

      return (
        normalizedName.includes(
          normalizedQuery
        ) ||
        normalizedCode.includes(
          normalizedQuery
        )
      );
    }
  );

  // =====================
  // BUILD RESULT
  // =====================

  const results = filtered
    .slice(0, 5)
    .map((item: any) => {

      const parts =
        item.code.split(".");

      const type =
        getType(item.code);

      // =====================
      // BREADCRUMB
      // =====================

      let breadcrumb = "";

      // Kabupaten/Kota
      if (parts.length >= 2) {

        const provCode =
          parts[0];

        const prov =
          provinsi.data.find(
            (x: any) =>
              x.code === provCode
          );

        if (prov) {
          breadcrumb += prov.name;
        }
      }

      // Kecamatan
      if (parts.length >= 3) {

        const kabCode =
          `${parts[0]}.${parts[1]}`;

        const kab =
          kabupaten.data.find(
            (x: any) =>
              x.code === kabCode
          );

        if (kab) {
          breadcrumb +=
            ` › ${kab.name}`;
        }
      }

      // Desa/Kelurahan
      if (parts.length >= 4) {

        const kecCode =
          `${parts[0]}.${parts[1]}.${parts[2]}`;

        const kec =
          kecamatan.data.find(
            (x: any) =>
              x.code === kecCode
          );

        if (kec) {
          breadcrumb +=
            ` › ${kec.name}`;
        }
      }

      // =====================
      // SUMMARY
      // =====================

      let summary = "";

      // PROVINSI
      if (parts.length === 1) {

        const kabCount =
          kabupaten.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        const kecCount =
          kecamatan.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        const desaCount =
          desa.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        const kelCount =
          kelurahan.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        summary =
          `${kabCount} kab/kota • ` +
          `${kecCount} kecamatan • ` +
          `${desaCount} desa • ` +
          `${kelCount} kelurahan`;
      }

      // KABUPATEN
      if (parts.length === 2) {

        const kecCount =
          kecamatan.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        const desaCount =
          desa.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        const kelCount =
          kelurahan.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        summary =
          `${kecCount} kecamatan • ` +
          `${desaCount} desa • ` +
          `${kelCount} kelurahan`;
      }

      // KECAMATAN
      if (parts.length === 3) {

        const desaCount =
          desa.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        const kelCount =
          kelurahan.data.filter(
            (x: any) =>
              x.code.startsWith(
                item.code + "."
              )
          ).length;

        summary =
          `${desaCount} desa • ` +
          `${kelCount} kelurahan`;
      }

      return {

        code: item.code,

        name: item.name,

        type,

        breadcrumb,

        summary,

      };
    });

  // =====================
  // RESPONSE
  // =====================

  return Response.json({

    success: true,

    query: q,

    total: results.length,

    data: results,

  });
}
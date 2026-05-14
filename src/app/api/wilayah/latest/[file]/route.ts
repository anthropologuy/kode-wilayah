import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      file: string;
    }>;
  }
) {

  const { file } = await context.params;

  // =====================
  // BASE DIRECTORY
  // =====================

  const baseDir = path.join(
    process.cwd(),
    "public",
    "api",
    "wilayah"
  );

  // =====================
  // GET ALL YEAR FOLDERS
  // =====================

  const versions = fs
    .readdirSync(baseDir)
    .filter((name) => /^\d{4}$/.test(name))
    .sort()
    .reverse();

  const latestYear = versions[0];

  // =====================
  // FILE PATH
  // =====================

  const filePath = path.join(
    baseDir,
    latestYear,
    `${file}.json`
  );

  // =====================
  // FILE EXISTS?
  // =====================

  if (!fs.existsSync(filePath)) {

    return Response.json(
      {
        success: false,
        message: "File not found",
      },
      {
        status: 404,
      }
    );
  }

  // =====================
  // LOAD JSON
  // =====================

  const fileContent = fs.readFileSync(
    filePath,
    "utf-8"
  );

  const json = JSON.parse(fileContent);

  return Response.json(json);
}
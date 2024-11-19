"use server";
import { google } from "googleapis";
import path from "path";

const keyFilePath = path.resolve(
  process.cwd(),
  "src/app/api/actions/google-sheets-key.json"
);

export async function getSheetData() {
  try {
    const glAuth = await google.auth.getClient({
      keyFile: keyFilePath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const range = "2024-2025";

    console.log("Fetching data from:", { spreadsheetId, range });

    const data = await glSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    console.log("Data fetched successfully:", data.data.values);

    return { data: data.data.values };
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    throw new Error("Failed to fetch data from Google Sheets");
  }
}

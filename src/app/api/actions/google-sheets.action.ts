"use server";
import { google } from "googleapis";

export async function getSheetData() {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not defined");
    }

    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, "base64").toString("utf-8")
    );

    const glAuth = await google.auth.getClient({
      credentials,
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

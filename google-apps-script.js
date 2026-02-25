const SPREADSHEET_ID = "18iZvC7ROLIdksTrSfygoCYh1W7yunBbFTz-MmScCVwA";
const SHEET_NAME = "Sheet1"; // Change if you renamed the sheet tab

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.purpose || "",
      data.industry || "",
      data.interest || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Louis Polo Expo form endpoint is live!" }))
    .setMimeType(ContentService.MimeType.JSON);
}

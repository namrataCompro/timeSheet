eval(UrlFetchApp.fetch('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js').getContentText());
var date = formatDate(new Date());
configData = config();
sheetId = configData.sheetId;
teamMembersName = configData.Team.Name
holidayList = configData.holidayList;
function isHoliday(date) {
    for (i = 0; i < holidayList.length; i++) {
        if (date == holidayList[i]) {
            return true;
        }
    }
}
//create new sheet on 1st of every month
function createTimeSheet() {
    spreadSheet = SpreadsheetApp.openById(sheetId);
    sheetName = getSheetName(date);
    noOfDays = moment(date, "DD/MM/YYYY").daysInMonth();
    var ss = spreadSheet.insertSheet(sheetName);
    var sheet = spreadSheet.getSheetByName(sheetName);
    var headersRange = sheet.getRange(1, 1, 1, (teamMembersName.length + 2));
    headersRange.setBackgroundColor("#cccccc");
    headersRange.setFontWeight("bold");
    firstRow = ['SNo.', 'Date'];
    otherRows = []
    //values to insert in rows
    for (member = 0; member < teamMembersName.length; member++) {
        firstRow.push(teamMembersName[member]);
        otherRows.push('Leave');
    }
    sheet.appendRow(firstRow);
    today = new Date();
    nextDate = new Date(today);
    for (Sno = 1; Sno <= noOfDays; Sno++) {
        if (getDay(nextDate) != 0 && getDay(nextDate) != 6 && !isHoliday(formatDate(nextDate))) {
            sheet.appendRow([Sno, formatDate(nextDate)]);
        }
        else {
            otherRows.splice(0, 0, Sno);
            otherRows.splice(1, 0, formatDate(nextDate));
            sheet.appendRow(otherRows);
            otherRows.splice(0, 2)
        }
        nextDate.setDate(today.getDate() + 1);
        today = nextDate;
    }
    sheet.setFrozenRows(1);
    sheet.autoResizeColumn(1);
    range = sheet.getRange(1, 1, (noOfDays + 1), (teamMembersName.length + 2))
    range.setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID);
    range.setHorizontalAlignment("center")

}
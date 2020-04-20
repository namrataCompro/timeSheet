configData = config();
sheetId = configData.sheetId;
teamMembersName = configData.Team.Name;
teamMembersEmail = configData.Team.Email;
noOfMembers = teamMembersName.length;
//access spreadsheet by ID
spreadSheet = SpreadsheetApp.openById(sheetId);
sheetName = getSheetName();
sheet = spreadSheet.getSheetByName(sheetName);
//get values of sheet
if (sheet) {
    var range = sheet.getDataRange();
    var values = range.getDisplayValues();
    //get column index and email of team members
    var name = [], email = [], col = [];
    for (var member = 0; member < teamMembersName.length; member++) {
        col[member] = values[0].indexOf(teamMembersName[member]);
        email[member] = teamMembersEmail[member];
    }

    //send mail to those who has not entered time in Team time sheet
    function sendReminderToEnterTime() {
        var sendTo = "";
        for (var row = 0; row < values.length; row++) {
            if (values[row][1] == date) {
                //check for those who have not entered time
                for (var member = 0; member < teamMembersName.length; member++) {
                    if (values[row][col[member]] == "") {
                        sendTo += email[member] + ",";
                    }
                }

            }
        }
        subject = configData.reminder.subject;
        body = configData.reminder.body;
        //if someone has not entered time send them mail
        if (sendTo != "") {
            GmailApp.sendEmail(sendTo, subject, body);
        }
        //else send details of those who entered after 09:30 or on leave
        else {
            sendArrivalTimeDetails();
        }
    }


    //returns true if everyone entered time else returns false
    function checkEveryoneEntered(row) {
        var entered = false
        for (var member = 0; member < teamMembersName.length; member++) {
            if (values[row][col[member]] != "") {
                entered = true
            }
            else {
                return false;
            }
        }
        return entered
    }
    //return details of those who entered after 09:30 or on leave
    function checkForLeaveOrLate(row) {
        list = ""
        for (var member = 0; member < teamMembersName.length; member++) {
            if (values[row][col[member]] == 'Leave') {
                list += teamMembersName[member] + " : Leave" + "\n"
            }
            else if ((formatTime(values[row][col[member]]) > formatTime("09:30:00"))) {
                list += teamMembersName[member] + " : " + convertTime24to12(formatTime(values[row][col[member]])) + "\n"
            }

        }
        return list;
    }


    //send time in details of those who came after 09:30
    function sendArrivalTimeDetails() {
        var called = 'false'
        var list = "";
        var sendTo = configData.managersEmail;
        var day = range.getValues();
        for (var row = 0; row < values.length; row++) {
            //check for saturday sunday
            if (values[row][1] == date && getDay(day[row][1]) != 0 && getDay(day[row][1]) != 6 && !isHoliday(values[row][1])) {
                //Check whether everyone has entered time
                if (checkEveryoneEntered(row)) {
                    // if time in after 09:30 or on leave
                    range = sheet.getRange(row + 1, 1, 1, 1);
                    list = checkForLeaveOrLate(row)
                }
            }
        }
        subject = configData.arivalDetails.subject;
        body = configData.arivalDetails.body + list
        if (list != "" && range.getBackground() != "#004c00") {
            GmailApp.sendEmail(sendTo, subject, body);
            range.setBackground("#004c00");
        }


    }
}

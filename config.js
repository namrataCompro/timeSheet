function config() {
  object = {
    sheetId: "1xeHqLvkz1JnxqpKOSvdvxL5vA_0cMDeBKQSVubiMJpo",
    Team: {
      Name: ['Kamakshi', 'Shubham', 'Sahil', 'Namrata', 'Shweta'],
      Email: ['kamakshi.ratra@comprotechnologies.com', 'shubham.aggarwal@comprotechnologies.com', 'sahil.malik@comprotechnologies.com', 'namrata.singh@comprotechnologies.com', 'shweta.kumari@comprotechnologies.com']
    },
    managersEmail: "sushil.arora@comprotechnologies.com",
    holidayList: ['01/01/2020', '26/12/2020', '10/03/2020', '25/05/2020', '15/08/2020', '02/10/2020', '25/10/2020', '14/11/2020', '25/11/2020', '25/12/2020'],
    reminder: {
      subject: "Enter Time In",
      body: "Hello , \n" +
        "you have not entered your time in details in time sheet .Please enter the details \n" +
        "https://docs.google.com/spreadsheets/d/1xeHqLvkz1JnxqpKOSvdvxL5vA_0cMDeBKQSVubiMJpo/edit#gid=473933634"

    },
    arivalDetails: {
      subject: "Arrival Time",
      body: "Hi , \n"
    }
  }
  return object
}

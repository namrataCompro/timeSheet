//returns date in dd/mm/yy format 
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [day, month, year].join('/');
}
//returns next date
function nextDate(date) {
  var d = date.split('/')
  month = '' + d[1],
    day = '' + (Number(d[0]) + 1),
    year = d[2];
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [day, month, year].join('/');
}

// convert time from 24hr to 12 hr format
function convertTime24to12(time) {
  time = time.split(':');
  hr = time[0];
  min = time[1];
  if (hr > 12)
    hr = (Number(hr) - 12).toString();
  if (hr.length < 2 && hr <= 9)
    hr = '0' + hr
  return [hr, min].join(':');
}
// return day no in week
function getDay(date) {
  var d = new Date(date),
    day = '' + d.getDay();
  return day;
}
//return time in hh:mm 24hr format  
function formatTime(time) {
  time = time.split(':');
  hr = time[0];
  min = time[1];
  if (hr < 8)
    hr = Number(hr) + 12;
  if (hr.length < 2 && hr <= 9) {
    hr = '0' + hr
  }
  if (min == undefined) {
    min = "00";
  }
  else if (min.length < 2 && min <= 9) {
    min = '0' + min
  }
  return [hr, min].join(':');
}
//return sheet name
function getSheetName() {
  const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var d = new Date(),
    monthName = monthNames[d.getMonth()],
    year = d.getYear();
  return [monthName, year].join(' ');
}
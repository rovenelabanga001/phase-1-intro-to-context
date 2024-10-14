// Your code here

function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrOfArrays) {
  return arrOfArrays.map(createEmployeeRecord);
}
function createTimeInEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour), //convert hour from string to number
    date: date, //use the date part as a string
  };

  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour), //convert hour from string to number
    date: date, //use the date part as a string
  };

  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
  // Find the matching timeInEvent for the given date
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  // Find the matching timeOutEvent for the given date
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  // Calculate the hours worked (in hours, not minutes)
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}
function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  return wagesEarned;
}

function allWagesFor(employeeRecord) {
  const timeInEvents = employeeRecord.timeInEvents;
  const timeOutEvents = employeeRecord.timeOutEvents;

  let totalWages = 0;

  for (let i = 0; i < timeInEvents.length; i++) {
    const timeIn = timeInEvents[i];
    const timeOut = timeOutEvents[i];

    const hoursWorked = (parseInt(timeOut.hour) - parseInt(timeIn.hour)) / 100;

    const wagesForDay = hoursWorked * employeeRecord.payPerHour;
    totalWages += wagesForDay;
  }

  return totalWages;
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}

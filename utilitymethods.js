function parseLocalDate(date) {
    /**
     * Construct a date object in the local timezone by parsing the input date string, assuming a YYYY-MM-DD format.
     * Note that the Date(dateString) constructor is explicitly avoided as it may implicitly assume a UTC timezone.
     */
    const dateComponents = date.split(/\-/);
    return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
}

function isValidDate(date) {
    try {
        return !(isNaN(parseLocalDate(date).getTime()));
    } catch (err) {
        return false;
    }
}
function addDaysInTodayDate(numberofDays){
    var today = new Date();
    var endDay = new Date(today.getFullYear(),today.getMonth(),today.getDate() + numberofDays);
    var requiredDate = endDay.toISOString().substr(0,10);
    console.log(`Required Date in addDaysInTodayDate is ${requiredDate}`);
    return requiredDate;
}
function currentDateInStringFormat(){
    var today = new Date();
    var requiredDate = today.toISOString().substr(0,10);
    console.log(`Required Date in currentDateInStringFormat is ${requiredDate}`);
    return requiredDate;
}
function formatEmailAddress(emailAddress){
    return emailAddress.substring(emailAddress.indexOf("|") + 1);
}
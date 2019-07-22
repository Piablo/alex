export default {
  FirstToUpper(stringToSanitize) {
    if (stringToSanitize !== undefined) {
      var returnValue = stringToSanitize.toLowerCase();
      returnValue = returnValue.charAt(0).toUpperCase() + returnValue.slice(1);
      return returnValue;
    }
  }
};

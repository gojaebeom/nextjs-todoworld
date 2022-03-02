export function dateToString(date = new Date(), deco = "-") {
  // type -> - or ""
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + deco + month + deco + day;
}

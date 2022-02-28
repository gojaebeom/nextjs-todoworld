export function catchHandler(message = "에러발생", cb) {
  cb();
  window.alert(message);
  throw new Error(message);
}

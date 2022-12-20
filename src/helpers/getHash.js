import sha512 from "js-sha512";

/** получение hash для файла
 * @param {Object} file - объект файла
 * @returns Promise result {hash: '', file: {}}
 */
let getHash = (file) => {
  return new Promise(function (resolve, reject) {
    if (file.size > 2097152) {
      let reader1 = new FileReader();
      let reader2 = new FileReader();
      let reader3 = new FileReader();

      reader1.addEventListener("load", (result) => {
        let part1 = result.target.result;
        if (reader2.readyState === 2 && reader3.readyState === 2) {
          resolve({
            hash: sha512(sha512(part1) + sha512(reader2.result) + sha512(reader3.result)),
            file: file
          });
        }
      }, true);

      reader1.addEventListener('error', () => {
        reject();
      }, true);

      reader2.addEventListener("load", (result) => {
        let part2 = result.target.result;
        if (reader1.readyState === 2 && reader3.readyState === 2) {
          resolve({
            hash: sha512(sha512(reader1.result) + sha512(part2) + sha512(reader3.result)),
            file: file
          });
        }
      }, true);

      reader2.addEventListener('error', () => {
        reject();
      }, true);

      reader3.addEventListener("load", (result) => {
        let part3 = result.target.result;
        if (reader1.readyState === 2 && reader2.readyState === 2) {
          resolve({
            hash: sha512(sha512(reader1.result) + sha512(reader2.result) + sha512(part3)),
            file: file
          });
        }
      }, true);

      reader3.addEventListener('error', () => {
        reject();
      }, true);

      reader1.readAsArrayBuffer(file.slice(0, 1048576));
      let middle = Number.parseInt(file.size/2);
      reader2.readAsArrayBuffer(file.slice(middle, middle + 1048576));
      reader3.readAsArrayBuffer(file.slice(-1048576));

    } else {

      let reader = new FileReader();

      reader.addEventListener("load", (result) => {
        let text = result.target.result;
        resolve({
          hash: sha512(text),
          file: file
        });
      }, true);

      reader.addEventListener('error', () => {
        reject();
      }, true);

      reader.readAsArrayBuffer(file);
    }
  });
};

export { getHash }

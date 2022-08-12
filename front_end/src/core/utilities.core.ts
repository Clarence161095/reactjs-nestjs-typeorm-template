import { websql } from '../hooks/database.hook';

const getBase64Image = (url: string, tx: any) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    var reader = new FileReader();
    reader.onload = function (event: any) {
      var res = event.target.result;
      if (res) {
        websql?.transaction((tx: any) => {
          tx.executeSql('INSERT INTO IMAGES (key, data) VALUES (?, ?)', [url, res]);
        });
      }
    };
    var file = this.response;
    reader.readAsDataURL(file);
  };
  xhr.send();
};

function getImageFromLocal(url: string, cb: any) {
  websql?.transaction((tx: any) => {
    tx.executeSql(
      'SELECT * FROM IMAGES WHERE key = ? LIMIT 1',
      [url],
      (tx: any, results: any) => {
        var len = results.rows.length;
        if (len > 0) {
          cb(results.rows.item(0).data);
          return results.rows.item(0).data;
        } else {
          getBase64Image(url, tx);
          cb(url);
        }
      },
      (err: any) => {
        cb(url);
      }
    );
  });
}

function hasWebsql() {
  if (localStorage.getItem('websql')) {
    if (localStorage.getItem('websql') === 'ok') {
      return getImageFromLocal;
    }
  } else {
    return (url: any, setState: any) => setState(url);
  }
  return (url: any, setState: any) => setState(url);
}

const getImageFromUrl = (url: string, setState = (data: any) => {}) => {
  hasWebsql()(url, setState);
};

const util = {
  getImageFromUrl,
};
export default util;

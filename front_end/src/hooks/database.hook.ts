import { useEffect } from 'react';

declare global {
  interface Window {
    openDatabase: any;
  }
}

export let websql: any;

function onDeviceReady() {
  try {
    let openDatabase = window.openDatabase;
    websql = openDatabase(
      'Database',
      '1.0',
      'Local Database',
      2 * 1024 * 1024 * 1024
    );
    websql.transaction(
      (tx: any) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS IMAGES (key unique, data)');
      },
      (err: any) => {
        console.log('Init LocalDB Error: ' + err);
        localStorage.setItem('websql', 'not_ok');
      },
      () => {
        console.log('Init LocalDB Success!');
        localStorage.setItem('websql', 'ok');
      }
    );
  } catch (error) {
    localStorage.setItem('websql', 'not_ok');
  }
}

const DatabaseHook = () => {
  useEffect(() => {
    localStorage.setItem('websql', 'not_ok');
    onDeviceReady();
  }, []);
};

const databaseHook = DatabaseHook;

export default databaseHook;

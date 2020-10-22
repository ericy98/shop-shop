export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to db, version 1
    const request = window.indexedDB.open('shop-shop', 1);

    let db, tx, store; // database, transaction, object store

    // only runs if version # changed
    request.onupgradeneeded = function (e) {
      const db = request.result;

      // obj store for each data type, primary key set to data's id
      db.createObjectStore('products', { keyPath: '_id' }); // ('name', {'key'});
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function (e) {
      console.log('There was an error...');
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log('error', e);
      }

      switch (method) {
        case 'put': // returns data
          store.put(object);
          resolve(object);
          break;
        case 'get': // returns data
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default: 
          console.log('No valid method');
          break;
      }

      // when transaction complete, close connection
      tx.oncomplete = function () {
        db.close();
      }
    }

  });
}

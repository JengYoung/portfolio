const fs = require('fs');

(() => {
  const invalidationBatch = JSON.stringify({
    Paths: {
      Quantity: 1,
      Items: ['./*'],
    },
    CallerReference: new Date().getTime(),
  });

  fs.writeFile('./invalidation.json', invalidationBatch, (err) => {
    console.log(`json file creation result: ${!err ? 'success' : failed}`);
    if (!err) console.log(`result: ${invalidationBatch}`);
  });
})();

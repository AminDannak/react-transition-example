self.onmessage = (e) => {
  const items = [];
  for (let i = 0; i < 50000; i++) {
    items.push(`Item ${i}`);
  }
  self.postMessage(items);
};
  
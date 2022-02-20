(() => {
  const clock = document.querySelector('#realtime-clock');
  setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
  });
})();

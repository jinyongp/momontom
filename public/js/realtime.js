(() => {
  const clock = document.querySelector('#realtime-clock');
  const hours = clock.querySelector('.hours');
  const minutes = clock.querySelector('.minutes');
  const seconds = clock.querySelector('.seconds');
  const leadZero = (time) => time.toString().padStart(2, '0');
  setInterval(() => {
    const now = new Date();
    hours.textContent = leadZero(now.getHours());
    minutes.textContent = leadZero(now.getMinutes());
    seconds.textContent = leadZero(now.getSeconds());
  });
})();

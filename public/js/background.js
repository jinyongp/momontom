(() => {
  const IMAGES_FOLDER = 'public/images';
  const NUM_IMAGE = 10;
  document.body.style.backgroundImage = `url("${getRandomImagePath()}")`;

  function getRandomImagePath() {
    return `${IMAGES_FOLDER}/${Math.floor(Math.random() * NUM_IMAGE)}.jpeg`;
  }
})();

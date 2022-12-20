const drawAudio = ({voiceArray}, amountBar) => {
  draw(filterData(voiceArray), amountBar)
};

const filterData = audioBuffer => {
  let step = (Math.max.apply(null, audioBuffer) - Math.min.apply(null, audioBuffer)) / 4;

  return audioBuffer.map(item => {
    switch (true) {
      case (item < step):
        item = 10
        break;
      case (item < step * 2):
        item = 12
        break;
      case (item < step * 3):
        item = 16
        break;
      case (item >= step * 3):
        item = 24
        break;
    }
    return item
  })
};

const draw = (normalizedData, amountBar) => {
  const dpr = window.devicePixelRatio || 1;
  const canvas = document.querySelector("canvas");
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = 48;

  const ctx = canvas.getContext("2d");
  ctx.textBaseline = 'middle';
  ctx.scale(dpr, dpr);
  ctx.translate(0, canvas.offsetHeight / 2.2);

  const countBar = amountBar
  const step = normalizedData.length / countBar
  const width = canvas.offsetWidth / countBar;
  let xPos = 0;
  for (let i = 0; i < countBar; i ++) {
    let height = normalizedData[Math.floor(xPos)];
    let position = 0;
    xPos += step;

    switch (true) {
      case (height === 10):
        position = -5
        break;
      case (height === 12):
        position = -6
        break;
      case (height === 16):
        position = -8
        break;
      case (height === 24):
        position = -12
        break;
    }
    const x = width * i;
    drawLineSegment(ctx, x, height, width, position);
  }
};

const drawLineSegment = (ctx, x, height, width, position) => {
  ctx.lineWidth = '2px';
  ctx.strokeStyle = "#E2E2F6";
  ctx.beginPath();
  ctx.roundRect(x + width / 2, position, 1, height, 5);
  ctx.stroke();
};

export { drawAudio }

let getTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formatted = [
    minutes.toString().padStart(1, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');

  return formatted
}


export { getTime };

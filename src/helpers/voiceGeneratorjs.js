/** Эмулирует запись голосового сооющения
 * @param {Number} randeVoice - размер голосовой / 0 - минимальный / 1 - средний / 2 - большой
 */
let voiceRecorder = (randeVoice = undefined) => {
  let voiceSize = { // размерность массива
    0: [20, 100], // 1 секунды до 5 секунд
    1: [200, 1200], // 10 секунд до 60 секунд
    2: [2400, 12000], // 2 минут до 10 минут
  }

  // получить рандомное число
  let getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  // генератор массива голосового
  let generator = () => {
    let lengthArray; // длина массива

    if (randeVoice !== undefined) {
      lengthArray = getRandom(voiceSize[randeVoice][0], voiceSize[randeVoice][1])
    } else {
      let indexVoiceSize = getRandom(0, 2);
      lengthArray = getRandom(voiceSize[indexVoiceSize][0], voiceSize[indexVoiceSize][1])
    }

    let array = new Uint8Array(lengthArray);
    let resultArray = new Uint8Array(lengthArray);
    let min = 0;
    let max = getRandom(50, 255);
    let middle = Math.floor((max + min) / 2);
    let sign = 1; // 0 - минус / 1 - плюс
    let valueIncrement = 2;
    let prevValue = middle;
    let currentValue = 0;

    resultArray = array.map((item, i) => {
      if (i % 10 === 0) {
        sign = getRandom(0, 1); // 0 - минус / 1 - плюс
        valueIncrement = getRandom(2, 10);
      }

      if (i !== 0) {
        let value;

        if (sign === 0) {
          value = prevValue - valueIncrement;

          if (value < min) currentValue = min;
          else currentValue = value;
        } else {
          value = prevValue + valueIncrement;

          if (value > max) currentValue = min;
          else currentValue = value;
        }
      }

      prevValue = currentValue;
      return currentValue;
    });

    return {
      voiceArray: resultArray,
      time: Math.floor(lengthArray / 20),
      file: new File(["voice"], "voice.txt")
    }
  }

  return generator()
}

export { voiceRecorder }

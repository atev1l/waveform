import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";

import { checkFile, setHash, uploadFile } from "./asyncActions";

import { voiceRecorder } from "./helpers/voiceGeneratorjs";
import { getTime } from "./helpers/getTime";
import { drawAudio } from "./helpers/drawVoiceCanvas";
import { getHash } from "./helpers/getHash";

import Button from "./components/ui/Button";
import Close from "./components/ui/Icon/close";
import Play from "./components/ui/Icon/play";
import Send from "./components/ui/Icon/send";

import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const [record, setRecord] = useState()
  const [time, setTime] = useState()
  const [width, ] = useWindowSize();
  const [showVoice, setShowVoice] = useState(false);
  const {fileId, error, hash} = useSelector(state => state)

  const handleFile = () => {
    const currentRecord = voiceRecorder(2)
    setRecord(currentRecord)
    const currentTime = getTime(currentRecord.time)
    setTime(currentTime)
  }

  const handleCheckFile = () => {
    getHash(record.file).then(r => {
      dispatch(setHash(r.hash))
      dispatch(checkFile(r.hash))
    })
  }

  const amountBar = () => {
    switch (true) {
      case (width <= 380):
        return 37
      case (width <= 1280):
        return 46
      default:
        return 49
    }
  }

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
  }

  useEffect(() => {
    if (error === 'not_found'){
      const formData = new FormData();
      formData.append("file", record?.file);
      formData.append("module", 'upload');
      formData.append("hash", hash);

      dispatch(uploadFile(formData))
    }
  }, [error, fileId])

  useEffect(() => {
    if (record) {
      const countBar = amountBar()
      drawAudio(record, countBar)
    }
  }, [record])

  const btnRecord = (
    <div className="voice-button__container">
      <div className="voice-button">
        <Button onClick={() => {
          setShowVoice(false)
          handleFile()
        }}>Начать запись</Button>
      </div>
    </div>
  )

  const voiceMessage = (
    <div className="voice-item__container">
      <div className="icon-cross" onClick={() => {
        setRecord(null)
      }}>
        <Close />
      </div>
      <div className="voice-item">
        <div className="icon-play">
          <Play />
        </div>
        <div className="canvas__container" id="canvas__container">
          <canvas></canvas>
        </div>
        <div className="voice-time">
          {time}
        </div>
      </div>
      <div className={`icon-send ${showVoice ? 'icon-send_disable' : null}`} onClick={() => {
        setShowVoice(true)
        handleCheckFile()
      }}>
        <Send />
      </div>
    </div>
  )

  return (
    <div className="App">
      <div className="voice__container">
        {!record ?
          (<>{btnRecord}</>) : (<>{voiceMessage}</>)
        }
      </div>
    </div>
  );
}

export default App;

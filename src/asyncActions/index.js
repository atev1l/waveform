import { defineHash, setMessage, getFile } from "../store/fileReducer";


export const checkFile = (hash) => {
    return (dispatch) => {
        fetch(`https://ri-ege.ru/lk/2021/service/front_test.php`, {
            method: 'POST',
            body: JSON.stringify({
                module: 'check',
                hash: hash
            })
        })
          .then(response => response.json())
          .then(json => {
              if (json.error){
                  alert(json.error)
              }
              dispatch(getFile({json}))
          })
          .catch(e => console.log(e))
    }
}

export const uploadFile = (file) => {
    return (dispatch) => {
        fetch(`https://ri-ege.ru/lk/2021/service/front_test.php`, {
            method: 'POST',
            body: file
        })
          .then(response => response.json())
          .then(json => {dispatch(setMessage(json.file_id))})
          .catch(e => console.log(e))
    }
}

export const setHash = (hash) => {
    return (dispatch) => {
        dispatch(defineHash(hash))
    }
}

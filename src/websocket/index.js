
import * as actions from 'actions'

export function openConnection() {
  return (dispatch) => websocket.connect(dispatch)
}
export function closeConnection() {
  return (dispatch) => websocket.close(dispatch)
}
export function sendMessage(text) {
  return (dispatch) => websocket.post(text, dispatch)
}
const websocket = {
  connection: null,
  post: (text, dispatch) => {
    websocket.connection.send(text)
    dispatch(actions.post())
  },
  close: (dispatch) => {
    websocket.connection.close()
    websocket.connection = null
  },
  connect: (dispatch) => {
    if(!!websocket.connection) websocket.connection.close()
    websocket.connection = new WebSocket(`wss://echo.websocket.org`)
    websocket.connection.onopen = function () {
      dispatch(actions.connect())
    }
    websocket.connection.onmessage = function (event) {
      dispatch(actions.add_message(event.data))
    }
    websocket.connection.onclose = function () {
      dispatch(actions.disconnect())
    }
  }
}

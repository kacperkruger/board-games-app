export const socket = new WebSocket('ws://ws.board-games-app.k8s')

export const setupSocket = (dispatch) => {

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        dispatch(data)
    }
    return socket
}

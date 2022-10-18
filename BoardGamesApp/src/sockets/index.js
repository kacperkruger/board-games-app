const setupSocket = (dispatch) => {
    const socket = new WebSocket('ws://localhost/ws')

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        dispatch(data)
    }
    return socket
}

export default setupSocket
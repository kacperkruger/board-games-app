const socket = new WebSocket('ws://localhost/ws')

const socketPasser = store => next => action => {
    socket.send(JSON.stringify(action))
    return next(action)
}

export default socketPasser
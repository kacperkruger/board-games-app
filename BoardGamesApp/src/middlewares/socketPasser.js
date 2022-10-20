import { socket } from '../sockets/index'

const socketPasser = store => next => action => {
    socket.send(JSON.stringify(action))
    return next(action)
}

export default socketPasser
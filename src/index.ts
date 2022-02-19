import ipc from 'node-ipc'

export function config(id = 'centralStation', retry = 1500) {
  ipc.config.id = id
  ipc.config.retry = retry
  ipc.serve(function() {
    ipc.server.on('message', processMessage)
    ipc.server.on('socket.disconnected', disconnect)
  })

  ipc.server.start()
}

export function sendMessage(data: any, socket: any) {
  ipc.server.emit(socket, 'message', data)
}

function processMessage(data, socket: any) {
  ipc.log('got a message', data)
}

function disconnect(_socket: any, destroyedSocketID: string) {
  ipc.log(`client ${destroyedSocketID} has disconnected`)
}

config()

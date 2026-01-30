let io;

function setIO(serverIO) {
  io = serverIO;
}

function getIO() {
  return io;
}

module.exports = {
  setIO,
  getIO,
};

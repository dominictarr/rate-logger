var fs = require('fs')

function stringify (data) {
  return JSON.stringify(data, null, 2) + '\n\n'
}

module.exports = function (filename, interval) {
  var logfile = filename+'.log'
  var ts = Date.now()
  var state, session = {start: ts, end: ts, time: 0, total: 0, rate: 0}
  try {
    state = JSON.parse(fs.readFileSync(filename, 'utf8'))
  } catch(err) {
    state = {total: 0, time: 0}
  }

  function update () {
    session.end = Date.now()
    session.time = session.end - session.start
    session.rate = session.total/(session.time/1000) //bytes per second

    state.total += session.total
    state.time += session.time
    state.rate = state.total / (state.time/1000)

    fs.appendFileSync(logfile, stringify(session))
    fs.writeFileSync(filename, stringify(state))
    session.total = session.time = session.rate = 0
    session.start = session.end = Date.now()
  }

  //necessary, to catch ctrl-c
  process.on('SIGINT', function () {
    update()
    process.exit(1)
  })
  process.on('exit', update)

  setTimeout(function () {
    if(session.total)
      update()
  }, interval || 1000*60*10) //ten minutes
  .unref()

  return function (len) {
    //always be a number
    if(isNaN(len = +len)) return

    state.total += len
    session.total += len
  }
}













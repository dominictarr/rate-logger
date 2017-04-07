

//remember how much standard input comes per second
//to test, start program, then run hit keyboard a bit
//then kill process, then cat keystrokes-example.json

var logger = require('./')('keystrokes-example.json', 1000)

process.stdin.on('data', function (e) {
  console.error('data', e.length)
  logger(e.length)
})



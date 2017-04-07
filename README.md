# rate-logger

record how much of something moves past,
say bytes over the network. stores the total in a json file,
and a log file too. recording the bytes moved and time active.

## example
remember how much standard input comes per second
to test, start program, then run hit keyboard a bit
then kill process, then cat keystrokes-example.json

``` js
var logger = require('./')('keystrokes-example.json', 1000)

process.stdin.on('data', function (e) {
  logger(e.length)
})
```
## License

MIT





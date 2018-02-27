let currentMins = 10
let currentCount = 10 * 60
let pause = true
let started = false

$(document).ready(function() {

  // --- SET TIME --- //
  $('select').on('change', function() {

    const timePair = {
      pappardelle: 7,
      penne: 10,
      farfalle: 11,
      bucatini: 8,
      angelhair: 4,
      gnocchi: 1,
      orecchiette: 10,
      justboiledeggs: 11
    }

    const selected = this.value

    for (let keys in timePair) {
      let toPrint = ''
      if (selected.split(' ').join('').toLowerCase() == keys) {
        toPrint = timePair[keys]
        $('#mins').html(toPrint)
        $('.clock').html(toPrint + ':00')
        currentMins = toPrint
        currentCount = timePair[keys] * 60
        console.log('current counts on set: ', currentCount)
      }
    }

    if (selected.indexOf('Seamless') != -1) {
      window.open('http://seamless.com', '_blank')
    }

  })


  // --- UPDATE CLOCK --- //

  //basic increment and decrement setting
  $('.decrement').click(function() {
    if ((currentMins) > 1) {
      currentMins -= 1
      currentCount -= 60
      $('#mins').html(currentMins)
      $('.clock').html(currentMins + ':00')
      console.log("current mins and count in decrement :", currentMins, currentCount)
    }
  })

  $('.increment').click(function() {
    if (currentMins < 100) {
      currentMins += 1
      currentCount += 60
      $('#mins').html(currentMins)
      $('.clock').html(currentMins + ':00')
      console.log("current mins and count in increment :", currentMins, currentCount)
    }
  })

  $('.clock').click(function() {

    console.log("current currentCount in the starting clock div :", currentCount)

    //interval setting

    if (started && !pause) {
      return;
    } else {
      started = true;
    }
    
    const interval = window.setInterval(function() {
      if (currentCount == 0) {
        pause = true
        $('.clock').html('Buon appetito!')
      } else {
        console.log("current currentCount in the else clause in clock div :", currentCount)
        pause = false
        currentCount--
        let minuites = Math.floor(currentCount / 60)
        let seconds = currentCount - minuites * 60
        $('.clock').html(minuites + ':' + ('0' + seconds).slice(-2))
      }

      $('.pause').click(function() {
        pause = true;
        clearInterval(interval)
      })
    }, 1000)

    $('select').on('change', function() {
      pause = true;
      clearInterval(interval)
    })
  })
}) //end jquery
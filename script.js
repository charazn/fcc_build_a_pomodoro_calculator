$(document).ready(function(){
  var init_break_val = 5;
  var init_session_val = 25;
  var timer_val = init_session_val;
  var timer_on = false;
  var break_on = false;
  var count = init_session_val * 60;
  var nowOn_val = $('#nowOn').text();
  var start_stop_val = $('#start_stop').text();
  var t, minutes, seconds;

  function display() {
    // document.getElementById('timer_val').innerHTML = count;
    minutes = Math.floor(count / 60);
    seconds = Math.floor(count % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    $('#timer_val').text(minutes + ':' + seconds);
  }

  function countdown() {
    display();
    if (count === -1) {
      if (timer_on === true && break_on === false) {
        timer_on = false;
        break_on = true;
        count = init_break_val * 60;
        $('#nowOn').text('BREAK');
        countdown();
      } else if (timer_on === false && break_on === true) {
        timer_on = true;
        break_on = false;
        count = init_session_val * 60;
        $('#nowOn').text('SESSION');
        countdown();
      }
    } else {
      count--;
      t = setTimeout(countdown, 1000);
    }
  }

  function pause() {
    clearTimeout(t);
  }

  $('#break_minus').click(function(){
    if (timer_on === false && break_on === false) {
      if (start_stop_val === 'START') {
        if (init_break_val > 1) {
          init_break_val -= 1;
          $('#init_break_val').text(init_break_val+' min');
        }
      }
    }
  });

  $('#break_plus').click(function(){
    if (timer_on === false && break_on === false) {
      if (start_stop_val === 'START') {
        if (init_break_val >= 1 && init_break_val < 10) {
          init_break_val += 1;
          $('#init_break_val').text(init_break_val+' min');
        }
      }
    }
  });

  $('#session_minus').click(function(){
    if (timer_on === false && break_on === false) {
      if (start_stop_val === 'START') {
        if (init_session_val > 1) {
          timer_val = init_session_val -= 1;
          count = init_session_val * 60;
          $('#init_session_val').text(init_session_val+' min');
          $('#timer_val').text(timer_val);
        }
      }
    }
  });

  $('#session_plus').click(function(){
    if (timer_on === false && break_on === false) {
      if (start_stop_val === 'START') {
        if (init_session_val >= 1 && init_session_val < 60) {
          timer_val = init_session_val += 1;
          count = init_session_val * 60;
          $('#init_session_val').text(init_session_val+' min');
          $('#timer_val').text(timer_val);
        }
      }
    }
  });

  $('#reset').click(function() {
    pause();
    init_break_val = 5;
    timer_val = init_session_val = 25;
    count = init_session_val * 60;
    timer_on = false;
    break_on = false;
    start_stop_val = 'START';
    $('#init_break_val').text(init_break_val+' min');
    $('#init_session_val').text(init_session_val+' min');
    $('#nowOn').text('SESSION');
    $('#start_stop').text('START');
    $('#start_stop').css('background-color', 'green');
    $('#timer_val').text(timer_val);
  })

  $('#start_stop').click(function() {
    nowOn_val = $('#nowOn').text();
    start_stop_val = $('#start_stop').text();
    if (timer_on === false && break_on === false) {
      if (nowOn_val === 'SESSION') {
        timer_on = true;
      } else if (nowOn_val === 'BREAK') {
        break_on = true;
      }
      $('#start_stop').text('STOP');
      $('#start_stop').css('background-color', 'red');
      countdown();
    } else if (timer_on === true && break_on === false) {
      timer_on = false;
      if (count >= -1) {
        $('#start_stop').text('RESUME');
        $('#start_stop').css('background-color', 'green');
      }
      pause();
    } else if (timer_on === false && break_on === true) {
      break_on = false;
      if (count >= -1) {
        $('#start_stop').text('RESUME');
        $('#start_stop').css('background-color', 'green');
      }
      pause();
    }
  });

});

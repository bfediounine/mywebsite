/* eslint-disable no-alert, no-console */
import { getUserContent } from './mysql-connect';

// form validator TODO
const validateForm = () => {
  if ($('#newname').val() === '' || $('#newpass').val() === '') $('#regErrorField').val('Name or password field(s) blank.');
  else if (!/ /.test($('#newname'))) $('#regErrorField').val('Name field must be at least 8 characters, start with a letter and NOT include $%^&');
  else if (!(/[A-Z]/.test($('#newpass')) && $('#newpass').val().match(/%^&*/g).length >= 2)) $('#regErrorField').val('Password field must be at least 8 characters, start with a capital letter and include at least 2 special chars($%^&)');
  else return true;
  return false;
};

$(document).ready(() => {
  const headUls = $('#header').find('ul');
  const miscUls = $('#miscellaneous').find('ul');
  // const proj = headUls.find('li').first();
  // const about = headUls.find('li').last();
  const modal = document.getElementById('newUser');
  // const d = new Date(); // needed for fancy box cosmetics

  // const $nuserdiv = $('#newuservalue');
  const $nname = $('#newname');
  const $npass = $('#newpass');
  // const $nsub = $('#newsubmit');
  const $nform = $('#newuserform');

  // user table
  const $userTable = $('#user-table');

  $nname.val('');
  $npass.val('');
  headUls.hide();
  $('#header').fadeIn('slow');
  $('#miscellaneous').find('ul').slideDown(1000);
  $('#miscellaneous').find('span').animate({ 'padding-right': window.screen.width }, 'slow');
  $('#header').hover(() => {
    $(this).css('background-color', '#BC95A0');
    // $(this).animate({'font-size': '+=3px'}, '50');
    const span = $(this).find('span');
    span.animate({ 'constter-spacing': '+=1px' }, 'fast');
    span.animate({ 'margin-left': '-=25%' }, 'fast');
    headUls.fadeIn('fast');
  }, () => {
    $(this).css('background-color', '#BC8FA0');
    // $(this).animate({'font-size': '-=3px'}, '5');
    const span = $(this).find('span');
    span.animate({ 'constter-spacing': '-=1px' }, 'fast');
    span.animate({ 'margin-left': '+=25%' }, 'fast');
    headUls.fadeOut('fast');
  });

  // load in user/usercontent onto main screen
  const userContent = getUserContent();
  userContent.forEach((element) => {
    $userTable.children().add(element);
  });

  headUls.children().hover(() => {
    $(this).css('background-color', '#FAF0FD');
  }, () => {
    $(this).css('background-color', '#BCA0D0');
  });

  miscUls.children().hover(() => {
    $(this).css('-webkit-animation', 'miscButton 2s infinite');
    $(this).css('-moz-animation', 'miscButton 2s infinite');
  }, () => {
    $(this).css('background-color', '#BDA0A0');
    $(this).css('-webkit-animation', 'unset');
    $(this).css('-moz-animation', 'unset');
  });

  miscUls.children('li').first().click(() => {
    modal.style.display = 'block';
  });

  $('span.close').click(() => {
    modal.style.display = 'none';
  });

  $(window).click((event) => {
    if (event.target === modal) { modal.style.display = 'none'; }
  });

  $nform.submit((event) => {
    if (validateForm()) {
      alert('Thank you for registering. Visit your profile page for settings.');
      event.preventDefault();
      console.log('Making POST request...');
      $.ajax({
        url: 'http://localhost:8080/newuser',
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        data: JSON.stringify({
          name: $nname.val(),
          pass: $npass.val(),
        }),
        success(response) {
          console.log(response);
        },
        error(jqXHR) {
          console.log(jqXHR);
        },
      });
      console.log('POST request complete.');
    } else alert('Invalid username or password.');
    $(this).focusout();
  });
});




$(function () {

  if (location.href.indexOf("login.html") == -1) {
    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      success: function (info) {
        if (info.error) {
          location.href = "login.html";
        }
      }
    });
  }


  $(document).ajaxStart(function () {
    NProgress.start();
  });
  $(document).ajaxComplete(function () {
    NProgress.done();
  });

  $(".child").prev().on("click", function () {
    $(this).next().slideToggle();
  });

  $(".icon_menu").on("click", function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
  });

  $(".icon_logout").on("click", function () {
    $("#logoutModal").modal('show');
  });

  $(".btn_logout").on("click", function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function (info) {
        //console.log(info);
        if (info.success) {
          location.href = "login.html";
        }
      }
    });

  });


});





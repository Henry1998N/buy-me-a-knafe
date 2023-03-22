$(document).ready(function () {
  $(".animal button").on("click", function () {
    let animal = $(this).siblings("img").attr("alt").toLowerCase();

    $.ajax({
      url: `/animals/${animal}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      success: function (response) {
        alert(response);
      },
      error: function (res, status, error) {
        alert(res.responseText);
        location.href = "/";
      },
    });
  });
});

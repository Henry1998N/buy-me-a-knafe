$(".sign-in-form").on("click", ".cancelbutton", function () {
  window.location.href = "/homepage/index.html";
});

$(".sign-in-form").on("click", "#loginBtn", function () {
  const email = $("#emailInput").val();
  const password = $("#passwordInput").val();
  $.ajax({
    url: "/users/login",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ email, password }),
    success: function (data) {
      localStorage.setItem("token", data.token);
      window.location.href = "/granteeSignedIn/grantee-page.html";
    },
    error: function (error, textStatus, errorThrown) {
      if (error.status === 401) {
        alert("Unauthorized error:", errorThrown);
      } else {
        alert("Request failed:", errorThrown);
      }
    },
  });
});

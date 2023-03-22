// $(".login-btn").on("click", function () {
//   window.location.href = "/sign-in/sign-in.html";
// });

// $(".container").on("click", ".cancelbutton", function () {
//   window.location.href = "/homepage/index.html";
// });

$(".container").on("click", "#loginBtn", function () {
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
      window.location.href = "/homepage/index.html";
    },
    error: function (error, textStatus, errorThrown) {
      if (error.status === 401) {
        console.log("Unauthorized error:", errorThrown);
      } else {
        console.log("Request failed:", errorThrown);
      }
    },
  });
  // $.post("/users/login", { email: email, password: password })
  //   .then((response) => {
  //     window.location.href = `/homepage/index.html`;
  //   })
  //   .catch((err) => {
  //     alert("invalid email or password");
  //     location.reload();
  //   });
});

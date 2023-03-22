$(".signup-btn").on("click", function () {
  window.location.href = "/sign-up/sign-up.html";
});

$(".cancelbtn").on("click", function () {
  window.location.href = "/homepage/index.html";
});

$("form.sign-up-form").on("submit", function () {
  let firstName = $(".f-nameInput").val();
  let lastName = $(".l-nameInput").val();
  let picture = $(".pictureInput").val();
  let description = $(".descriptionInput").val();
  let aboutMe = $(".about-meInput").val();
  let city = $(".cityInput").val();
  let country = $(".countryInput").val();
  let email = $(".emailInput").val();
  let password = $(".passwordInput").val();

  $.post(
    "/signUp",
    {
      firstName: firstName,
      lastName: lastName,
      picture: picture,
      description: description,
      aboutMe: aboutMe,
      city: city,
      country: country,
      balance: 0,
      email: email,
      password: password,
      supporters: [],
    },
    function () {}
  );
});

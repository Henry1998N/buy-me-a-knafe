$(".cancelbtn").on("click", function () {
  window.location.href = "/homepage/index.html";
});

$(".sign-up-form").on("submit", function () {
  let firstName = $(".f-nameInput").val();
  let lastName = $(".l-nameInput").val();
  let picture = $(".pictureInput").val();
  let description = $(".descriptionInput").val();
  let aboutMe = $(".about-meInput").val();
  let city = $(".cityInput").val();
  let country = $(".countryInput").val();
  let email = $(".emailInput").val();
  let password = $(".passwordInput").val();
  let quote = $(".quoteInput").val();

  $.post("/signUp", {
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
    quote: quote,
  }).then(() => {
    window.location.href = `sign-in/sign-in.js`;
  });
});

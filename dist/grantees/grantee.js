class Grantee {
  constructor(id, link, title, description) {
    this.id = id;
    this.link = link;
    this.title = title;
    this.description = description;
  }
}
const KNAFEPRICE = 20;
const renderer = new Renderer();

$(".grantee-profile").on("click", ".amount-form .btn", function () {
  let amount = parseInt($(this).text()) || $(this).closest("input").val();
  $(".submit-btn").text(`Support ${amount * KNAFEPRICE}₪`);
});
$(".grantee-profile").on("input", ".amount-form .number-input", function () {
  let amount = $(this).val();
  $(".submit-btn").text(`Support ${amount * KNAFEPRICE}₪`);
});

const getIdFromUrl = function () {
  const url = window.location.href;
  const id = url.slice(url.indexOf("=") + 1);
  return id;
};

const getGrantee = function (id) {
  $.get(`/grantee?id=${id}`).then((grantee) => {
    renderer.renderGrantee(grantee);
  });
};
const getSupporterDetails = function () {
  let name = $("#supporterName").val();
  let message = $("#SupporterMessage").val();
  console.log(name + " " + message);
};
$(".grantee-profile").on("click", "#supportBtn", function () {
  let supportText = $(this).text();
  if (supportText === "Choose Amount") {
    alert("you must choose amount to support");
    return;
  }
  let amount = supportText.slice(
    supportText.indexOf(" "),
    supportText.length - 1
  );
  amount = parseInt(amount);
  getSupporterDetails();
});
getGrantee(getIdFromUrl());

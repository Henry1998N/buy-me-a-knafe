const { logger } = require("handlebars");

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
const supporters = [];

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
    $.get("/supporters?granteeId=" + id).then((supporters) => {
      renderer.renderSupporters(
        supporters.map((supporter) => {
          return {
            ...supporter,
            date: new Date(supporter.date).toLocaleString(),
          };
        })
      );
    });
  });
};

const getSupporterDetails = function () {
  let name = $("#supporterName").val();
  let message = $("#SupporterMessage").val();
  let newSupporter = { name, message };
  return newSupporter;
};
const castAmount = function (text) {
  let amount = textext.slice(text.indexOf(" "), text.length - 1);
  amount = parseInt(amount);
  return amount;
};
const saveSupporter = function (name, message, amount, picture, granteeId) {
  $.post(`/supporter?granteeId=${granteeId}`, {
    name: name,
    message: message,
    amount: amount,
    picture: picture,
  })
    .then(() => {
      alert(`thanks ${name} for support`);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};
$(".grantee-profile").on("click", "#supportBtn", function () {
  let messageText = $("#SupporterMessage").val();
  let nameInputText = $("#supporterName").val();
  let name = nameInputText.length > 0 ? nameInputText : "Someone";
  let message =
    messageText.length > 0 ? messageText : `${name} has nothing to say`;
  let granteeId = getIdFromUrl();
  let picture =
    "https://static.vecteezy.com/system/resources/previews/007/296/443/original/user-icon-person-icon-client-symbol-profile-icon-vector.jpg";
  let supportText = $(this).text();
  let amount = castAmount(supportText);
  if (amount === 0) {
    alert("Choose Amount.");
    return;
  }
  saveSupporter(name, message, amount, picture, granteeId);
});
getGrantee(getIdFromUrl());

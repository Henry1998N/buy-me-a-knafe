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
const supporters = []

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
    renderer.renderGrantee(grantee)
    $.get("/supporters?granteeId=" + id).then(supporters => {
      console.log(supporters)
      renderer.renderSupporters(supporters)
    })
  })
}


const getSupporterDetails = function () {
  let name = $("#supporterName").val();
  let message = $("#SupporterMessage").val();
  let newSupporter = { name, message };
  return newSupporter;
};
$(".grantee-profile").on("click", "#supportBtn", function () {
  let name;
  let message;
  let granteeId = getIdFromUrl();
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
  let newSupporter = getSupporterDetails();
  if (newSupporter.name == "") {
    name = "Someone";
  } else {
    name = newSupporter.name;
  }
  if (newSupporter.message == "") {
    message = `${newSupporter.name} has nothing to say`;
  } else {
    message = newSupporter.message;
  }
  newSupporter.amount = amount;
  let picture = 
    "https://static.vecteezy.com/system/resources/previews/007/296/443/original/user-icon-person-icon-client-symbol-profile-icon-vector.jpg";
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
});
getGrantee(getIdFromUrl());

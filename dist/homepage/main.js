const renderer = new Renderer();
const apiManager = new APIManager();
let grantees = [];

const savedGrantee = [];

const isGranteeLoggedIn = function () {
  const url = window.location.href;
  const id = url.slice(url.indexOf("=") + 1);
  if (id.includes("http://localhost:3000/")) {
    return false;
  }
  return true;
};
let isLoggedIn = isGranteeLoggedIn();

function ToggleLogin(isLoggedIn) {
  if (isLoggedIn === false) {
    $(".grantees .grantee .save-icon").css("visibility", "hidden");
    $(".navigation-bar .saved-icon").css("visibility", "hidden");

    $(".navigation-bar .login-btn").css("visibility", "visible");
    $(".navigation-bar .signup-btn").text("Sign Up");
  } else {
    $(".grantees .grantee .save-icon").css("visibility", "visible");
    $(".navigation-bar .saved-icon").css("visibility", "visible");
    $(".navigation-bar .login-btn").css("visibility", "hidden");
    $(".navigation-bar .signup-btn").text("Log out");
  }
}
$(".navigation-bar .signup-btn").on("click", function () {
  if (isLoggedIn) {
    ToggleLogin();
    localStorage.clear();
    location.href = `/homepage/index.html`;
    return;
  }

  window.location.href = "/sign-up/sign-up.html";
});

async function topgranteed() {
  let topgranteed = await $.get("/topgranteed?limit=3");
  return topgranteed;
}
async function fetchGrantees() {
  return $.get("/grantees");
}

async function onPageLoad() {
  const granteesFetched = await apiManager.fetchGrantees();
  grantees = granteesFetched.map((grantee) => {
    return { ...grantee, isSaved: false };
  });

  renderer.renderGrantees(grantees);
  ToggleLogin(isLoggedIn);

  let topGrandeed = await topgranteed();
  let checkedTopGrandeed = [];
  topGrandeed.forEach((grandee) => {
    if (grandee.supporters.length > 0) {
      checkedTopGrandeed.push(grandee);
    }
  });

  renderer.renderTopGrandeed(checkedTopGrandeed);
}
$(".buttons").on("click", ".login-btn", function () {
  window.location.href = `/sign-in/sign-in.html`;
});

onPageLoad();

$(".grantees").on("click", ".grantee img", function () {
  const id = $(this).parent().data().id;
  window.location.href = `/grantees/grantee-page.html?id=${id}`;
});
$(".topgranteed").on("click", ".grantee", function () {
  const id = $(this).data().id;
  window.location.href = `/grantees/grantee-page.html?id=${id}`;
});

function toggleGranteeIsSaved(id) {
  const savedGranteeIndex = grantees.findIndex((grantee) => grantee._id === id);
  const isSaved = grantees[savedGranteeIndex].isSaved;
  grantees[savedGranteeIndex] = {
    ...grantees[savedGranteeIndex],
    isSaved: !isSaved,
  };
}

$(".grantees").on("click", ".grantee .save-icon", function () {
  const id = $(this).parent().data().id;
  toggleGranteeIsSaved(id);
  const url = window.location.href;
  const granteeId = url.slice(url.indexOf("=") + 1);
  $.post(`/favoriteGrantees/${granteeId}`, { id });
  renderer.renderGrantees(grantees);
  ToggleLogin(isLoggedIn);
});

$(".saved-grantees").on("click", ".saved-grantee .save-icon", function () {
  const id = $(this).parent().data().id;
  savedGrantee.push(...savedGrantees);
  toggleGranteeIsSaved(id);
  renderer.renderGrantees(grantees);
  const savedGrantees = grantees.filter((grantee) => grantee.isSaved === true);

  renderer.renderSavedGrantees(savedGrantees);
  if (savedGrantees.length === 0) {
    $(".saved-grantees-modal").css("visibility", "hidden");
    return;
  }
});

$(".navigation-bar .saved-icon").on("click", function () {
  // const savedGrantees = grantees.filter((grantee) => grantee.isSaved === true);
  // if (savedGrantees.length === 0) {
  //   alert("No Saved Grantees");
  //   return;
  // }

  // savedGrantee.push(...savedGrantees);
  const url = window.location.href;
  const id = url.slice(url.indexOf("=") + 1);
  $.get(`/getAllFavorites/${id}`).then((favGrantees) => {
    console.log(favGrantees[0].favorite);
    renderer.renderSavedGrantees(favGrantees[0].favorite);
    $(".saved-grantees-modal").css("visibility", "visible");
  });
});

$(".saved-grantees .close-btn").on("click", function () {
  $(".saved-grantees-modal").css("visibility", "hidden");
});

$(".saved-grantees-modal").on("click", function (event) {
  if (event.target.className === "saved-grantees-modal")
    $(".saved-grantees-modal").css("visibility", "hidden");
});

$("form.recipience-form").on("submit", function (event) {
  event.preventDefault();
  const recipienceLink = $(this)[0][0].value;
  const recipienceTitle = $(this)[0][2].value;
  const recipienceAbout = $(this)[0][3].value;

  $(this)[0][0].value = "";
  $(this)[0][2].value = "";
  $(this)[0][3].value = "";
});

const spin = function () {
  const url = window.location.href;
  const id = url.slice(url.indexOf("=") + 1);
  window.location.href = `/wheel/wheel.html?id=${id}`;
};

$("#btn").on("click", function () {
  window.location.href = "/homepage/wheel.html";
});

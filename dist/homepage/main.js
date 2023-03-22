const renderer = new Renderer();
//const apiManager = new APIManager();
let recipiences = [];


async function fetchGrantees() {
  return $.get("/grantees");
}
async function topgranteed() {
  let topgranteed = await $.get("/topgranteed?limit=3");
  return topgranteed;
}

async function onPageLoad() {
  const granteesFetched = await apiManager.fetchGrantees();
  grantees = granteesFetched.map(grantee => {
    return {...grantee, isSaved: false}
  })
  renderer.renderGrantees(grantees);
  let topGrandeed = await topgranteed();
  renderer.renderTopGrandeed(topGrandeed);
}

onPageLoad();

$(".grantees").on("click", ".grantee img", function () {
  const id = $(this).parent().data().id;
  window.location.href = `/grantees/grantee-page.html?id=${id}`;
});
$(".topgranteed").on("click", ".grantee", function () {
  const id = $(this).data().id;
  window.location.href = `/grantees/grantee-page.html?id=${id}`;
});

function toggleGranteeIsSaved(id){
  const savedGranteeIndex = grantees.findIndex(grantee => grantee._id === id)
  const isSaved = grantees[savedGranteeIndex].isSaved
  grantees[savedGranteeIndex] = {...grantees[savedGranteeIndex], isSaved: !isSaved}
}

$(".grantees").on("click", ".grantee .save-icon", function () {
  const id = $(this).parent().data().id
  toggleGranteeIsSaved(id)
  renderer.renderGrantees(grantees);
})

$(".saved-grantees").on("click", ".saved-grantee .save-icon", function () {
  const id = $(this).parent().data().id
  toggleGranteeIsSaved(id)
  renderer.renderGrantees(grantees);
  const savedGrantees = grantees.filter(grantee => grantee.isSaved === true)

  renderer.renderSavedGrantees(savedGrantees)
  if(savedGrantees.length === 0){
    $(".saved-grantees-modal").css('visibility', 'hidden')
    return
  }
})

$(".navigation-bar .saved-icon").on("click", function () {
  const savedGrantees = grantees.filter(grantee => grantee.isSaved === true)
  if(savedGrantees.length === 0){
    alert("No Saved Grantees")
    return
  }
  renderer.renderSavedGrantees(savedGrantees)
  $(".saved-grantees-modal").css('visibility', 'visible')
})

$(".saved-grantees .close-btn").on("click", function () {
  $(".saved-grantees-modal").css('visibility', 'hidden')
})

$(".saved-grantees-modal").on("click", function (event) {
  if(event.target.className === 'saved-grantees-modal')
    $(".saved-grantees-modal").css('visibility', 'hidden')
})

$("form.recipience-form").on("submit", function (event) {
  event.preventDefault();
  const recipienceLink = $(this)[0][0].value;
  const recipienceTitle = $(this)[0][2].value;
  const recipienceAbout = $(this)[0][3].value;

  $(this)[0][0].value = "";
  $(this)[0][2].value = "";
  $(this)[0][3].value = "";
});

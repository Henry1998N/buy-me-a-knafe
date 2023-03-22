const renderer = new Renderer();
let granteeId;

const getGrantee = async function (id) {
  $.get(`/grantee?id=${id}`).then((grantee) => {
    console.log(grantee);
    renderer.renderGranteeProfile(grantee);
  });
};
$(document).ready(function () {
  $.ajax({
    url: `/granteeProfile`,
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: function (response) {
      alert(`hello  ${response.name}`);
      getGrantee(response.id);
      granteeId = response.id;
    },
    error: function (res, status, error) {
      alert(res.responseText);
      location.href = "/";
    },
  });
});
$(".grantee-Profile").on("click", ".userDonate", function () {
  window.location.href = `/homepage/index.html?id=${granteeId}`;
  // alert(granteeId);
});

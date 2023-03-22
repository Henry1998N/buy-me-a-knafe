$(document).ready(function () {
  $.ajax({
    url: `/granteeProfile`,
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: function (response) {
      alert(`hello  ${response.name}`);
    },
    error: function (res, status, error) {
      alert(res.responseText);
      location.href = "/";
    },
  });
});

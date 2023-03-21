
class Grantee {
  constructor(id, link, title, description) {
  this.id = id;
  this.link = link;
  this.title = title;
  this.description = description;
  }
}
const KNAFEPRICE = 20

$('.amount-form').on('click', ".btn" , function(){
  let amount = parseInt($(this).text());
  $('.submit-btn').text(`Support ${amount * KNAFEPRICE}₪`);
})

class Renderer {
  constructor() {}

  handleBarHelper(sourceSelectorName, templateObject, selectorNameToAppend) {
    const source = $(sourceSelectorName).html();
    const template = Handlebars.compile(source);
    let newHTML = template(templateObject);
    $(selectorNameToAppend).empty().append(newHTML);
  }

  renderGrantees(grantees) {
    this.handleBarHelper("#grantees-template", { grantees }, ".grantees");
  }
  renderGrantee(grantee) {
    this.handleBarHelper("#grantee-template", grantee, ".grantee-profile");
  }
  renderSavedGrantees(grantees) {
    this.handleBarHelper("#saved-grantees-template", { grantees }, ".saved-grantees");
  }
  renderSupporters(supporters) {
    this.handleBarHelper("#supporters-template", { supporters }, ".supporters");
  }
  renderTopGrandeed(topGrandeed) {
    this.handleBarHelper(
      "#topgranteed-template",
      { topGrandeed },
      ".topgranteed"
    );
  }
}

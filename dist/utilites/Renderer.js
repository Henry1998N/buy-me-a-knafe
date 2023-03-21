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
}

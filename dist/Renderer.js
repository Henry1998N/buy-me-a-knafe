class Renderer {
    handleBarHelper(sourceSelectorName, templateObject, selectorNameToAppend){
        const source = $(sourceSelectorName).html();
        const template = Handlebars.compile(source);
        let newHTML = template(templateObject);
        $(selectorNameToAppend).empty().append(newHTML); 
    }

    renderCities(cities) {
        this.handleBarHelper('#cities-template', {cities}, '.cities')
    }
}
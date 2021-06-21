

function metaData(metaObj) {
    d3.json('../data/samples.json').then(metaObj => {
        var panel = d3.select("#sample-metadata");

        panel.html("");
        Object.entries(metaObj).forEach(([key, value]) => {(`${key}:${value}`);
            panel.append("h6").text
        })
    })
};




function init() {
    var htmlElement = d3.select("#selDataset");
    d3.json('../data/samples.json').then((nameObj) => {
        names = nameObj.names
        names.forEach((listItem) => {
            htmlElement
                .append('option')
                .text(listItem)
                .property("value", listItem)
            console.log(htmlElement)
        });
        const sampleNameObject = nameObj[0]
        console.log(sampleNameObject)
        metaData(sampleNameObject);
    })
};
init();



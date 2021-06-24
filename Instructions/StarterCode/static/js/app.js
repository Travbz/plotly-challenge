
// fetch data, return promise, reference html element, clear existing data, enter and append keys and values to html element
function metadata(metaSample) {
    d3.json('../data/samples.json').then((data) => {
        var metadata = data.metadata;
        var filteredData = metadata.filter(row => row.id == metaSample);
        console.log(filteredData);
        var resultArray = filteredData[0];
        var metadisplay = d3.select("#sample-metadata");
        metadisplay.html('');
        Object.entries(resultArray).forEach(([key, value]) => {
            metadisplay.append('h6').text(`${key} ${value}`);
        });
    });
}

function barChart(samplesObj) {
    d3.json('../data/samples.json').then((data) => {
        var samples = data.samples;
        var id = samples.filter(row => row.id == samplesObj);
        var otuLabels = id[0].otu_ids;
        var xValues = id[0].sample_values;
        var hoverText = id[0].otu_labels;
        console.log(otuLabels, xValues, hoverText);
        var bar = {
            y: otuLabels.slice(0,10),
            x: xValues.slice(0,10),
            type: 'bar',
            text: hoverText.slice(0,10),
            orientation: 'h'
        };
        var barLayout = {
            title: "Top 10 Bacteria Found in Chosen Sample ID",
            yaxis: {title: 'Bacteria ID'},
            xaxis: {title: 'Frequency'}
        };
        Plotly.newPlot('bar', [bar], barLayout);
})

}


function init() {
    var subjectID = d3.select("#selDataset");
    d3.json('../data/samples.json').then((data) => {
        var names = data.names
        names.forEach((listItem) => {
            subjectID
                .append('option')
                .text(listItem)
                .property("value", listItem)
        });
        const nameSample = names[0];
        console.log(nameSample);
        metadata(nameSample);
        barChart(nameSample)
    })
};
function optionChanged(selectedID) {
    metadata(selectedID)
    barChart(selectedID)
}

init();



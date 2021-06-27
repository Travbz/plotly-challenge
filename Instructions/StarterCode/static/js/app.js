
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
        var otuLabels = id[0].otu_ids.sort((a,b)=>b-a).slice(0,10);
        var values = id[0].sample_values.sort((a,b)=>b-a).slice(0,10).map(otuID =>`otu${otuID}`);
        var hoverText = id[0].otu_labels;
        console.log(otuLabels, values, hoverText);
        var bar = {
            x: otuLabels.reverse(),
            y: values,
            type: 'bar',
            text: hoverText,
            orientation: 'h'
        };
        var barLayout = {
            title: "Top 10 Bacteria Found in Chosen Sample ID",
            yaxis: {title: 'Bacteria ID'},
            margin:{t:30,l:110},
            xaxis: {title: 'Frequency'}
        };
        var bubbs = {
            x: otuLabels,
            y: values,
            text: hoverText,
            mode: 'markers',
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(255, 127, 0)', 'rgb(255, 219, 0)', 'rgb(87, 219, 0)', 'rgb(87, 219, 209)', 'rgb(87, 94, 209)', 'rgb(252, 94, 209)'],
                opacity: [1, 0.8, 0.6, 0.4],
                size: [25, 35, 45, 55, 65, 75, 85, 95, 105, 115]
            }
        };
        var bubbleLayout= {
            title: 'Bacteria found in selected sample ID',
            showlegend: false, 
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(255, 127, 0)', 'rgb(255, 219, 0)', 'rgb(87, 219, 0)', 'rgb(87, 219, 209)', 'rgb(87, 94, 209)', 'rgb(252, 94, 209)'],
            opacity: [1, 0.8, 0.6, 0.4],
            size: [25, 35, 45, 55, 65, 75, 85, 95, 105, 115]
        };
        Plotly.newPlot('bubble',[bubbs], bubbleLayout);
        Plotly.newPlot('bar', [bar], barLayout);
});
};


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



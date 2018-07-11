function setup(){
}

function process(){
    var graphData = JSON.parse(rawData);
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var InputType1 = document.getElementById("InputType1").checked;
    var InputType2 = document.getElementById("InputType2").checked;
    var OutputType1 = document.getElementById("OutputType1").checked;
    if (!InputType1)
        input1=input1*0.3048;
    if (!InputType2)
        input2=input2*0.45359237;
    var input = input1/Math.pow(input2,(1/3));

    var target=findPoint(graphData,input);

    console.log(input,target[0],target[1]);
    var outputData=[graphData[target[0]].Pr2,graphData[target[0]].Pso2,graphData[target[0]].Ir2,graphData[target[0]].Is2,graphData[target[0]].ta2,graphData[target[0]].to2,graphData[target[0]].U2,graphData[target[0]].Lw2];
    //outputData.sort(sortFunction);
    //Chart1(transposeJSON(graphData),target[0]);

    //var ctx = document.getElementById("chart_div");
    //var Chart1 = new Chart(ctx, {
    //    type: 'line',
    //    data: graphData
    //});

    present(outputData);
}

function present(outputData){
    document.getElementById("result1.1").innerHTML = "Pr: " + outputData[0]+ " psi";
    document.getElementById("result1.2").innerHTML = "Pso: " + outputData[1] + " psi";
    document.getElementById("result2.1").innerHTML = "Ir: " + outputData[2] + " psi-ms/lb^(1/3)";
    document.getElementById("result2.2").innerHTML = "Is: " + outputData[3] + " psi-ms/lb^(1/3)";
    document.getElementById("result3.1").innerHTML = "ta: " + outputData[4] + " ms/lb^(1/3)";
    document.getElementById("result3.2").innerHTML = "to: " + outputData[5] + " ms/lb^(1/3)";
    document.getElementById("result4.1").innerHTML = "U: " + outputData[6] + " ft/ms";
    document.getElementById("result4.2").innerHTML = "Lw: " + outputData[7] + " ft/lb^(1/3)";
}

function findPoint(graphData,input){
    var target=[-1,-1];
    for(i=0;i<graphData.length;i++)
    {
        console.log(input,parseFloat(graphData[i].Z.replace(',','.')),graphData[i].Z)
        if(input>parseFloat(graphData[i].Z)){
            target[0] = i;
            target[1] = i+1;
        }
        if(input==parseFloat(graphData[i].Z)){
            target[0] = i;
            target[1] = i;
        }
    }
    if(target[1]>=graphData.length)target[1]=i;
    return target;
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function transposeJSON(graphData){
    var data=[[]];
    for(i=0;i<graphData.length;i++){
        data[i][0]=graphData[i].Z;
        data[i][1]=graphData[i].Ir2;
        data[i][2]=graphData[i].Is2;
        data[i][3]=graphData[i].Lw2;
        data[i][4]=graphData[i].Pr2;
        data[i][5]=graphData[i].Pso2;
        data[i][6]=graphData[i].ta2;
        data[i][7]=graphData[i].to2;
        data[i][8]=graphData[i].U2;
    }
    return data;
}

function Chart1(graphData,row){
    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawCrosshairs);
    function drawCrosshairs() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Z');
        data.addColumn('number', 'Pr, psi');
        data.addColumn('number', 'Pso, psi');
        data.addColumn('number', 'Ir, psi-ms/lb^(1/3)');
        data.addColumn('number', 'Is, psi-ms/lb^(1/3)');
        data.addColumn('number', 'ta, ms/lb^(1/3)');
        data.addColumn('number', 'to, ms/lb^(1/3)');
        data.addColumn('number', 'U, ft/ms');
        data.addColumn('number', 'Lw, ft/lb^(1/3)');

        data.addRows(graphData);

        var options = {
            hAxis: {
                title: 'Z',
                logScale: 'true'
            },
            vAxis: {
                logScale: 'true'
            },
            crosshair: {
                color: '#000',
                trigger: 'selection'
            },
            width: '100%',
            height: 800,
            interpolateNulls: true,
            selectionMode: 'multiple'
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
        chart.setSelection([{row: row}]);

    }
}

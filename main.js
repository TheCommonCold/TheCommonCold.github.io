var input1;
var input2;

function setup(){
}

function process(){
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
    console.log(input);
    var test=[[0,1],[1,1],[2,3]];
    var outputData=[interpolate(input,1,graphData1),interpolate(input,2,graphData1),interpolate(input,3,graphData1),interpolate(input,4,graphData1),interpolate(input,5,graphData1),interpolate(input,6,graphData1),interpolate(input,7,graphData1),interpolate(input,8,graphData1)];
    console.log(interpolate(input,1,graphData1));
    outputData.sort(sortFunction);
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

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }


function interpolate(x,which, graph){
    var sumResult=0;

    for(var i=0;i<graph.length;i++){
        var multiplicationResult=1;
        if(graph[i][which]!=null)
        {
            for(var j=0;j<graph.length;j++) {
                if (j != i && graph[j][which]!=null) {
                    multiplicationResult *= (x - graph[j][0]) / (graph[i][0] - graph[j][0]);
                }
            }
            multiplicationResult*=graph[i][which];
            sumResult+=multiplicationResult;
            console.log(sumResult);
        }
    }
    return sumResult;
}

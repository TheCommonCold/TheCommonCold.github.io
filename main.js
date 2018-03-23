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
    interpolate(1.3,);
}

function present(targetA,targetB){
    document.getElementById("result1.1").innerHTML = "Pr: " + GraphData2[targetA][1]+ " psi";
    document.getElementById("result1.2").innerHTML = "Pso: " +GraphData2[targetA][2]+ " psi";
    document.getElementById("result2.1").innerHTML = "Ir: " + GraphData2[targetA][3] + " psi-ms/lb^(1/3)";
    document.getElementById("result2.2").innerHTML = "Is: " +GraphData2[targetA][4]+ " psi-ms/lb^(1/3)";
    document.getElementById("result3.1").innerHTML = "ta: " + GraphData2[targetA][5] + " ms/lb^(1/3)";
    document.getElementById("result3.2").innerHTML = "to: " +GraphData2[targetA][6] + " ms/lb^(1/3)";
    document.getElementById("result4.1").innerHTML = "U: " + GraphData2[targetB][7] + " ft/ms";
    document.getElementById("result4.2").innerHTML = "Lw: " +GraphData2[targetB][8] + " ft/lb^(1/3)";
}

function interpolate(x, graph){
    var sumResult=0;
    for(var i=0;i<graph.length;i++){
        var multiplicationResult=1;
        for(var j=0;j<graph.length;j++) {
            if (j != i) {
                multiplicationResult *= (x - j) / (i - j);
            }
        }
        multiplicationResult*=graph[i];
        sumResult+=multiplicationResult;
    }
    return sumResult;
}

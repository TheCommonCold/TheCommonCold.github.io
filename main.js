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
    var targetA=-1,targetB=-1;
    for(i=0;i<GraphData2.length;i++)
    {
        if(input<GraphData2[i][0] && GraphData2[i][1]!=null){
            console.log(GraphData2[i][0]);
            targetA = i;
        }
        if(input<GraphData2[i][0] && GraphData2[i][7]!=null){
            console.log(GraphData2[i][0]);
            targetB = i;
        }
        if(targetA!=-1 && targetB!=-1)
        {
            break;
        }
    }
    Chart1(targetA,targetB);
    present(targetA,targetB);
    bfinder(input2,GraphData2[targetA][1],GraphData2[targetA][2],GraphData2[targetA][4],GraphData2[targetA][5],GraphData2[targetA][6]);
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

function interpolate(a,b,target){
    return a + (((target - a)/(b - a)) * (b - a));
}

function Chart1(rowA,rowB){
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

        data.addRows(GraphData2);

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
        chart.setSelection([{row: rowA},{row: rowB}]);

    }
}

function bfinder(m,Pr,Pso,Is,ta,to){
    var b1=0;
    var b2=9.9;
    var proximity=0.00001;
    var Po=14.69595;
    var plot=integral((b2+b1)/2,Pso,Po,ta,to,proximity);
    Is = 686870;
    Pso = 6473233.7;

    console.log(Is*Math.pow(m,(1/3)));
    //console.log(equationtest(0),equationtest(2));
    //console.log(integraltest(0,2,proximity));
    console.log(equation(ta, 1, Pso-Po, ta/1000, to/1000)+Po);
    //console.log(((Pso*to)/Math.pow(1,2))*(1-1+Math.pow(Math.E,-1)));
    //console.log(integral(b1,Pso-Po,ta,to,proximity));
    console.log(integral(b2,Pso-Po,ta/1000,to/1000,proximity));
    //integral (from 0.017 to 0.017+15.351) (50.023-14.69595)*(1-((t-0.017)/15.351))*(E^(-9.9*((t-0.017)/15.351))) dt
}

function bfinder2(Pr,Pso,Is,ta,to){
    var b1=0.000000001;
    var b2=200;
    var proximity=1;
    var Po=1013.25;
    var plot=integral((b2+b1)/2,Pso,Po,ta,to,proximity);
    while(Math.abs(Is-plot)>1){
        plot=integral((b2+b1)/2,Pso,Po,ta,to,proximity);
        if(Is<plot){
            b1=(b2+b1)/2;
        }else{
            b2=(b2+b1)/2;
        }
        console.log(Is);
        console.log(plot,b1,b2);
    }
}

function integral(b,Pso,ta,to,proximity){
    var result=0;
    for(t=ta;t<ta+to-proximity;t=t+proximity) {
        result = result + (((equation(t, b, Pso, ta, to)+ equation(t + proximity, b, Pso, ta, to)) * proximity) / 2);
    }
    return result;
}

function equation(t,b,Pso,ta,to){
    return (Pso*(1-((t-ta)/to))*Math.pow(Math.E,(-b*((t-ta)/to))));
}

function integraltest(a,b,proximity) {
    var result = 0;
    for (t = a; t < a + b - proximity; t = t + proximity) {
        result = result + (((equationtest(t) + equationtest(t + proximity)) * proximity) / 2);
    }
    return result;
}

function equationtest(x){
    return Math.pow(x,2);
}

function PointCreator(Pr,Pso,Is,ta,to){
    var Ps=[[]];
    ps[0][0]=ta;
    ps[0][1]=Pso;
    ps[0][2]=Pr;
    ps[100][0]=to;
    ps[100][1]=0;
    ps[100][2]=0;
    var step = to/100;
    for (t=ta;t<to;t=t+step){

    }
}

function Chart2(Pr,Pso,Is,ta,to){
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2013',  1000,      400],
        ['2014',  1170,      460],
        ['2015',  660,       1120],
        ['2016',  1030,      540]
    ]);
    var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
}
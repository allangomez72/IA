async function fit_predict_draw() {
    const { LinearRegression, joinArrays } = await import('https://luisespino.github.io/mlearnjs/mlearn.mjs');

    const myLinearRegression = await LinearRegression();
    const model = new myLinearRegression();

    const X = [2.760, 0.736, 36.322, 1.654, 28.852, 1.423, 9.417, 0.524, 10.065]; // hombres
    const y = [6.120, 0.595, 51.216, 0.670, 9.511, 0.415, 27.385, 0.863, 13.240]; // mujeres

    model.fit(X, y);

    yPredict = model.predict(X)

    const myjoinArrays = await joinArrays();
    const arr = myjoinArrays('x', X, 'y', y, 'yPredict', yPredict);

    const log = document.getElementById('log');
    const yPred = yPredict.map(num => parseFloat(num.toFixed(2)));
    const mse = model.mse(y, yPredict);
    const r2 = model.r2(y, yPredict);
    log.innerHTML = 'X: '+X+'<br>y: '+y+'<br>yPredict: '+yPred;
    log.innerHTML += '<br>MSE: '+mse+'<br>R2: '+r2;

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(arr);
        var options = {
            series: {
                0: {type: 'scatter'},
                1: {type: 'line'}}
        };
        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

fit_predict_draw();

function draw(id, option) {
    let chartDom = document.getElementById(id);
    let chart = echarts.init(chartDom);
    option && chart.setOption(option);
}
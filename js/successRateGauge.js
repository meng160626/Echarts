// 获取成功率仪表盘配置属性
function getSuccessGaugeOption(data, color1, color2) {
    return {
        title: {
            text: data + '%',
            x: 'center',
            y: 'center',
            textStyle: {
                fontSize: 24,
                fontFamily: 'PangMenZhengDao',
                color: '#65d3ff',
            },
        },
        series: [
            // 充当边框的仪表盘
            {
                type: 'gauge',          // 仪表盘
                radius: '98%',          // 半径
                startAngle: '90',       // 起始角度（0为3点钟方向 90为12点钟方向）
                endAngle: '-270',
                axisLine: {             // 仪表盘轴线
                    show: true,
                    lineStyle: {
                        color: [
                            [0.01, "rgba(0,0,0,0)"],                // 这里配置0.01 指的是整个轴线0-0.01的线段
                            [(data + 1) / 100, color1],             // 这里配置data + 1 指的是整个轴线0-data + 1的线段
                            [(data + 2) / 100, "rgba(0,0,0,0)"],    // ~
                            [1, '#9e9e9e'],                         // ~
                        ],
                        width: 3,                                   // 轴线宽度
                    },
                },
                axisTick: {         // 刻度
                    show: false,
                },
                splitLine: {        // 分割线
                    show: false,
                },
                axisLabel: {        // 刻度标签
                    show: false,
                },
            },
            // 仪表盘
            {
                type: 'gauge',
                radius: '100%',
                clockwise: true,            // 仪表盘刻度是否是顺时针增长
                startAngle: '90',
                endAngle: '-270',
                splitNumber: 10,            // 仪表盘刻度的分割段数
                pointer: {                  // 仪表盘指针
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: [
                            [0.01, "rgba(0,0,0,0)"],
                            [(data + 1) / 100, color2],
                            [(data + 2) / 100, "rgba(0,0,0,0)"],
                            [1, 'rgba(158, 158, 158, .2)'],
                        ],
                        width: 15,
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
            },
        ],
    };
}
// 绘制成功率仪表盘
function drawVoiceSuccessGauge(data) {
    let chartDom = document.getElementById('successRate');
    let option = getSuccessGaugeOption(data, '#2cf0ff', 'rgb(44, 240, 255, .4)');
    let chart = echarts.init(chartDom);
    option && chart.setOption(option);
}

window.onload = () => {
    drawVoiceSuccessGauge(45);
}
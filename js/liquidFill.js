/**
 * 获取水球图配置
 * @param data 
 */
function getLiquidFillOption(data) {
    return {
        series: [
            {
                type: 'liquidFill',
                radius: '80%', // 控制中间圆球的尺寸
                center: ['50%', '50%'],
                data: [ // data个数代表波浪数
                    {
                        value: data,
                        direction: 'right' //波浪方向
                    },
                    {
                        value: data,
                        direction: 'left',
                    },
                ],
                backgroundStyle: {
                    borderWidth: 0,
                    color: 'rgba(62, 208, 255, 1)', // 球体本景色
                },
                amplitude: '0%', //波浪的振幅
                // 修改波浪颜色 每个波浪不同颜色，颜色数组长度为对应的波浪个数
                color: [
                    {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 1,
                                color: '#6CDEFC',
                            },
                            {
                                offset: 0,
                                color: '#429BF7',
                            },
                        ],
                        globalCoord: false,
                    },
                ],
                label: {
                    normal: {
                        formatter: data * 100 + '{d|%}',
                        rich: {
                            d: {
                                fontSize: 36,
                                padding: [0,0,0,10]
                            },
                        },
                        textStyle: {
                            fontSize: 48,
                            color: '#fff',
                        },
                    },
                },
                outline: {
                    show: false,
                },
            },
            {
                type: 'pie',
                z: 1,
                center: ['50%', '50%'],
                radius: ['82%', '83.5%'], // 控制外圈圆的粗细
                hoverAnimation: false,
                data: [
                    {
                        name: '',
                        value: 500,
                        labelLine: {
                            show: false,
                        },
                        itemStyle: {
                            color: '#00AFFF',
                        },
                        emphasis: {
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: '#00AFFF',
                            },
                        },
                    },
                ],
            },
            {
                //外发光
                type: 'pie',
                z: 1,
                zlevel: -1,
                radius: ['70%', '90%'],
                center: ['50%', '50%'],
                hoverAnimation: false,
                clockWise: false,
                itemStyle: {
                    normal: {
                        borderWidth: 20,
                        color: 'rgba(112,115,116,.4)',
                    },
                },
                label: {
                    show: false,
                },
                data: [100],
            },
            {
                //底层外发光
                type: 'pie',
                z: 1,
                zlevel: -2,
                radius: ['80%', '100%'],
                center: ['50%', '50%'],
                hoverAnimation: false,
                clockWise: false,
                itemStyle: {
                    normal: {
                        borderWidth: 20,
                        color: 'rgba(112,115,116,.2)',
                    },
                },
                label: {
                    show: false,
                },
                data: [100],
            },
        ],
    };
}

/**
 * 绘制动态水球图
 * @param data 
 */
function drawLiquidFill(data) {
    let chartDom = document.getElementById('liquidFill');
    let option = getLiquidFillOption(data);
    let chart = echarts.init(chartDom);
    option && chart.setOption(option);
    let id;

    // 设置鼠标进入事件
    chartDom.addEventListener("mouseover", () => {
        clearInterval(id);
        id = setInterval(() => {
            let option = chart.getOption();
            let amplitudeProp = option.series[0].amplitude;
            let amplitude = parseInt(amplitudeProp.substring(0, amplitudeProp.indexOf('%')));
            if (amplitude === 10) {
                clearInterval(id);
                return;
            }
            option.series[0].amplitude = amplitude + 1 + '%';
            chart.setOption(option);
        }, 200);
    });
    // 设置鼠标移出事件
    chartDom.addEventListener("mouseout", () => {
        clearInterval(id);
        id = setInterval(() => {
            let option = chart.getOption();
            let amplitudeProp = option.series[0].amplitude;
            let amplitude = parseInt(amplitudeProp.substring(0, amplitudeProp.indexOf('%')));
            if (amplitude === 0) {
                clearInterval(id);
                return;
            }
            option.series[0].amplitude = amplitude - 1 + '%';
            chart.setOption(option);
        }, 200);
    });
}

drawLiquidFill(0.5);
/**
 * 获取百分比仪表盘配置属性
 * @param {*} data 数据
 * @param {*} color1 外圈边框颜色
 * @param {*} color2 内圈0.9处颜色
 * @param {*} color3 内圈0.6处颜色
 * @param {*} color4 仪表盘右侧颜色
 * @param {*} color5 仪表盘左侧颜色
 * @returns 
 */
function getPercentPieGaugeOption(data, color1, color2, color3, color4, color5) {
    return {
        title: {
            text: data + '%',
            x: 'center',
            y: '35%',
            textStyle: {
                fontSize: 48,
                fontFamily: 'DSDigitalBold',
                color: '#1de3e6'
            },
            subtext: '百分率',                          // 子文本
            subtextStyle: {
                color: '#fff',
                fontSize: 32,
                fontFamily: 'dsdigitalbold',
                fontWeight: '700',
            }
        },
        tooltip: {
            triggerOn: 'none'
        },
        series: [
            // 外圈边框
            {
                type: 'pie',
                radius: ['97%', '100%'],
                data: [{ value: 1, itemStyle: { color: color1 } }],
                emphasis: {
                    scale: false
                }
            },
            // 内圈渐变区
            {
                type: 'pie',
                radius: ['0', '93%'],
                z: 1,
                emphasis: {
                    scale: false
                },
                data: [
                    {
                        value: 1,
                        itemStyle: {
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: color3
                                }, {
                                    offset: 0.6, color: color3
                                }, {
                                    offset: 0.9, color: color2
                                }, {
                                    offset: 1, color: color1
                                }],
                            }
                        }
                    }
                ],
            },
            {
                type: 'gauge',
                radius: '93%',
                splitNumber: 3,
                z: 2,
                startAngle: 90,
                endAngle: -270,
                splitLine: {
                    show: false
                },
                // 指针 这里为了动态显示提示浮窗 隐藏了指针
                pointer: {
                    show: true,
                    itemStyle: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                // 动态提示浮窗 需要添加data属性
                data: [
                    {
                        value: data,
                        detail: {
                            show: false
                        }
                    }
                ],
                tooltip: {
                    formatter: () => '成功了' + data + '条'
                },
                // 仪表盘的线，颜色值为一个数组
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 10,
                        color: [
                            [
                                data / 100,
                                {
                                    x: 0,
                                    y: 0,
                                    x1: 0,
                                    y1: 0,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: color4
                                        },
                                        {
                                            offset: 1,
                                            color: color5
                                        }
                                    ]
                                }
                            ],
                            [1, "rgba(0,0,0,0)"]
                        ]
                    }
                },
                // 仪表盘刻度标签
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: true,
                    distance: -5,
                    lineStyle: {
                        color: "rgba(0,0,0,.8)",
                        width: 3
                    },
                    length: 5
                }
            }
        ]
    }
}
// 绘制百分比仪表盘
function drawPercentPieGauge(data) {
    let chartDom = document.getElementById('percentPieGauge');
    let option = getPercentPieGaugeOption(46, 'rgba(29, 227, 230, .7)', 'rgba(29, 227, 230, .3)', 'rgba(29, 227, 230, 0)', 'rgba(88, 194, 145, 1)', 'rgba(29, 227, 229, 1)');
    let chart = echarts.init(chartDom);
    option && chart.setOption(option);

    // 设置鼠标进入事件 点击dom时，显示提示浮窗
    chartDom.addEventListener("mouseenter", () => {
        // 这里因为仪表盘的浮窗是添加在指针上的，所以没有指针时，浮窗显示无效
        // 解决方式：添加一个指针，并且设置为透明色
        chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 2,
            dataIndex: 0,
        });
    });
    chartDom.addEventListener("mouseleave", () => {
        chart.dispatchAction({
            type: 'hideTip',
        });
    });
}

drawPercentPieGauge();
// 绘制事件位置统计柱状图
function getBarOption(data) {
    // 根据数据量动态改变柱体宽度（柱子过多时，需要手动调整部分内容高度及y坐标）
    let barWidth = 470 / data.length * 0.7;
    if (barWidth > 66) barWidth = 66;
    // 获取自适应的y轴数据
    let yData = getSelfAdaptionYData(data);
    return option = {
        grid: {             // 直角坐标系内绘图网格
            top: '20%',
            left: '10%',
            right: '3%',
            bottom: '20%',
        },
        xAxis: [
            // 下方轴线用于显示数据类别名称
            {
                offset: 20,         // 位置偏移量
                data: data.map(item => item.name),
                axisTick: {         // 坐标轴刻度
                    show: false,
                },
                axisLine: {         // 坐标轴轴线
                    show: false,
                },
                axisLabel: {        // 坐标轴刻度标签
                    textStyle: {
                        color: '#B8EEFF',
                        fontSize: 16,
                    },
                },
            },
            // 上方轴线用于显示数据值
            {
                data: data.map(item => item.value),
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#43D1FE',
                        fontSize: 16,
                    },
                },
            }
        ],
        yAxis: {
            max: yData.max,
            interval: yData.interval,
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FBFEFF'
                }
            },
        },
        series:[
            // 柱体底座
            {
               stack: 'a',
               type: 'effectScatter',
               symbolSize: [barWidth, 12],
               symbolOffset: [0, 0],
               z: 22,
               itemStyle: {
                   normal: {
                       color: function (params) {
                           return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                               {
                                   offset: 1,
                                   color: 'rgba(107, 255, 243,  1)',
                               },
                               {
                                   offset: 0,
                                   color: 'rgba(8, 177, 255, 1)',
                               },
                           ]);
                       },
                   },
               },
               data: data.map(item => {return {value: 0}}),
            },
            // 数据柱状图
            {
                name: '数据柱状图',
                stack: 'a',
                type: 'bar',
                barWidth: barWidth,
                z: 2,
                barGap: '-100%',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: '#187bb8',
                                },
                                {
                                    offset: 0.15,
                                    color: '#1fa4d1',
                                },
                                {
                                    offset: 0.3,
                                    color: '#21b7dc',
                                },
                                {
                                    offset: 0.4,
                                    color: '#22aada',
                                },
                                {
                                    offset: 0.6,
                                    color: '#206ecc',
                                },
                                {
                                    offset: 0.8,
                                    color: '#33addf',
                                },
                                {
                                    offset: 1,
                                    color: '#1a7bc5',
                                },
                            ]);
                        },
                    },
                },
                data,
            },
            // 数据柱状图顶部
            {
                tooltip: {
                    show: false
                },
                stack: 'a',
                type: 'pictorialBar',
                symbolSize: [barWidth, 12],
                symbolOffset: [0, -6],
                z: 22,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(12, 70, 124, 1)',
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(18, 117, 164, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(34, 183, 219, 1)'
                                },
                            ]);
                        },
                    },
                },
                symbolPosition: 'end',
                data,
            },
            // 空柱
            {
                tooltip: {
                    show: false
                },
                stack: 'a',
                type: 'bar',
                barWidth: barWidth,
                barMinHeight: 176,
                z: 2,
                barGap: '-100%',
                // stack: '',
                symbolPosition: 'end',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: 'rgba(8, 177, 255, .4)',
                                },
                                {
                                    offset: 0.3,
                                    color: 'rgba(8, 177, 255, 0)',
                                },
                                {
                                    offset: 0.7,
                                    color: 'rgba(8, 177, 255, 0)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(8, 177, 255, .4)',
                                },
                            ]);
                        },
                    },
                },
                data: data.map(item => {return {value: yData.max}}),
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth - 1, 13],
                symbolOffset: [0, -168],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: yData.max !== 1 ? function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(12, 70, 124, .5)',
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(18, 117, 164, .5)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(34, 183, 219, .5)'
                                },
                            ]);
                        } : "rgba(0,0,0,0)",
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 5 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth / 3 * 2, 8],
                symbolOffset: [0, -170],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 8 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth / 3, 4],
                symbolOffset: [0, -171],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 12 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            }
        ]
    };
}
let data = [
    {
        name: '柱体',
        value: 8000
    },{
        name: '柱体',
        value: 9162
    }
];
draw('bar', getBarOption(data));
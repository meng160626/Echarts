let cubeBarCharts;
//绘制材料消耗3D柱状图
function drawCubeBar(dataList) {
  if (!cubeBarCharts) {
    cubeBarCharts = echarts.init(document.getElementById('cubeBar'));
    // 绘制左侧面
    const CubeLeft = echarts.graphic.extendShape({
      buildPath: function (ctx, shape) {
        const xAxisPoint = shape.xAxisPoint;          // 获取x轴坐标点
        // 计算4个点位置
        const c0 = [shape.x, shape.y];
        const c1 = [shape.x - 13, shape.y - 13];
        const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13];
        const c3 = [xAxisPoint[0], xAxisPoint[1]];
        // 用画笔连接四个点
        ctx.moveTo(c0[0], c0[1]);
        ctx.lineTo(c1[0], c1[1]);
        ctx.lineTo(c2[0], c2[1]);
        ctx.lineTo(c3[0], c3[1]);
        ctx.closePath();
      }
    })
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
      buildPath: function (ctx, shape) {
        const xAxisPoint = shape.xAxisPoint
        const c1 = [shape.x, shape.y]
        const c2 = [xAxisPoint[0], xAxisPoint[1]]
        const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
        const c4 = [shape.x + 18, shape.y - 9]
        ctx.moveTo(c1[0], c1[1]);
        ctx.lineTo(c2[0], c2[1]);
        ctx.lineTo(c3[0], c3[1]);
        ctx.lineTo(c4[0], c4[1]);
        ctx.closePath();
      }
    })
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
      buildPath: function (ctx, shape) {
        const c1 = [shape.x, shape.y]
        const c2 = [shape.x + 18, shape.y - 9]
        const c3 = [shape.x + 5, shape.y - 22]
        const c4 = [shape.x - 13, shape.y - 13]
        ctx.moveTo(c1[0], c1[1]);
        ctx.lineTo(c2[0], c2[1]);
        ctx.lineTo(c3[0], c3[1]);
        ctx.lineTo(c4[0], c4[1]);
        ctx.closePath();
      }
    })
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)
  }
  let nameList = [], valueList = [], max = 0, maxList = [], interval = 0, coefficient = 1;

  dataList.forEach(item => {
    nameList.push(item.name);
    valueList.push(item.value);
    if (item.value > max) max = item.value;
  });

  if (max < 25) coefficient = 1;
  if (max >= 25 && max < 250) coefficient = 5;
  if (max >= 250 && max < 500) coefficient = 50;
  if (max >= 500 && max < 2500) coefficient = 100;
  if (max >= 2500) coefficient = 500;
  interval = Math.floor(max / 5 / coefficient) * coefficient;
  if (interval == 0) interval = 1;    //修正
  let _max = Math.floor(max / interval) * interval + interval;

  for (let i = 0; i < valueList.length; i++) {
    maxList.push(_max);
  }

  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params, ticket, callback) {
        const item = params[1]
        return item.name + ' : ' + item.value;
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
      top: 25,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: nameList,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'white'
        }
      },
      offset: 8,
      axisTick: {
        show: false,
        length: 9,
        alignWithLabel: true,
        lineStyle: {
          color: '#7DFFFD'
        }
      },
      axisLabel: {
        show: true,
        fontSize: 14
      },
    },
    yAxis: {
      min: 0,
      name: 't',
      nameTextStyle: {
        align: 'center'
      },
      max: _max,
      interval: interval,
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: 'white'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(255,255,255,0.1)"
        },
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: 16,

      },
      boundaryGap: ['20%', '20%']
    },
    series: [
      // 透明柱体
      {
        type: 'custom',
        renderItem: function (params, api) {
          const location = api.coord([api.value(0), api.value(1)])
          // location[0]x轴位置, location[1]y轴位置
          return {
            type: 'group',        // 当返回的图形为多个自定义图形的组合时，type: 'group'
            children: [{          // 当返回的图形为多个自定义图形的组合时，图形通过children返回
              type: 'CubeLeft',
              shape: {
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: 'rgba(47,102,192,.27)'
              }
            }, {
              type: 'CubeRight',
              shape: {
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: 'rgba(59,128,226,.27)'
              }
            }, {
              type: 'CubeTop',
              shape: {
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: 'rgba(72,156,221,.27)'
              }
            }]
          }
        },
        data: maxList
      }, 
      // 实际数据柱体
      {
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          let color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(37,170,254,1)'
          },
            {
              offset: 0.8,
              color: 'rgba(37,170,254,0.1)'
            }
          ])
          return {
            type: 'group',
            children: [{
              type: 'CubeLeft',
              shape: {
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: color
              }
            }, {
              type: 'CubeRight',
              shape: {
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: color
              }
            }, {
              type: 'CubeTop',
              shape: {
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: color
              }
            }]
          }
        },
        data: valueList
      }, 
      // 做一个透明的柱体，用来撑开整个网格的高度
      {
        type: 'bar',
        itemStyle: {
          color: 'transparent',
        },
        data: maxList
      }]
  }

  if (option) {
    cubeBarCharts.setOption(option);
  }
}

const dataList = [
    {name: '水泥', value: 40},
    {name: '钢筋', value: 25},
    {name: '沙子', value: 35},
    {name: '石粉', value: 30},
    {name: '外加剂', value: 4}
];
drawCubeBar(dataList);
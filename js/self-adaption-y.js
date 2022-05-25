/**
 * 获取自适应的Y轴数据
 * @param {*} data 数据源
 * @param {*} count y轴标签数量
 * @param {*} valueField 数据源中值的字段名
 */
function getSelfAdaptionYData(data, valueField = 'value') {
    // max => 数组中的最大值    min => 适应的最小值    interval => 间隔    coefficient => 系数
    let max = Number.MIN_VALUE, min = Number.MAX_VALUE, interval = 0, coefficient = 1;
    data.forEach(item => {
        max = item[valueField] > max ? item[valueField] : max;
        min = item[valueField] < min ? item[valueField] : min;
    });
    // 动态计算系数
    if (max < 25) coefficient = 1;
    if (max >= 25 && max < 250) coefficient = 5;
    if (max >= 250 && max < 500) coefficient = 50;
    if (max >= 500 && max < 2500) coefficient = 100;
    if (max >= 2500) coefficient = 500;
    interval = Math.floor(max / 5 / coefficient) * coefficient;
    if (interval == 0) interval = 1;    //修正
    // 计算合适的y轴最大值
    max = Math.floor(max / interval) * interval + interval;
    // 计算合适的y轴最小值
    min = Math.floor(min / interval) * interval - interval;
    return {
        max,        //  y轴最大值
        min,        //  y轴最小值
        interval    //  y轴间隔值
    }
}
// 页面大小
const length = Math.min(Math.min(window.innerWidth, window.innerHeight), 600);
// 页面 padding
const padding = 20;
// 方块大小
const rectLength = (length - padding * 2) / 4;
// 棋盘大小
const size = 4;
// 乱序生成步数
let randomCount = 50;
const hard = getSearch('hard');

if (+hard === 0) randomCount = 1;
if (+hard === 1) randomCount = 10;
if (+hard === 2) randomCount = 20;
if (+hard === 3) randomCount = 30;

const backgroundColor = 0xffffff;
const containerOpacity = 0.2;

function getSearch(key?: string) {
  const search = document.location.search;
  const result: any = {};
  search
    .slice(1)
    .split('&')
    .forEach((x) => {
      const keyValue = x.split('=');
      result[keyValue[0]] = keyValue[1];
    });
  return key ? result[key] : result;
}

export {
  length,
  padding,
  rectLength,
  size,
  randomCount,
  backgroundColor,
  containerOpacity,
};

const hex = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const checkColor = (color: string): string | undefined => {
  // 최소 길이 미달
  if (color.length <= 5) {
    return;
  }

  // HEX 체크
  if (/^#?[a-f|0-9]{6}$/gi.test(color)) {
    if (color.length === 7) {
      return color.toUpperCase();
    } else {
      return "#" + color.toUpperCase();
    }
  }

  // RGB 체크
  const rgb = color.match(/[0-9]{1,3}/gi)?.map((num) => parseInt(num));

  if (
    !rgb ||
    rgb.length !== 3 ||
    rgb.some((num) => {
      return num > 255;
    })
  ) {
    return;
  } else {
    return "#" + rgbToHex(rgb);
  }
};

// RGB -> HEX
const rgbToHex = (rgb: Array<number>) =>
  rgb.reduce((acc, cur) => acc + decimalToHex(cur), "");

// 10진법 -> 16진법
const decimalToHex = (num: number, result: string = ""): string => {
  result += hex[num % 16];

  const nextArg = Math.floor(num / 16);

  if (nextArg > 0) {
    return decimalToHex(nextArg, result);
  } else {
    return result.length === 1 ? "0" + result : result;
  }
};

export default checkColor;

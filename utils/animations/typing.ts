import readonly from '../readonly';

const Chosungs = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const Jungsungs = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
];

const Jongsungs = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const DoubleJongsungs: { [index: string]: any } = {
  ㄲ: 'ㄱ',
  ㄳ: 'ㄱ',
  ㄵ: 'ㄴ',
  ㄶ: 'ㄴ',
  ㄺ: 'ㄹ',
  ㄻ: 'ㄹ',
  ㄼ: 'ㄹ',
  ㄽ: 'ㄹ',
  ㄾ: 'ㄹ',
  ㄿ: 'ㄹ',
  ㅀ: 'ㄹ',
  ㅄ: 'ㅂ',
  ㅆ: 'ㅅ',
};

const HANGEUL_START_CODE = 44032;
const HANGEUL_LAST_CODE = 55203;

const CHOSUNG_CHANGE_SIZE = 588;
const JUNGSUNG_CHANGE_SIZE = 28;

export const getTypingAnimationTextArr = (text: string) => {
  const arr: string[] = [];

  let now = '';
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const charUnicode = char.charCodeAt(0);

    if (charUnicode < HANGEUL_START_CODE || charUnicode > HANGEUL_LAST_CODE) {
      arr.push(`${now}${char}`);

      now += char;
      /* eslint-disable-next-line no-continue */
      continue;
    }

    const diff = charUnicode - HANGEUL_START_CODE;

    const chosungIndex = Math.floor(diff / CHOSUNG_CHANGE_SIZE);
    const jungsungIndex = Math.floor((diff % CHOSUNG_CHANGE_SIZE) / 28);
    const chosungPlusJungsung =
      HANGEUL_START_CODE +
      chosungIndex * CHOSUNG_CHANGE_SIZE +
      jungsungIndex * JUNGSUNG_CHANGE_SIZE;

    const jongsungIndex = diff % 28;

    arr.push(now + Chosungs[chosungIndex]);
    arr.push(now + String.fromCharCode(chosungPlusJungsung));

    const jongsungChar = Jongsungs[jongsungIndex];
    if (DoubleJongsungs[jongsungChar]) {
      const jongsungHeadChar = Jongsungs.indexOf(DoubleJongsungs[jongsungChar]);

      const nextChar = String.fromCharCode(
        chosungPlusJungsung + jongsungHeadChar
      );

      arr.push(now + nextChar);
    }

    if (jongsungIndex) arr.push(now + char);

    now += char;
  }

  return arr;
};

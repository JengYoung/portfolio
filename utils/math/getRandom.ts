interface GetRandomOption {
  allowNagative?: boolean;
}

const getRandom = (
  min: number,
  max: number,
  {allowNagative = false}: GetRandomOption,
): number => {
  if (allowNagative) {
    const weight = Math.random() >= 0.5 ? 1 : -1;
    return weight * Math.max(min, Math.random() * max);
  }

  return Math.max(min, Math.random() * max);
};

export default getRandom;

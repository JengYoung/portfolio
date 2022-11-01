const getVector = (x: number, y: number, angle: number, radius: number): [number, number] => [
  x + radius * Math.cos(angle),
  y + radius * Math.sin(angle),
];

export default getVector;

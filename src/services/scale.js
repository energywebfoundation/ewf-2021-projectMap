export default function scale(value, max, margin) {
  return value * (max - margin * 2) + margin;
}

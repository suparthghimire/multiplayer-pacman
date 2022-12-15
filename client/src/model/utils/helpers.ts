export default class Helper {
  public static RandomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

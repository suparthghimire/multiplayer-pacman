export default class Helper {
  public static Mod(n: number, max: number) {
    return ((n % max) + max) % max;
  }
}

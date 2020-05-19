export class StringHelper {
  static interpolate(input: string, ...args: string[]) {
    let formatted = input;
    for (let i = 1; i < args.length; i++) {
      const regexp = new RegExp("\\{" + (i - 1) + "\\}", "gi");
      formatted = formatted.replace(regexp, args[i]);
    }
    return formatted;
  }
}

export class StringHelper {
  static interpolate(input: string, ...args: string[]) {
    let formatted = input;
    for (let i = 0; i < args.length; i++) {
      const regexp = new RegExp("\\{" + i + "\\}", "gi");
      formatted = formatted.replace(regexp, args[i]);
    }
    return formatted;
  }
}

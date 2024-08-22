import { Minifier } from "../interface";
import stripJsonComments from "../utils/stripJsonComments";

export class JSONMinifier extends Minifier {
  init(): void {
    // No initialization required
  }

  async minifyCode(code: string): Promise<string> {
    try {
      const cleanedJSON = stripJsonComments(code);

      return JSON.stringify(JSON.parse(cleanedJSON));
    } catch (error) {
      throw new Error("Invalid JSON");
    }
  }
}

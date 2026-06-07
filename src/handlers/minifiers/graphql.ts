import { parse, stripIgnoredCharacters } from "graphql";
import { Minifier } from "../interface";

export class GraphQLMinifier extends Minifier {
  async minifyCode(code: string): Promise<string> {
    parse(code);
    return stripIgnoredCharacters(code);
  }
}

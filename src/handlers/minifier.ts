import stripJsonComments from "./utils/stripJsonComments";

export const minifyJSON = async (input: string): Promise<string> => {
  try {
    const cleanedJSON = stripJsonComments(input);

    return JSON.stringify(JSON.parse(cleanedJSON));
  } catch (error) {
    console.error(`Invalid  code:`, error);
    throw error;
  }
};

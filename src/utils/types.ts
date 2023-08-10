export type Prompt = {
  siteType: string;
  message: string;
}

export type BackgroundRequest = {
  call: string;
  prompt: Prompt;
};

export type BackgroundSendResponse = (response?: Prompt) => void ;

export enum BackgroundCalls {
  NEW_PROMPT = "newPrompt",
  GET_PROMPT = "getPrompt"
}


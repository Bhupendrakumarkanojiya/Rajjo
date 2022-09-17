interface BurningGlassToken {
  access_token: string;
  expires_in: number;
  token_generated_at: string;
}

interface CustomNodeJsGlobal extends NodeJS.Global {
  burningGlassToken: BurningGlassToken;
}

declare const global: CustomNodeJsGlobal;

global.burningGlassToken = null;

import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function TeamAppOAuthBridgePOC(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const client_id = process.env.ClientId
  const baseUrl = new URL(request.url);
  const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://localhost:7071/api/TeamAppOAuthEnd&state={"authId":"${baseUrl.searchParams.get(
    "authId"
  )}","oauthRedirectMethod":"${baseUrl.searchParams.get(
    "oauthRedirectMethod"
  )}","hostRedirectUrl":"${baseUrl.searchParams.get(
    "hostRedirectUrl"
  )}"}&client_id=${client_id}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
  return {
    status: 302,
    headers: {
      Location: redirectUri,
    },
    body: "Redirecting...",
  };
}

app.http("TeamAppOAuthBridgePOC", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: TeamAppOAuthBridgePOC,
});

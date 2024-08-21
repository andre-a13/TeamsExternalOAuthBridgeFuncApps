import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function TeamAppOAuthEnd(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const baseUrl = new URL(request.url);
  const state = JSON.parse(baseUrl.searchParams.get("state"));
  const redirectUri = `${
    state.hostRedirectUrl
  }&result=${baseUrl.searchParams.get("code")}`;
  console.log(redirectUri);
  return {
    status: 302,
    headers: {
      Location: redirectUri,
    },
    body: "Redirecting...",
  };
}

app.http("TeamAppOAuthEnd", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: TeamAppOAuthEnd,
});

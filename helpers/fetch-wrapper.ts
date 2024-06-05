import getConfig from "next/config";
import { userService } from "@/services";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method: string) {
  return (url: string, body?: any) => {
    const requestOptions: RequestInit = {
      method,
      headers: authHeader(url),
    };

    if (body) {
      const headers = new Headers(requestOptions.headers);
      headers.set("Content-Type", "application/json");
      requestOptions.headers = headers;
      requestOptions.body = JSON.stringify(body);
    }

    return fetch(url, requestOptions).then(handleResponse);
  };
}

function authHeader(url: any) {
  const user = userService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return { Authorization: "" };
  }
}

async function handleResponse(response: any) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    if ([401, 403].includes(response.status) && userService.userValue) {
      userService.logout();
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

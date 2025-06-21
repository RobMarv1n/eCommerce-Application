import {
  createApiBuilderFromCtpClient,
  type ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/ts-client';
import type { loginDTO } from './types';

const projectKey = import.meta.env.VITE_PROJECT_KEY || '';
const clientId = import.meta.env.VITE_CLIENT_ID || '';
const clientSecret = import.meta.env.VITE_CLIENT_SECRET || '';
const authURL = import.meta.env.VITE_AUTH_URL || '';
const apiURL = import.meta.env.VITE_API_URL || '';
const scopes = [import.meta.env.VITE_SCOPES || ''];

const anonymousOptions: AuthMiddlewareOptions = {
  host: authURL,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  httpClient: fetch,
};

function passwordOptions(dto: loginDTO): PasswordAuthMiddlewareOptions {
  return {
    host: authURL,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: dto.email,
        password: dto.password,
      },
    },
    scopes,
    httpClient: fetch,
  };
}

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  httpClient: fetch,
};

export function CreateAnonymousApiRoot(): ByProjectKeyRequestBuilder {
  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(anonymousOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });
}

export function CreatePasswordApiRoot(
  dto: loginDTO
): ByProjectKeyRequestBuilder {
  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(passwordOptions(dto))
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });
}

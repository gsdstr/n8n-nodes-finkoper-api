import type {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
	Icon,
} from 'n8n-workflow';
import { ApplicationError } from 'n8n-workflow';

// Token validity: 5 days for access token
const TOKEN_VALID_MS = 1000 * 60 * 60 * 24 * 5;

export class FinkoperApi implements ICredentialType {
	name = 'finkoperApi';

	displayName = 'Finkoper API';

	documentationUrl = 'https://docs.finkoper.com/api';

	icon: Icon = {
		light: 'file:../nodes/Finkoper/../../icons/finkoper.svg',
		dark: 'file:../nodes/Finkoper/../../icons/finkoper.dark.svg',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'E-mail',
			name: 'email',
			type: 'string',
			default: '',
			placeholder: 'user@company.com',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'URL',
			name: 'url',
			type: 'string',
			default: 'https://api.finkoper.com',
			description: 'The base URL of the Finkoper API',
		},
		{
			displayName: 'Access Token',
			name: 'token',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'Refresh Token',
			name: 'refreshToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'Token Expiry',
			name: 'expires',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
	];

	/**
	 * Pre-authentication: handles token refresh or initial login
	 *
	 * Flow:
	 * 1. If valid access token exists → use it
	 * 2. If refresh token exists → try to refresh (TODO: implement when API supports it)
	 * 3. Otherwise → full re-authentication with email/password
	 */
	async preAuthentication(
		this: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject,
	): Promise<{ token?: string; refreshToken?: string; expires?: number }> {
		const token = credentials.token as string | undefined;
		const expires = credentials.expires as number | undefined;

		// Check if current token is still valid
		if (token && token.trim().length > 0 && expires && Date.now() < expires) {
			// Token is still valid, no action needed
			return {};
		}

		// TODO: Implement refresh token flow when Finkoper API supports it
		// if (refreshToken && refreshToken.trim().length > 0) {
		//   try {
		//     const result = await this.helpers.httpRequest({
		//       method: 'POST',
		//       url: `${baseUrl}/api/v1/users/refresh`,
		//       body: { refreshToken },
		//     });
		//     return {
		//       token: result.data.accesstoken,
		//       refreshToken: result.data.refreshtoken,
		//       expires: Date.now() + TOKEN_VALID_MS,
		//     };
		//   } catch {
		//     // Refresh failed, fall through to full re-auth
		//   }
		// }

		// Full re-authentication with email/password
		const url = credentials.url as string;
		const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

		const result = (await this.helpers.httpRequest({
			method: 'POST',
			url: `${baseUrl}/api/v1/users/signin`,
			body: {
				email: credentials.email,
				password: credentials.password,
			},
		})) as {
			data: {
				accesstoken: string;
				clientId: string;
				ctoken: string;
				refreshtoken: string;
			};
			errormessage: string;
			errors: string;
			v: number;
		};

		if (!result || result.errors) {
			throw new ApplicationError('Authentication failed. Please check your credentials.', {
				level: 'warning',
				extra: result?.errors,
			});
		}

		return {
			token: result.data.accesstoken,
			refreshToken: result.data.refreshtoken,
			expires: Date.now() + TOKEN_VALID_MS,
		};
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.url}}',
			url: '/api/v1/users/info',
		},
	};
}

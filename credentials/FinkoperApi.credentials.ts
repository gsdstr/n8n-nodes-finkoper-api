import {
	ApplicationError,
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';


const VALID_TIME = 1000 * 60 * 60 * 24 * 5; //week
export class FinkoperApi implements ICredentialType {
	name = 'finkoperApi';
	//extends = ['oAuth2Api'];
	displayName = 'Finkoper API';
	documentationUrl = '<your-docs-url>';
	properties: INodeProperties[] = [
		{
			displayName: 'E-mail',
			name: 'email',
			type: 'string',
			default: '',
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
		},
		{
			displayName: 'Session Token',
			name: 'token',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'Expires',
			name: 'expires',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
	];

	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		// @ts-ignore
		// console.info('preAuthentication ' + JSON.stringify(credentials));
		//current one week valid
		if (credentials.token && credentials.token.toString().trim().length > 0 && credentials.expires < Date.now()) {
			return {};
		}
		const url = credentials.url as string;
		const res = (await this.helpers.httpRequest({
			method: 'POST',
			url: `${url.endsWith('/') ? url.slice(0, -1) : url}/api/v1/users/signin`,
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

		if (!res || res.errors) {
			throw new ApplicationError('Error returned. Please check your credentials.', {
				level: 'warning',
				extra: res.errors,
				tags: undefined,
			});
		}

		return { token: res.data.accesstoken, expires: Date.now() + VALID_TIME };
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

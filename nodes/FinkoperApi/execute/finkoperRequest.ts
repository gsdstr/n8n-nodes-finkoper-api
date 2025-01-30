import {IExecuteFunctions, NodeApiError} from 'n8n-workflow';
import {IHttpRequestOptions} from "n8n-workflow/dist/Interfaces";

export type FinkoperApiResponse<T> = {
	"data"?: T,
	"errormessage"?: string,
	"errors"?: any,
	"v"?: number,
	"message"?: string, //api on error
	"status"?: string,  //api on error
	"success"?: boolean //api-email
};

export async function finkoperApiRequest<T>(ef: IExecuteFunctions, options: IHttpRequestOptions): Promise<T> {
	// ef.logger.info('finkoperApiRequest');

	const credentials = await ef.getCredentials('finkoperApi');
	// ef.logger.info('finkoperApiRequest ' + JSON.stringify(credentials));
	const serverUrl = (credentials['url'] as string).replace(/\/$/, '');
	// const apiKey = credentials.token;

	const requestOptions: IHttpRequestOptions = {
		json: true,
		...options,
		headers: {
			'content-type': 'application/json; charset=utf-8',
			...(options.headers || {}),
		},
		url: `${serverUrl}${options.url}`,
	};

	// @ts-ignore
	const res = await ef.helpers.httpRequestWithAuthentication.call(ef, 'finkoperApi', requestOptions);
	if (res.data) {
		return res.data;
	}
	if (res.success) { // if url start from /api-email
		return {} as T;
	}
	// const errors = [];
	// if (res.errormessage) {
	// 	errors.push(res.errors);
	// }
	throw new NodeApiError(ef.getNode(), res);
}

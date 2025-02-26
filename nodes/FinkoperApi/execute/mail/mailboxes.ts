import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';
import {} from 'n8n-workflow/dist/Interfaces';

export async function mailboxes(ef: IExecuteFunctions, itemIndex: number): Promise<IDataObject[]> {
	const accountId = ef.getNodeParameter('accountId', itemIndex);
	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/api/v1/mail/account/${accountId}/mailboxes`,
	};

	return await finkoperApiRequest<IDataObject[]>(ef, options);
}

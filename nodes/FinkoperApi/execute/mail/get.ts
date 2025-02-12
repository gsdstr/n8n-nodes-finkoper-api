import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';

export async function mailGet(ef: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const mailPostID = ef.getNodeParameter('mailPostID', itemIndex) as string;
	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/api/v1/mail/${mailPostID}`,
	};

	return await finkoperApiRequest<IDataObject>(ef, options);
}

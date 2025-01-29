import {IExecuteFunctions, IHttpRequestMethods} from "n8n-workflow";
import {IDataObject, IHttpRequestOptions} from "n8n-workflow/dist/Interfaces";
import {finkoperApiRequest} from "../finkoperRequest";

export async function posts(
	ef: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const accountId = ef.getNodeParameter('accountId', itemIndex);
	const mailboxId = ef.getNodeParameter('mailboxId', itemIndex);
	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/mail/account/${accountId}/posts`,
		qs: {
			mailboxid: mailboxId,
		}
	};

	return await finkoperApiRequest<IDataObject>(ef, options);
}

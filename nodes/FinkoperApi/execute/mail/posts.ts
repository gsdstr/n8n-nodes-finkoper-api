import {IExecuteFunctions, IHttpRequestMethods} from "n8n-workflow";
import {IDataObject, IHttpRequestOptions} from "n8n-workflow/dist/Interfaces";
import {finkoperApiRequest} from "../finkoperRequest";

type QueryParams = {
	mailboxid: string;
	afterid?: string;
	unread?: number;
}

export async function posts(
	ef: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {

	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	const mailboxId = ef.getNodeParameter('mailboxId', itemIndex) as string;
	const afterId = ef.getNodeParameter('afterId', itemIndex) as string;
	const unread = ef.getNodeParameter('unread', itemIndex) as boolean;
	const qs: QueryParams = {
		mailboxid: mailboxId,
	};
	if (afterId) qs.afterid = afterId
	if (unread) qs.unread = 1;

	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/api/v1/mail/account/${accountId}/posts`,
		qs
	};

	return await finkoperApiRequest<IDataObject>(ef, options);
}

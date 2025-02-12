import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';

type QueryParams = {
	mailboxid: string;
	afterid?: string;
	unread?: number;
};

/*
 * @param {IExecuteFunctions} ef
 * @param {number} itemIndex
 * @returns {Promise<IDataObject[]>}
 *
 * can return empty array if no posts found {"data":null,"errormessage":"","errors":"","v":1}
 */
export async function posts(ef: IExecuteFunctions, itemIndex: number): Promise<IDataObject[]> {
	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	const mailboxId = ef.getNodeParameter('mailboxId', itemIndex) as string;
	const afterId = ef.getNodeParameter('afterId', itemIndex) as string;
	const unread = ef.getNodeParameter('unread', itemIndex) as boolean;
	const qs: QueryParams = {
		mailboxid: mailboxId,
	};
	if (afterId) qs.afterid = afterId;
	if (unread) qs.unread = 1;

	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/api/v1/mail/account/${accountId}/posts`,
		qs,
	};

	// ef.logger.info('posts options', options);
	const res = await finkoperApiRequest<IDataObject[]>(ef, options);
	// if (res.length === 1){
	// 	ef.logger.info('posts 1' + JSON.stringify(res));
	// 	return [];
	// }
	if (Object.keys(res).length === 0 ) return []; //{"data":null,"errormessage":"","errors":"","v":1}
	// ef.logger.info('posts', res);
	return res;
}

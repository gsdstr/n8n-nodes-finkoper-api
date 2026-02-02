import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';

type BodyParams = {
	BookkeeperTeamID: string;
	Posts: string[];
	Customers?:
		{
			customer_team_id: string;
		}[],
};

export async function postsUpdate(ef: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	const bookkeeperTeamID = ef.getNodeParameter('bookkeeperTeamID', itemIndex) as string;
	const posts = ef.getNodeParameter('posts', itemIndex) as string[];
	const customers = ef.getNodeParameter('customers', itemIndex) as string[];


	const body: BodyParams = {
		BookkeeperTeamID: bookkeeperTeamID,
		Posts: posts,
		Customers: customers.map((customer) => {
			return { customer_team_id: customer }
		}),
	};
	// ef.logger.info('postsUpdate \n' + JSON.stringify(posts) + '\n-----\n' + JSON.stringify(customers) + '\n-----\n' + JSON.stringify(body));

	const options: IHttpRequestOptions = {
		method: 'PATCH' as IHttpRequestMethods,
		url: `/api-email/v1/email/${accountId}/posts-update`,
		body,
	};

	return await finkoperApiRequest<IDataObject>(ef, options);
}

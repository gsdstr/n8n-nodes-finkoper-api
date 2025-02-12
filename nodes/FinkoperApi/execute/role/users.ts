import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';

type QueryParams = {
	bookkeeper_team_id: string;
	group_by: string;
};

export async function roleUser(ef: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const bookkeeperTeamID = ef.getNodeParameter('bookkeeperTeamID', itemIndex) as string;
	const qs: QueryParams = {
		bookkeeper_team_id: bookkeeperTeamID,
		group_by: 'user',
	};
	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/api2/roles/users`,
		qs,
	};

	return await finkoperApiRequest<IDataObject>(ef, options);
}

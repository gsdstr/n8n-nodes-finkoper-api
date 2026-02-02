import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';
import {} from 'n8n-workflow/dist/Interfaces';

type QueryParams = {
	bookkeeper_team_id: string;
};

export async function credentials(ef: IExecuteFunctions, itemIndex: number): Promise<IDataObject[]> {
	const bookkeeperTeamID = ef.getNodeParameter('bookkeeperTeamID', itemIndex) as string;
	const qs: QueryParams = {
		bookkeeper_team_id: bookkeeperTeamID,
	};
	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/api2/mail-credentials/for-user`,
		qs,
	};

	return await finkoperApiRequest<IDataObject[]>(ef, options);
}

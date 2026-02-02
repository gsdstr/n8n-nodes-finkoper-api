import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';

export async function userCompany(ef: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const bookkeeperTeamID = ef.getNodeParameter('bookkeeperTeamID', itemIndex) as string;
	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/api/v2/users/company/${bookkeeperTeamID}`,
	};

	return await finkoperApiRequest<IDataObject>(ef, options);
}

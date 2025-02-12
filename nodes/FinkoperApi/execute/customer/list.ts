import { IExecuteFunctions, IDataObject, IHttpRequestOptions, IHttpRequestMethods } from "n8n-workflow";
import { finkoperApiRequest } from "../finkoperRequest";

export async function list(
	ef: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject[]> {
	const bookkeeperTeamID = ef.getNodeParameter('bookkeeperTeamID', itemIndex) as string;
	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/api/v2/customers/${bookkeeperTeamID}`,
		//TODO use paged https://api.finkoper.com/api/v2/customers/paged/${bookkeeperTeamID}
	};

	return await finkoperApiRequest<IDataObject[]>(ef, options);
}

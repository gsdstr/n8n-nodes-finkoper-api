import {IExecuteFunctions, IHttpRequestMethods} from "n8n-workflow";
import {IDataObject, IHttpRequestOptions} from "n8n-workflow/dist/Interfaces";
import {finkoperApiRequest} from "../finkoperRequest";

type BodyParams = {
	BookkeeperTeamID: string;
	Seen: boolean;
	Which?: [
		{
			"From": string,
			"Posts": string[]
		}
	]
}

export async function seen(
	ef: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {

	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	const bookkeeperTeamID = ef.getNodeParameter('bookkeeperTeamID', itemIndex) as string;
	const seen = ef.getNodeParameter('seen', itemIndex) as boolean;

	const items = ef.getNodeParameter('items', itemIndex) as any;
	ef.logger.info('seen ' + JSON.stringify(items));

	//seen {"metadataValues":[{"from":"4k9byzdqtbyubbbwsxwawtoazh","posts":["jajupu9i67dr5qyqxh44nmr8gy"]}]}

	const body: BodyParams = {
		BookkeeperTeamID: bookkeeperTeamID,
		Seen: seen,
		Which: [JSON.parse(items)]
	};

	const options: IHttpRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		url: `/api-email/v1/email/${accountId}/posts/seen`,
		body,
	};

	ef.logger.info('seen body ' + JSON.stringify(body));

	return await finkoperApiRequest<IDataObject>(ef, options);
}

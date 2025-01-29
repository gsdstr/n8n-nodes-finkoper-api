import {
	IExecuteFunctions,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';
import {IDataObject, IHttpRequestOptions} from "n8n-workflow/dist/Interfaces";

export async function mailboxes(
	ef: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// try {
	const accountId = ef.getNodeParameter('accountId', itemIndex);
	const options: IHttpRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `/mail/account/${accountId}/mailboxes`
	};

	return await finkoperApiRequest<IDataObject>(ef, options);
	// } catch (error) {
	// 	const errorData = {
	// 		success: false,
	// 		error: {
	// 			message: error.message.includes('Could not get parameter')
	// 				? 'Invalid or missing parameters'
	// 				: 'Error creating instance',
	// 			details: error.message.includes('Could not get parameter')
	// 				? 'Check that all the required fields have been filled in correctly'
	// 				: error.message,
	// 			code: error.code || 'UNKNOWN_ERROR',
	// 			timestamp: new Date().toISOString(),
	// 		},
	// 	};
	//
	// 	if (!ef.continueOnFail()) {
	// 		throw new NodeOperationError(ef.getNode(), error.message, {
	// 			message: errorData.error.message,
	// 			description: errorData.error.details,
	// 		});
	// 	}

	// return {
	// 	json: errorData,
	// 	error: errorData as unknown as NodeApiError,
	// };
	// }
}

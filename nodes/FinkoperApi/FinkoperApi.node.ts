import {
	type IExecuteFunctions,
	type INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError, NodeOperationError,
} from 'n8n-workflow';
import {finkoperApiNodeProperties} from './properties';
import {resourceOperationsFunctions} from './execute';

export class FinkoperApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FinkoperApi',
		name: 'finkoperApi',
		icon: 'file:Finkoper.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Finkoper API',
		defaults: {
			name: 'FinkoperApi',
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		credentials: [
			{
				name: 'finkoperApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: finkoperApiNodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData = [];
		const items = this.getInputData();
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex) as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				const fn = resourceOperationsFunctions[resource][operation];
				if (!fn) {
					throw new NodeApiError(this.getNode(), {
						message: 'Operation not supported.',
						description: `The “${operation}” function for the “${resource}” resource is not supported!`,
					});
				}

				const responseData = await fn(this, itemIndex);
				//returnData.push(responseData);
				returnData.push(this.helpers.returnJsonArray(responseData));
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push([{ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex }]);
				} else {
					throw new NodeOperationError(this.getNode(), error, {});
				}
			}
		}
		return returnData;
	}

	//
	// const items = this.getInputData();
	//
	// let responseData;
	// const returnData = [];
	//
	// // Iterates over all input items and add the key "myString" with the
	// // value the parameter "myString" resolves to.
	// // (This could be a different value for each item in case it contains an expression)
	// for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
	// 	try {
	// 		const mailboxesId = this.getNodeParameter('id', itemIndex) as number;
	//
	// 		// Make HTTP request according to https://sendgrid.com/docs/api-reference/
	// 		const options: IRequestOptions = {
	// 			headers: {
	// 				'Accept': 'application/json',
	// 			},
	// 			method: 'GET',
	// 			body: {
	// 			},
	// 			uri: `https://api.finkoper.com/api/v1/mail/account/${mailboxesId}/mailboxes`,
	// 			json: true,
	// 		};
	// 		responseData = await this.helpers.requestWithAuthentication.call(this, 'finkoperApi', options);
	// 		returnData.push(responseData);
	// 	} catch (error) {
	// 		// This node should never fail but we want to showcase how
	// 		// to handle errors.
	// 		if (this.continueOnFail()) {
	// 			items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
	// 		} else {
	// 			// Adding `itemIndex` allows other workflows to handle this error
	// 			if (error.context) {
	// 				// If the error thrown already contains the context property,
	// 				// only append the itemIndex
	// 				error.context.itemIndex = itemIndex;
	// 				throw error;
	// 			}
	// 			throw new NodeOperationError(this.getNode(), error, {
	// 				itemIndex,
	// 			});
	// 		}
	// 	}
	// }
	//
	// return returnData;
}

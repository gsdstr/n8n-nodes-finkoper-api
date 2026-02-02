import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';
import { finkoperApiNodeProperties } from './properties';
import { resourceOperationsFunctions } from './execute';

export class FinkoperApiV2 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FinkoperApi V2',
		name: 'finkoperApiV2',
		icon: 'file:Finkoper.svg',
		group: ['transform'],
		version: 2,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Finkoper API using base library',
		defaults: {
			name: 'FinkoperApiV2',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'finkoperApi',
				required: true,
			},
		],
		properties: finkoperApiNodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('finkoperApi');

		const client = new FinkoperClient({
			email: credentials.email as string,
			password: credentials.password as string,
			accessToken: credentials.token as string,
			baseUrl: credentials.url as string,
		});

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resourceName = this.getNodeParameter('resource', itemIndex) as string;
				const operationName = this.getNodeParameter('operation', itemIndex) as string;

				// In a full rewrite, we'd map these to client methods
				// For now, we'll keep the structure but inject the client
				const fn = (resourceOperationsFunctions as any)[resourceName][operationName];
				if (!fn) {
					throw new NodeApiError(this.getNode(), {
						message: 'Operation not supported.',
						description: `The “${operationName}” function for the “${resourceName}” resource is not supported!`,
					});
				}

				// The legacy functions expect (ef, itemIndex) and use finkoperApiRequest
				// We need to either rewrite them all or provide a compatibility layer
				const res = await fn(this, itemIndex, client);

				const responseData = this.helpers.returnJsonArray(res);
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: itemIndex } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: this.getInputData(itemIndex)[0].json,
						error: error as any,
						pairedItem: itemIndex
					});
				} else {
					throw new NodeOperationError(this.getNode(), error as any, { itemIndex: itemIndex });
				}
			}
		}
		return [returnData];
	}
}

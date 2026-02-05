import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

// Descriptions (UI definitions)
import { mailDescription } from './resources/mail';
import { taskDescription } from './resources/task';
import { customerDescription } from './resources/customer';
import { roleDescription } from './resources/role';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';

// Methods (execution logic)
import {
	resourceOperationsFunctions,
} from './methods';

export class Finkoper implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Finkoper',
		name: 'finkoper',
		icon: { light: 'file:../../icons/finkoper.svg', dark: 'file:../../icons/finkoper.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Finkoper CRM API',
		defaults: {
			name: 'Finkoper',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'finkoperApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Company', value: 'company' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Mail', value: 'mail' },
					{ name: 'Role', value: 'role' },
					{ name: 'Task', value: 'task' },
					{ name: 'User', value: 'user' },
				],
				default: 'mail',
			},
			...mailDescription,
			...taskDescription,
			...customerDescription,
			...roleDescription,
			...userDescription,
			...companyDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('finkoperApi');

		const client = new FinkoperClient({
			email: credentials.email as string,
			password: credentials.password as string,
			accessToken: credentials.token as string,
			refreshToken: credentials.refreshToken as string,
			baseUrl: credentials.url as string,
		});

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const bookkeeperTeamId =
					(this.getNodeParameter('bookkeeperTeamId', i, '') as string) || (await client.getTeamId());

				const fn = resourceOperationsFunctions[resource][operation];
				if (!fn) {
					throw new NodeApiError(this.getNode(), {
						message: 'Operation not supported.',
						description: `The “${operation}” function for the “${resource}” resource is not supported!`,
					});
				}

				const res = await fn(this, i, client, bookkeeperTeamId);
				// this.logger.info('execute res ' + JSON.stringify(res));
				const responseData = this.helpers.returnJsonArray(res);
				// this.logger.info('execute responseData ' + JSON.stringify(responseData));
				//returnData.push(responseData);
				//returnData.push(this.helpers.returnJsonArray(responseData));
				// return [{
				// 	json: res,
				// 	pairedItem: itemIndex
				// }] as INodeExecutionData[];
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: items[i].json,
						error: error as any,
						pairedItem: i,
					});
				} else {
					throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
				}
			}
		}

		return [returnData];
	}
}

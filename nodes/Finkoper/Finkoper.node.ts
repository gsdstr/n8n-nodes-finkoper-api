import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

import { mailDescription } from './resources/mail';
import { taskDescription } from './resources/task';
import { customerDescription } from './resources/customer';
import { roleDescription } from './resources/role';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';

import { executeMailOperation } from './resources/mail/Mail.methods';
import { executeTaskOperation } from './resources/task/Task.methods';
import { executeCustomerOperation } from './resources/customer/Customer.methods';
import { executeRoleOperation } from './resources/role/Role.methods';
import { executeUserOperation } from './resources/user/User.methods';
import { executeCompanyOperation } from './resources/company/Company.methods';

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
					{ name: 'Mail', value: 'mail' },
					{ name: 'Task', value: 'task' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Role', value: 'role' },
					{ name: 'User', value: 'user' },
					{ name: 'Company', value: 'company' },
				],
				default: 'mail',
			},
			{
				displayName: 'Bookkeeper Team ID',
				name: 'bookkeeperTeamId',
				type: 'string',
				default: '',
				description: 'The ID of the bookkeeper team. If not provided, it will be automatically fetched.',
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

				let result: unknown;

				switch (resource) {
					case 'mail':
						result = await executeMailOperation.call(this, client, operation, i, bookkeeperTeamId);
						break;
					case 'task':
						result = await executeTaskOperation.call(this, client, operation, i, bookkeeperTeamId);
						break;
					case 'customer':
						result = await executeCustomerOperation.call(this, client, operation, i, bookkeeperTeamId);
						break;
					case 'role':
						result = await executeRoleOperation.call(this, client, operation, i, bookkeeperTeamId);
						break;
					case 'user':
						result = await executeUserOperation.call(this, client, operation, i, bookkeeperTeamId);
						break;
					case 'company':
						result = await executeCompanyOperation.call(this, client, operation, i, bookkeeperTeamId);
						break;
					default:
						throw new NodeOperationError(
							this.getNode(),
							`Resource "${resource}" is not supported`,
							{ itemIndex: i },
						);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(result as IDataObject[]),
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

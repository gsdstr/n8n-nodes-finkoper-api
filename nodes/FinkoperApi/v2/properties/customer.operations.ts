import { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['customer'],
		},
	},
	options: [
		{
			name: 'Customers List',
			action: 'List all customers',
			description: 'List all customers',
			value: 'list',
		}
	],
	default: 'list',
};

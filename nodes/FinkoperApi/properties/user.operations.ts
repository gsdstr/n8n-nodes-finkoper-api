import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['user'],
		},
	},
	options: [
		{
			name: 'List Users',
			action: 'List all user form company',
			value: 'company',
		},
	],
	default: 'company',
};

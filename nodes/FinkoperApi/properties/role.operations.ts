import { INodeProperties } from 'n8n-workflow';

export const roleOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['role'],
		},
	},
	options: [
		{
			name: 'List Roles',
			action: 'List all roles',
			value: 'list',
		},
		{
			name: 'List Users Roles',
			action: 'List all users roles',
			value: 'user',
		}
	],
	default: 'list',
};

import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRole = {
	resource: ['role'],
};

export const roleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRole,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List roles',
				description: 'Get a list of all roles',
			},
			{
				name: 'Get Users',
				value: 'getUsers',
				action: 'Get users with role',
				description: 'Get all users assigned to a specific role',
			},
		],
		default: 'list',
	},
	{
		displayName: 'Role ID',
		name: 'roleId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['role'],
				operation: ['getUsers'],
			},
		},
		default: '',
		description: 'The ID of the role',
	},
];

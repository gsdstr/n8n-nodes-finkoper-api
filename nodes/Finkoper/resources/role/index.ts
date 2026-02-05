import type { INodeProperties } from 'n8n-workflow';
import { roleListDescription } from './list';
import { roleGetUsersDescription } from './getUsers';

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
				action: 'Get users by role',
				description: 'Get all users grouped by role',
			},
		],
		default: 'list',
	},
	...roleListDescription,
	...roleGetUsersDescription,
];

import type { INodeProperties } from 'n8n-workflow';
import { userGetInfoDescription } from './getInfo';
import { userGetCompanyDescription } from './getCompany';

const showOnlyForUser = {
	resource: ['user'],
};

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUser,
		},
		options: [
			{
				name: 'Get Info',
				value: 'getInfo',
				action: 'Get user info',
				description: 'Get information about the current user',
			},
			{
				name: 'Get Company',
				value: 'getCompany',
				action: 'Get user company',
				description: 'Get company information for the current user',
			},
		],
		default: 'getInfo',
	},
	...userGetInfoDescription,
	...userGetCompanyDescription,
];

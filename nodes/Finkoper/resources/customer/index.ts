import type { INodeProperties } from 'n8n-workflow';
import { customerListDescription } from './list';
import { customerGetDescription } from './get';

const showOnlyForCustomer = {
	resource: ['customer'],
};

export const customerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomer,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List customers',
				description: 'Get a list of customers',
			},
			{
				name: 'Get Details',
				value: 'getDetails',
				action: 'Get customer details',
				description: 'Get detailed information about a customer',
			},
		],
		default: 'list',
	},
	...customerListDescription,
	...customerGetDescription,
];

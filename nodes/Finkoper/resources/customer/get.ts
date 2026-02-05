import type { INodeProperties } from 'n8n-workflow';
import { customerIdProperty } from '../../shared';

const showOnlyForCustomerGet = {
	operation: ['getDetails'],
	resource: ['customer'],
};

export const customerGetDescription: INodeProperties[] = [
	{
		...customerIdProperty,
		displayOptions: { show: showOnlyForCustomerGet },
	},
];

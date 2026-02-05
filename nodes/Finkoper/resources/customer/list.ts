import type { INodeProperties } from 'n8n-workflow';
import { bookkeeperTeamIdProperty } from '../../shared';

const showOnlyForCustomerList = {
	operation: ['list'],
	resource: ['customer'],
};

// list operation uses bookkeeperTeamId from global param
export const customerListDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForCustomerList },
	},
];


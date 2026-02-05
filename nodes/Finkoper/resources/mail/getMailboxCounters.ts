import type { INodeProperties } from 'n8n-workflow';
import { accountIdProperty } from '../../shared';

const showOnlyForGetMailboxCounters = {
	operation: ['getMailboxCounters'],
	resource: ['mail'],
};

export const mailGetMailboxCountersDescription: INodeProperties[] = [
	{
		...accountIdProperty,
		displayOptions: { show: showOnlyForGetMailboxCounters },
	},
];

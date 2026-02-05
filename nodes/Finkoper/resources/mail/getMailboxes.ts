import type { INodeProperties } from 'n8n-workflow';
import { accountIdProperty } from '../../shared';

const showOnlyForGetMailboxes = {
	operation: ['getMailboxes'],
	resource: ['mail'],
};

export const mailGetMailboxesDescription: INodeProperties[] = [
	{
		...accountIdProperty,
		displayOptions: { show: showOnlyForGetMailboxes },
	},
];

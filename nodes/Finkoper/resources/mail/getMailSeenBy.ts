import type { INodeProperties } from 'n8n-workflow';
import { postIdProperty } from '../../shared';

const showOnlyForGetMailSeenBy = {
	operation: ['getMailSeenBy'],
	resource: ['mail'],
};

export const mailGetMailSeenByDescription: INodeProperties[] = [
	{
		...postIdProperty,
		displayName: 'Mail Post ID',
		displayOptions: { show: showOnlyForGetMailSeenBy },
		description: 'The ID of the mail post to check seen status for',
	},
];

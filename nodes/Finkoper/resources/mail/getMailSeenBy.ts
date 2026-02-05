import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGetMailSeenBy = {
	operation: ['getMailSeenBy'],
	resource: ['mail'],
};

export const mailGetMailSeenByDescription: INodeProperties[] = [
	{
		displayName: 'Mail Post ID',
		name: 'postId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForGetMailSeenBy },
		description: 'The ID of the mail post to check seen status for',
	},
];

import type { INodeProperties } from 'n8n-workflow';
import { accountIdProperty, mailboxIdProperty, bookkeeperTeamIdProperty, postIdProperty } from '../../shared';

const showOnlyForMarkSeen = {
	operation: ['markSeen'],
	resource: ['mail'],
};

export const mailMarkSeenDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForMarkSeen },
	},
	{
		...accountIdProperty,

		displayOptions: { show: showOnlyForMarkSeen },
	},
	{
		...mailboxIdProperty,
		displayOptions: { show: showOnlyForMarkSeen },
	},
	{
		...postIdProperty,
		displayOptions: {
			show: showOnlyForMarkSeen,
		},
		description: 'The ID of the email post to mark as seen',
	},
];

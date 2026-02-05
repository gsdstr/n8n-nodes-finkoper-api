import type { INodeProperties } from 'n8n-workflow';
import { accountIdProperty, mailboxIdProperty } from '../../shared';

const showOnlyForGetPosts = {
	operation: ['getPosts'],
	resource: ['mail'],
};

export const mailGetPostsDescription: INodeProperties[] = [
	{
		...accountIdProperty,
		displayOptions: { show: showOnlyForGetPosts },
	},
	{
		...mailboxIdProperty,
		displayOptions: { show: showOnlyForGetPosts },
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: showOnlyForGetPosts,
		},
		options: [
			{
				displayName: 'Unread Only',
				name: 'unread',
				type: 'boolean',
				default: false,
				description: 'Whether to return only unread posts',
			},
			{
				displayName: 'After ID',
				name: 'afterId',
				type: 'string',
				default: '',
				description: 'Return posts after this ID (cursor-based pagination)',
			},
		],
	},
];

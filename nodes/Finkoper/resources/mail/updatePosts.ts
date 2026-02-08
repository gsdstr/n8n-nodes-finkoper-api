import type { INodeProperties } from 'n8n-workflow';
import { accountIdProperty, bookkeeperTeamIdProperty } from '../../shared';

const showOnlyForUpdatePosts = {
	operation: ['updatePosts'],
	resource: ['mail'],
};

export const mailUpdatePostsDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForUpdatePosts },
	},
	{
		...accountIdProperty,
		displayOptions: { show: showOnlyForUpdatePosts },
	},
	{
		displayName: 'Post IDs',
		name: 'posts',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUpdatePosts,
		},
		description: 'The IDs of the email posts to update (comma-separated)',
	},
	{
		displayName: 'Customer IDs',
		name: 'customers',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUpdatePosts,
		},
		description: 'The IDs of the customers to assign (comma-separated)',
	},
];

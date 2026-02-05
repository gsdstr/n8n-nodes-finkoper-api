import type { INodeProperties } from 'n8n-workflow';

export const mailGetMailboxesDescription: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['getMailboxes'],
			},
		},
		default: '',
		description: 'The ID of the mail account',
	},
];

export const mailGetPostsDescription: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['getPosts'],
			},
		},
		default: '',
		description: 'The ID of the mail account',
	},
	{
		displayName: 'Mailbox ID',
		name: 'mailboxId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['getPosts'],
			},
		},
		default: '',
		description: 'The ID of the mailbox',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['getPosts'],
			},
		},
		options: [
			{
				displayName: 'Unread Only',
				name: 'unreadOnly',
				type: 'boolean',
				default: false,
				description: 'Whether to return only unread posts',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
			},
		],
	},
];

export const mailGetCredentialsDescription: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['getCredentials'],
			},
		},
		default: '',
		description: 'The ID of the mail account',
	},
];

export const mailMarkSeenDescription: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['markSeen'],
			},
		},
		default: '',
		description: 'The ID of the mail account',
	},
	{
		displayName: 'Mailbox ID',
		name: 'mailboxId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['markSeen'],
			},
		},
		default: '',
		description: 'The ID of the mailbox',
	},
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['markSeen'],
			},
		},
		default: '',
		description: 'The ID of the email post',
	},
];

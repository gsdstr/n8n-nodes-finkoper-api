import type { INodeProperties } from 'n8n-workflow';
import {
	mailGetMailboxesDescription,
	mailGetPostsDescription,
	mailGetCredentialsDescription,
	mailMarkSeenDescription,
} from './mail.description';

const showOnlyForMail = {
	resource: ['mail'],
};

export const mailDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForMail,
		},
		options: [
			{
				name: 'Get Mailboxes',
				value: 'getMailboxes',
				action: 'Get mailboxes for an account',
				description: 'Get all mailboxes for a mail account',
			},
			{
				name: 'Get Posts',
				value: 'getPosts',
				action: 'Get posts from a mailbox',
				description: 'Get email posts from a specific mailbox',
			},
			{
				name: 'Get Credentials',
				value: 'getCredentials',
				action: 'Get mail account credentials',
				description: 'Get credentials for a mail account',
			},
			{
				name: 'Mark Seen',
				value: 'markSeen',
				action: 'Mark a post as seen',
				description: 'Mark an email post as seen/read',
			},
		],
		default: 'getMailboxes',
	},
	...mailGetMailboxesDescription,
	...mailGetPostsDescription,
	...mailGetCredentialsDescription,
	...mailMarkSeenDescription,
];

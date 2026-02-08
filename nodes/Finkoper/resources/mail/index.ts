import type { INodeProperties } from 'n8n-workflow';
import { mailGetMailboxesDescription } from './getMailboxes';
import { mailGetPostsDescription } from './getPosts';
import { mailGetCredentialsDescription } from './getCredentials';
import { mailMarkSeenDescription } from './markSeen';
import { mailGetMailboxCountersDescription } from './getMailboxCounters';
import { mailGetMailSeenByDescription } from './getMailSeenBy';
import { mailGetMailDescription } from './getMail';
import { mailUpdatePostsDescription } from './updatePosts';

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
				name: 'Get Mailbox Counters',
				value: 'getMailboxCounters',
				action: 'Get counters for mailboxes',
				description: 'Get new and total message counters for mailboxes',
			},
			{
				name: 'Get Mailboxes',
				value: 'getMailboxes',
				action: 'Get mailboxes for an account',
				description: 'Get all mailboxes (tree view) for a mail account',
			},
			{
				name: 'Get Mail',
				value: 'getMail',
				action: 'Get a single mail post',
				description: 'Get detailed information for a single email post',
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
				description: 'Get credentials for mail accounts',
			},
			{
				name: 'Mark Seen',
				value: 'markSeen',
				action: 'Mark a post as seen',
				description: 'Mark an email post as seen/read',
			},
			{
				name: 'Get Mail Seen By',
				value: 'getMailSeenBy',
				action: 'Get users who saw a post',
				description: 'Get a list of users who have viewed a specific email post',
			},
			{
				name: 'Update Posts',
				value: 'updatePosts',
				action: 'Update posts',
				description: 'Update one or more email posts (e.g. assign to customers)',
			},
		],
		default: 'getMailboxes',
	},
	...mailGetMailboxesDescription,
	...mailGetPostsDescription,
	...mailGetCredentialsDescription,
	...mailMarkSeenDescription,
	...mailGetMailboxCountersDescription,
	...mailGetMailSeenByDescription,
	...mailGetMailDescription,
	...mailUpdatePostsDescription,
];

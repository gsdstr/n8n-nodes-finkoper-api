import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function getMailboxes(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	return (await client.mail.getMailboxes({ accountId, bookkeeperTeamId })) as unknown as IDataObject[];
}

export async function getMailboxCounters(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	return (await client.mail.getMailboxCounters({ accountId, bookkeeperTeamId })) as unknown as IDataObject[];
}

export async function getPosts(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	const mailboxId = ef.getNodeParameter('mailboxId', itemIndex) as string;
	const filters = ef.getNodeParameter('filters', itemIndex, {}) as IDataObject;
	return (await client.mail.getPosts({
		accountId,
		bookkeeperTeamId,
		mailboxIds: mailboxId,
		unread: filters.unread as boolean | undefined,
		afterId: filters.afterId as string | undefined,
	})) as unknown as IDataObject[];
}

export async function getMailSeenBy(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	const postId = ef.getNodeParameter('postId', itemIndex) as string;
	return (await client.mail.getMailSeenBy(postId)) as unknown as IDataObject[];
}

export async function getCredentials(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	return (await client.mail.getCredentials(bookkeeperTeamId)) as unknown as IDataObject[];
}

export async function markSeen(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject> {
	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	const mailboxId = ef.getNodeParameter('mailboxId', itemIndex) as string;
	const postId = ef.getNodeParameter('postId', itemIndex) as string;
	return (await client.mail.markSeen({
		accountId,
		bookkeeperTeamId,
		seen: true,
		items: [
			{
				From: mailboxId,
				Posts: [postId],
			},
		],
	})) as unknown as IDataObject;
}

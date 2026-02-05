import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function executeMailOperation(
	this: IExecuteFunctions,
	client: FinkoperClient,
	operation: string,
	itemIndex: number,
	bookkeeperTeamId: string,
): Promise<unknown> {
	switch (operation) {
		case 'getMailboxes': {
			const accountId = this.getNodeParameter('accountId', itemIndex) as string;
			return client.mail.getMailboxes(accountId);
		}
		case 'getPosts': {
			const accountId = this.getNodeParameter('accountId', itemIndex) as string;
			const mailboxId = this.getNodeParameter('mailboxId', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as IDataObject;
			return client.mail.getPosts({
				accountId,
				mailboxId,
				...additionalFields,
			});
		}
		case 'getCredentials': {
			return client.mail.getCredentials(bookkeeperTeamId);
		}
		case 'markSeen': {
			const accountId = this.getNodeParameter('accountId', itemIndex) as string;
			const mailboxId = this.getNodeParameter('mailboxId', itemIndex) as string;
			const postId = this.getNodeParameter('postId', itemIndex) as string;
			return client.mail.markSeen({
				accountId,
				bookkeeperTeamId,
				seen: true,
				items: [
					{
						From: mailboxId,
						Posts: [postId],
					},
				],
			});
		}
		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation "${operation}" for mail is not supported`,
				{ itemIndex },
			);
	}
}

import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function mailboxes(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient
): Promise<IDataObject[]> {
	const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
	const res = await client.mail.getMailboxes(accountId);
	return res as unknown as IDataObject[];
}

import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function posts(
  ef: IExecuteFunctions,
  itemIndex: number,
  client: FinkoperClient
): Promise<IDataObject[]> {
  const accountId = ef.getNodeParameter('accountId', itemIndex) as string;
  const mailboxId = ef.getNodeParameter('mailboxId', itemIndex) as string;
  const afterId = ef.getNodeParameter('afterId', itemIndex) as string;
  const unread = ef.getNodeParameter('unread', itemIndex) as boolean;

  const res = await client.mail.getPosts({
    accountId,
    mailboxId,
    afterId,
    unread,
  });

  if (!res || Object.keys(res).length === 0) return [];
  return res as unknown as IDataObject[];
}

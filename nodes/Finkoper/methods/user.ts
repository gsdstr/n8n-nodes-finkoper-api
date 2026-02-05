import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function getCompany(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	return (await client.user.getCompany(bookkeeperTeamId)) as unknown as IDataObject[];
}

export async function getInfo(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject> {
	return (await client.user.info()) as unknown as IDataObject;
}

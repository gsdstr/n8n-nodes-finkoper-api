import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function list(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	return (await client.role.list(bookkeeperTeamId)) as unknown as IDataObject[];
}

export async function getUsers(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	return (await client.role.getUsers(bookkeeperTeamId)) as unknown as IDataObject[];
}

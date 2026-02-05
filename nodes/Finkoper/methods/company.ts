import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';


export async function list(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject[]> {
	return (await client.company.list()) as unknown as IDataObject[];
}

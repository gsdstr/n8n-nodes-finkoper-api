import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function list(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject> { //TODO: change to INodeListSearchResult
	const filters = ef.getNodeParameter('filters', itemIndex, {}) as IDataObject;
	return (await client.task.list({
		bookkeeperTeamId,
		listMode: (filters.listMode as string) || 'all',
		taskType: (filters.taskType as string) || 'all',
		status: filters.status as string | undefined,
		dateFrom: filters.dateFrom as string | undefined,
		dateTo: filters.dateTo as string | undefined,
		page: filters.page as number | undefined,
		perPage: filters.perPage as number | undefined,
	})) as unknown as IDataObject;
}

export async function create(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
): Promise<IDataObject> {
	const text = ef.getNodeParameter('text', itemIndex) as string;
	const assignees = ef.getNodeParameter('assignees', itemIndex) as string[];
	const additionalFields = ef.getNodeParameter('additionalFields', itemIndex, {}) as IDataObject;
	return (await client.task.create({
		bookkeeperTeamId,
		text,
		assignees,
		priority: additionalFields.priority as 'low' | 'mid' | 'high' | undefined,
		dateBegin: additionalFields.dateBegin as string | undefined,
		dateEnd: additionalFields.dateEnd as string | undefined,
		status: additionalFields.status as string | undefined,
	})) as unknown as IDataObject;
}

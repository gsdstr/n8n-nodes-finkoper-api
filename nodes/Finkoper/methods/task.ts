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
	const mailPostId = additionalFields.mailPostId as string | undefined;
	return (await client.task.create({
		bookkeeperTeamId,
		text,
		assignees,
		priority: additionalFields.priority as 'low' | 'mid' | 'high' | undefined,
		dateBegin: additionalFields.dateBegin as string | undefined,
		dateEnd: additionalFields.dateEnd as string | undefined,
		status: additionalFields.status as string | undefined,
		mailPostId,
		bulk_for_teams: additionalFields.bulkForTeams as boolean | undefined,
		teams: (additionalFields.teams as string)
			? { by_team_id: (additionalFields.teams as string).split(',').map((s) => s.trim()) }
			: undefined,
		checklists: additionalFields.checklistsJson
			? typeof additionalFields.checklistsJson === 'string'
				? JSON.parse(additionalFields.checklistsJson)
				: additionalFields.checklistsJson
			: undefined,
	})) as unknown as IDataObject;
}

export async function deleteTask(
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	_bookkeeperTeamId: string,
): Promise<IDataObject> {
	const taskId = ef.getNodeParameter('taskId', itemIndex) as string;
	await client.task.delete(taskId);
	return { success: true };
}

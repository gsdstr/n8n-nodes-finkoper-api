import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function executeTaskOperation(
	this: IExecuteFunctions,
	client: FinkoperClient,
	operation: string,
	itemIndex: number,
	bookkeeperTeamId: string,
): Promise<unknown> {
	switch (operation) {
		case 'list': {
			const filters = this.getNodeParameter('filters', itemIndex, {}) as IDataObject;
			return client.task.list({
				bookkeeperTeamId,
				listMode: (filters.listMode as string) || 'all',
				taskType: (filters.taskType as string) || 'all',
				status: filters.status as string | undefined,
				dateFrom: filters.dateFrom as string | undefined,
				dateTo: filters.dateTo as string | undefined,
				page: filters.page as number | undefined,
				perPage: filters.perPage as number | undefined,
			});
		}
		case 'create': {
			const text = this.getNodeParameter('text', itemIndex) as string;
			const assignees = this.getNodeParameter('assignees', itemIndex) as string[];
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as IDataObject;
			return client.task.create({
				bookkeeperTeamId,
				text,
				assignees,
				priority: additionalFields.priority as 'low' | 'mid' | 'high' | undefined,
				dateBegin: additionalFields.dateBegin as string | undefined,
				dateEnd: additionalFields.dateEnd as string | undefined,
				status: additionalFields.status as string | undefined,
			});
		}
		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation "${operation}" for task is not supported`,
				{ itemIndex },
			);
	}
}

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
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as IDataObject;
			return client.task.list({
				bookkeeperTeamId,
				listMode: (additionalFields.listMode as string) || 'all',
				taskType: (additionalFields.taskType as string) || 'all',
				...additionalFields,
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
				...additionalFields,
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

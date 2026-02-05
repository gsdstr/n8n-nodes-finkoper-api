import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function executeRoleOperation(
	this: IExecuteFunctions,
	client: FinkoperClient,
	operation: string,
	_itemIndex: number,
	bookkeeperTeamId: string,
): Promise<unknown> {
	switch (operation) {
		case 'list': {
			return client.role.list(bookkeeperTeamId);
		}
		case 'getUsers': {
			return client.role.getUsers(bookkeeperTeamId);
		}
		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation "${operation}" for role is not supported`,
				{ itemIndex: _itemIndex },
			);
	}
}

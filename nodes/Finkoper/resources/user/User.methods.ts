import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function executeUserOperation(
	this: IExecuteFunctions,
	client: FinkoperClient,
	operation: string,
	_itemIndex: number,
	bookkeeperTeamId: string,
): Promise<unknown> {
	switch (operation) {
		case 'getCompany': {
			return client.user.getCompany(bookkeeperTeamId);
		}
		case 'getInfo': {
			return client.user.info();
		}
		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation "${operation}" for user is not supported`,
				{ itemIndex: _itemIndex },
			);
	}
}

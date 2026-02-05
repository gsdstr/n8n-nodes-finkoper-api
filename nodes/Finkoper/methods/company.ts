import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function executeCompanyOperation(
	this: IExecuteFunctions,
	client: FinkoperClient,
	operation: string,
	itemIndex: number,
	_bookkeeperTeamId: string,
): Promise<unknown> {
	switch (operation) {
		case 'list': {
			return client.company.list();
		}
		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation "${operation}" for company is not supported`,
				{ itemIndex },
			);
	}
}

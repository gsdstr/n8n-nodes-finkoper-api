import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

export async function executeCustomerOperation(
	this: IExecuteFunctions,
	client: FinkoperClient,
	operation: string,
	itemIndex: number,
	bookkeeperTeamId: string,
): Promise<unknown> {
	switch (operation) {
		case 'list': {
			return client.customer.list(bookkeeperTeamId);
		}
		case 'getDetails': {
			const customerId = this.getNodeParameter('customerId', itemIndex) as string;
			return client.customer.get(customerId);
		}
		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation "${operation}" for customer is not supported`,
				{ itemIndex },
			);
	}
}

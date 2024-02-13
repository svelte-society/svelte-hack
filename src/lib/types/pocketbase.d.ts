import type { Submission } from '$lib/server/submissions'
import type { RecordService } from 'pocketbase'
import type Pocketbase from 'pocketbase'

export interface BaseTable {
	id: string
	created: string
	updated: string
}

/**
 * When creating a row in pocket base wrap the type in this to remove specific fields
 *
 * @example
 * ```ts
 * await pb_admin.collection('table').create<TableType>({
 *     something: true
 * } satisfies Insert<TableType>);
 * ```
 */
export type Insert<Table extends BaseTable> = Omit<Table, keyof BaseTable>

export interface TypedPocketBase extends Pocketbase {
	collection(idOrName: string): RecordService
	collection(idOrName: 'users'): RecordService<UsersTable>
	collection(idOrName: 'submissions'): RecordService<SubmissionsTable>
}

// * Tables

export interface UsersTable extends BaseTable {
	email: string
	name: string
	verified: boolean
	listmonkId: number
	newsletter: boolean
	customerId: string
}

export type SubmissionsTable = BaseTable & Submission

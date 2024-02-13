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

export interface UsersTable extends BaseTable {
	email: string
	name: string
	verified: boolean
	listmonkId: number
	newsletter: boolean
	customerId: string
}

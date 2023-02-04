
import { UserFactory } from "../factories/userFactory";
import { TaskStatusFacroty } from "../factories/taskStatusFactory";

/**
 * 初期レコード作成 test実行前に使用してください
 */
export const allCreate = (async(params: {userCount: number}): Promise<void>=>{
  await TaskStatusFacroty.create();
  await UserFactory.create(params.userCount);
});

/**
 * 全TBLレコード削除 test完了後に使用してください
 */
export const allDelete = (async(): Promise<void>=>{
  await UserFactory.allRecordsDelete();
  await TaskStatusFacroty.allRecordsDelete();
});

/**
 * 初期レコード作成(変更されないTBLは除く) beforeEachなど毎度レコードを挿入する際に使用してください。
 */
export const createEach = (async(params: {userCount: number}): Promise<void>=> {
  await UserFactory.create(params.userCount);
});

/**
 * 全TBLレコード削除(変更されないTBLは除く) beforeEachなど毎度レコードを削除する際に使用してください。
 */
export const deleteEach = (async(): Promise<void>=> {
  await UserFactory.allRecordsDelete();
});
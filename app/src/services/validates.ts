import { defineRule } from 'vee-validate';
import { required, email, confirmed } from '@vee-validate/rules';

/* この関数を実行することでルールを追加できる */
function defineGlobalRules(): void {
  defineRule('required', customRequired);
  defineRule('email', customEmail);
  defineRule('endDateValidate', endDateValidate);
  defineRule('confirmed', customComfirmed);
}

function customRequired(value: any): any{
  if (!required(value)) return '必須項目です';
  return true;
}

function customEmail(value: any): any{
  if (!email(value)) return '正しいEmailを入力してください';
  return true;
}

function customComfirmed(value: any, target: any): any {
  if (!confirmed(value, target)) return 'PasswordとPasswordComfirmationに相違があります';
  return true;
}

function endDateValidate(endDate: Date, [startDate]: [Date]): any {
  if (!endDate || !startDate) return true;
  if (endDate < startDate) return '終了日は開始日以降を入力してください';
  return true;
}

export {defineGlobalRules};
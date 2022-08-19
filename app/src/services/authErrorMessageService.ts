const errorMessages:Map<string, string> = new Map<string, string>([
  ['auth/user-not-found', 'EmailもしくはPasswordが正しくありません'],
  ['auth/invalid-email', 'Emailが正しくありません'],
  ['auth/email-already-in-use', 'Emailはすでに利用されています'],
  ['auth/invalid-password', 'Passwordが有効ではありません6文字の文字列を入力してください'],
  ['auth/weak-password', 'Passwordが有効ではありません6文字の文字列を入力してください'],
]);

function getErrorMessage(errorCode: string): string|undefined {
  return errorMessages.get(errorCode);
}

export {getErrorMessage}
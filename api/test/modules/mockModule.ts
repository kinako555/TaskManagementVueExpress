/*
 * firebasae authプロパティのmock設定を行う
 * testでは実際にfirebase authにはアクセスしない 
 * return: mock設定を行ったspyインスタンス
 */
export const setFirebaseAuthMock = ((userPamaras: {uid: string, name: string}):jest.SpyInstance<any, unknown[], any> => {
  const firebaseAuth = require("firebase-admin/auth");
  const mockVerifyIdToken = jest.fn().mockResolvedValue({ uid: userPamaras.uid });
  const mockGetUser = jest.fn().mockResolvedValue({ uid: userPamaras.uid, displayName: userPamaras.name });
  return jest.spyOn(firebaseAuth, "getAuth").mockReturnValue({ verifyIdToken: mockVerifyIdToken, getUser: mockGetUser });
});
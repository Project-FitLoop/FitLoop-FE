import { instance } from '@/config/apiConfig';

export interface AccountPayload {
  bankName: string;
  accountNumber: string;
  depositor: string;
}


export async function saveAccountSetting(payload: AccountPayload): Promise<void> {
  await instance.post("/profile/account", payload);
}

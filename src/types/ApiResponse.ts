import { IMessage } from "@/model/Message";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptionMessage?: boolean;
  messages?: Array<IMessage>;
}

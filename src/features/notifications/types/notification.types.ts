export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  requestId?:  string; 
}
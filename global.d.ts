import en from './messages/en.json';
import vi from './messages/vi.json';

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}

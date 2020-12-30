import { ServiceStatus } from 'src/app/shared/models/service-status';
import { Bookmark } from './bookmark';

export interface BookmarksState {
    status: ServiceStatus;
    bookmarks: Bookmark[];
}

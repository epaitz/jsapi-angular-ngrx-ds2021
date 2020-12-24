import { Subject } from 'rxjs';
import { ServiceStatus } from '../models/service-status';
import { ServiceStatusTypes } from '../models/service-status.types';

abstract class BaseService {
    protected updateStatus(statusSubjet: Subject<ServiceStatus>, type: ServiceStatusTypes, error = null): void {
        statusSubjet.next(new ServiceStatus(type, error));
    }
}

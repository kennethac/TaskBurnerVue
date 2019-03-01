import { Dictionary } from 'vue-router/types/router';
import ClassInfo from './class-info';

export default interface RootStore {
    classData : Dictionary<ClassInfo>;
}
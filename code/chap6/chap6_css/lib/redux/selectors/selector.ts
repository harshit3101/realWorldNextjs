import { useSelector, shallowEqual } from 'react-redux';

export function useStoreSelector() {
    return useSelector<any, any>((state) => state, shallowEqual);
}
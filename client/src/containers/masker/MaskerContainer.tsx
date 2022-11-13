import React from 'react';

import { useAppSelector } from '../../app/hooks';

import Masker from '../../components/util/Masker';
import { isShowingMasker } from './maskerSlice';

const MaskerContainer = () => {
    const open = useAppSelector(isShowingMasker);

    return (
        <Masker open={open} />
    );
};

export default MaskerContainer;

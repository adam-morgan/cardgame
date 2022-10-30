import React from 'react';

import { PlayingCard } from '@cardgame/common';

import { ReactComponent as TwoClubs } from './svg/2C.svg';
import { ReactComponent as TwoHearts } from './svg/2H.svg';
import { ReactComponent as TwoSpades } from './svg/2S.svg';
import { ReactComponent as TwoDiamonds } from './svg/2D.svg';
import { ReactComponent as ThreeClubs } from './svg/3C.svg';
import { ReactComponent as ThreeHearts } from './svg/3H.svg';
import { ReactComponent as ThreeSpades } from './svg/3S.svg';
import { ReactComponent as ThreeDiamonds } from './svg/3D.svg';
import { ReactComponent as FourClubs } from './svg/4C.svg';
import { ReactComponent as FourHearts } from './svg/4H.svg';
import { ReactComponent as FourSpades } from './svg/4S.svg';
import { ReactComponent as FourDiamonds } from './svg/4D.svg';
import { ReactComponent as FiveClubs } from './svg/5C.svg';
import { ReactComponent as FiveHearts } from './svg/5H.svg';
import { ReactComponent as FiveSpades } from './svg/5S.svg';
import { ReactComponent as FiveDiamonds } from './svg/5D.svg';
import { ReactComponent as SixClubs } from './svg/6C.svg';
import { ReactComponent as SixHearts } from './svg/6H.svg';
import { ReactComponent as SixSpades } from './svg/6S.svg';
import { ReactComponent as SixDiamonds } from './svg/6D.svg';
import { ReactComponent as SevenClubs } from './svg/7C.svg';
import { ReactComponent as SevenHearts } from './svg/7H.svg';
import { ReactComponent as SevenSpades } from './svg/7S.svg';
import { ReactComponent as SevenDiamonds } from './svg/7D.svg';
import { ReactComponent as EightClubs } from './svg/8C.svg';
import { ReactComponent as EightHearts } from './svg/8H.svg';
import { ReactComponent as EightSpades } from './svg/8S.svg';
import { ReactComponent as EightDiamonds } from './svg/8D.svg';
import { ReactComponent as NineClubs } from './svg/9C.svg';
import { ReactComponent as NineHearts } from './svg/9H.svg';
import { ReactComponent as NineSpades } from './svg/9S.svg';
import { ReactComponent as NineDiamonds } from './svg/9D.svg';
import { ReactComponent as TenClubs } from './svg/TC.svg';
import { ReactComponent as TenHearts } from './svg/TH.svg';
import { ReactComponent as TenSpades } from './svg/TS.svg';
import { ReactComponent as TenDiamonds } from './svg/TD.svg';
import { ReactComponent as JackClubs } from './svg/JC.svg';
import { ReactComponent as JackHearts } from './svg/JH.svg';
import { ReactComponent as JackSpades } from './svg/JS.svg';
import { ReactComponent as JackDiamonds } from './svg/JD.svg';
import { ReactComponent as QueenClubs } from './svg/QC.svg';
import { ReactComponent as QueenHearts } from './svg/QH.svg';
import { ReactComponent as QueenSpades } from './svg/QS.svg';
import { ReactComponent as QueenDiamonds } from './svg/QD.svg';
import { ReactComponent as KingClubs } from './svg/KC.svg';
import { ReactComponent as KingHearts } from './svg/KH.svg';
import { ReactComponent as KingSpades } from './svg/KS.svg';
import { ReactComponent as KingDiamonds } from './svg/KD.svg';
import { ReactComponent as AceClubs } from './svg/AC.svg';
import { ReactComponent as AceHearts } from './svg/AH.svg';
import { ReactComponent as AceSpades } from './svg/AS.svg';
import { ReactComponent as AceDiamonds } from './svg/AD.svg';

const components: { [card: string ]: React.ComponentType} = {
    '2c': TwoClubs,
    '2h': TwoHearts,
    '2s': TwoSpades,
    '2d': TwoDiamonds,
    '3c': ThreeClubs,
    '3h': ThreeHearts,
    '3s': ThreeSpades,
    '3d': ThreeDiamonds,
    '4c': FourClubs,
    '4h': FourHearts,
    '4s': FourSpades,
    '4d': FourDiamonds,
    '5c': FiveClubs,
    '5h': FiveHearts,
    '5s': FiveSpades,
    '5d': FiveDiamonds,
    '6c': SixClubs,
    '6h': SixHearts,
    '6s': SixSpades,
    '6d': SixDiamonds,
    '7c': SevenClubs,
    '7h': SevenHearts,
    '7s': SevenSpades,
    '7d': SevenDiamonds,
    '8c': EightClubs,
    '8h': EightHearts,
    '8s': EightSpades,
    '8d': EightDiamonds,
    '9c': NineClubs,
    '9h': NineHearts,
    '9s': NineSpades,
    '9d': NineDiamonds,
    'tc': TenClubs,
    'th': TenHearts,
    'ts': TenSpades,
    'td': TenDiamonds,
    'jc': JackClubs,
    'jh': JackHearts,
    'js': JackSpades,
    'jd': JackDiamonds,
    'qc': QueenClubs,
    'qh': QueenHearts,
    'qs': QueenSpades,
    'qd': QueenDiamonds,
    'kc': KingClubs,
    'kh': KingHearts,
    'ks': KingSpades,
    'kd': KingDiamonds,
    'ac': AceClubs,
    'ah': AceHearts,
    'as': AceSpades,
    'ad': AceDiamonds
};

export const renderComponent = (card: PlayingCard) => {
    const Component = components[card.abbr];
    return <Component />;
};
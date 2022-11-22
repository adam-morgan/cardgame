import React from 'react';

interface SmallBannerContextVal {
    setSmallBanner: (small: boolean) => void
}

export const SmallBannerContext = React.createContext<SmallBannerContextVal>({} as SmallBannerContextVal);

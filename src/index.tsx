import React, { ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import ScrollBooster, { ScrollBoosterOptions } from 'scrollbooster';

export interface ScrollBoostOptions extends Omit<ScrollBoosterOptions, 'viewport' | 'content'> {
    content?: RefObject<HTMLElement>;
}

export interface ScrollBoostProps {
    viewport: (node: HTMLElement | null) => void;
    scrollbooster: ScrollBooster | null;
}

/**
 * Returns ref values for the viewport and the scrollbooster instance
 */
const useScrollBoost = <T extends HTMLElement>(options: ScrollBoostOptions = {}) => {
    const scrollBooster = useRef<ScrollBooster | null>(null);
    const [scrollBoosterState, setScrollBoosterState] = useState(scrollBooster.current);

    // options shouldn't change within the hook but can be changed on the scrollBooster instance
    const optionsRef = useRef(options);
    const viewport = useCallback((node: T | null) => {
        if (node) {
            const { content, ...rest } = optionsRef.current;
            const sbOptions: ScrollBoosterOptions = { viewport: node, ...rest };

            if (content?.current) {
                sbOptions.content = content.current;
            }

            // create the scrollbooster instance
            scrollBooster.current = new ScrollBooster(sbOptions);
            setScrollBoosterState(scrollBooster.current);
        }
    }, []);

    useEffect(() => {
        // clear the scrollbooster eventlisteners
        return () => scrollBooster.current?.destroy();
    }, []);

    return [viewport, scrollBoosterState] as const;
};

export interface ScrollBoostConfig extends Omit<ScrollBoostOptions, 'viewport' | 'onUpdate' | 'content'> {
    children: (props: ScrollBoostProps) => ReactNode;
}

function ScrollBoost({ children, ...options }: ScrollBoostConfig) {
    const [viewport, scrollbooster] = useScrollBoost(options);
    return <>{children({ viewport, scrollbooster })}</>;
}

export { useScrollBoost, ScrollBoost };

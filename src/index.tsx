import React, { ReactNode, RefObject, useCallback, useRef, useEffect } from 'react';
import ScrollBooster, { ScrollBoosterOptions } from 'scrollbooster';

interface ScrollBoostOptions extends Omit<ScrollBoosterOptions, 'viewport' | 'content'> {
    content?: RefObject<HTMLElement>;
}

interface ScrollBoostProps {
    viewport: (node: HTMLElement | null) => void;
    scrollbooster: ScrollBooster | null | undefined;
}

/**
 * Returns ref values for the viewport and the scrollbooster instance
 */
const useScrollBoost = <T extends HTMLElement>(options: ScrollBoostOptions = {}) => {
    const scrollBooster = useRef<ScrollBooster | null>();
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
        }
    }, []);

    useEffect(() => {
        // clear the scrollbooster eventlisteners
        return () => scrollBooster.current?.destroy();
    }, []);

    return [viewport, scrollBooster.current] as const;
};

interface ScrollBoostConfig extends Omit<ScrollBoostOptions, 'viewport' | 'onUpdate' | 'content'> {
    children: (props: ScrollBoostProps) => ReactNode;
}

function ScrollBoost({ children, ...options }: ScrollBoostConfig) {
    const [viewport, scrollbooster] = useScrollBoost(options);
    return <>{children({ viewport, scrollbooster })}</>;
}

export { useScrollBoost, ScrollBoost };

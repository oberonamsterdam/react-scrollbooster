import React, { useCallback, useRef, useState, MutableRefObject, ReactNode } from 'react';
import ScrollBooster, { ScrollBoosterOptions, ScrollingState } from 'scrollbooster';

interface ScrollBoostOptions<T extends HTMLElement>
    extends Omit<ScrollBoosterOptions, 'viewport' | 'onUpdate' | 'content'> {
    onUpdate?: (state: ScrollingState, node: T) => void;
}

interface ScrollBoostProps<T extends HTMLElement> {
    viewport: (node: T | null) => void;
    content: MutableRefObject<T | null>;
    scrollbooster: ScrollBooster | null;
}

/**
 * Returns ref values for the viewport, the content and the scrollbooster instance
 */
const useScrollBoost = <T extends HTMLElement>(options: ScrollBoostOptions<T> = {}) => {
    const content = useRef<T | null>(null);
    const [scrollBooster, setScrollBooster] = useState<ScrollBooster | null>(null);
    const viewport = useCallback(
        (node: T | null) => {
            if (scrollBooster) {
                // clear the scrollbooster eventListeners.
                scrollBooster.destroy();
            }
            if (node && !scrollBooster) {
                const { onUpdate, ...rest } = options;
                setScrollBooster(
                    new ScrollBooster({
                        viewport: node,
                        content: content.current ?? node,
                        onUpdate: state => onUpdate?.(state, node),
                        ...rest,
                    })
                );
            }
        },
        [scrollBooster, options]
    );

    return [viewport, content, scrollBooster] as const;
};

interface ScrollBoostConfig<T extends HTMLElement>
    extends Omit<ScrollBoostOptions<T>, 'viewport' | 'onUpdate' | 'content'> {
    children: (props: ScrollBoostProps<T>) => ReactNode;
}

function ScrollBoost<T extends HTMLElement>({ children, ...options }: ScrollBoostConfig<T>) {
    const [viewport, content, scrollbooster] = useScrollBoost<T>(options);
    return <>{children({ viewport, content, scrollbooster })}</>;
}

export { useScrollBoost, ScrollBoost, ScrollBoostOptions };

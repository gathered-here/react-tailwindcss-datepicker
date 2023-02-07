import { DPBGColor, DPBorderColor, DPButtonColor, DPColors, DPRingColor, DPTextColor } from "types";
export declare const DEFAULT_COLORS: DPColors;
export declare const DEFAULT_COLOR = "blue";
export declare const DEFAULT_BG_COLOR: DPBGColor;
export declare const DEFAULT_TEXT_COLOR: DPTextColor;
export declare const DEFAULT_BORDER_COLOR: DPBorderColor;
export declare const DEFAULT_RING_COLOR: DPRingColor;
export declare const DEFAULT_BUTTON_COLOR: DPButtonColor;
export declare const DEFAULT_SHORTCUTS: {
    today: {
        text: string;
        period: {
            start: string;
            end: string;
        };
    };
    yesterday: {
        text: string;
        period: {
            start: string;
            end: string;
        };
    };
    past: {
        daysNumber: number;
        text: string;
        period: {
            start: string;
            end: string;
        };
    }[];
    currentMonth: {
        text: string;
        period: {
            start: string;
            end: string;
        };
    };
    pastMonth: {
        text: string;
        period: {
            start: string;
            end: string;
        };
    };
};

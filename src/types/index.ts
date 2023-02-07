export type DPColors = string[];
export type DPColorToClass = { [color: string]: string };
export type DPColorToClassMap<T extends string | number | symbol> = {
    [shade in T]: DPColorToClass;
};

export type DPBGColor = DPColorToClassMap<100 | 200 | 500 | "hover">;
export type DPTextColor = DPColorToClassMap<500 | 600 | "hover">;
export type DPBorderColor = DPColorToClassMap<500 | "focus">;
export type DPRingColor = DPColorToClassMap<"focus" | "second-focus">;
export type DPButtonColor = DPColorToClassMap<"focus">;

export interface Period {
    start: string | null;
    end: string | null;
}

export interface DatePickerShortcuts {
    today?: string;
    yesterday?: string;
    past?: (period: number) => string;
    currentMonth?: string;
    pastMonth?: string;
}

export interface DatePickerFooter {
    cancel?: string;
    apply?: string;
}

export interface Configs {
    shortcuts?: DatePickerShortcuts | null;
    footer?: DatePickerFooter | null;
    colors?: Partial<{
        bg: DPBGColor;
        border: DPBorderColor;
        button: DPButtonColor;
        custom: DPColors;
        ring: DPRingColor;
        text: DPTextColor;
    }>;
}

export interface ShortcutsItem {
    text?: string;
    daysNumber?: number;
    period?: {
        start: string;
        end: string;
    };
}

export type DateType = string | null | Date;

export type DateRangeType = {
    startDate: DateType;
    endDate: DateType;
};

export type DateValueType = DateRangeType | null;

export type ClassNamesTypeProp = {
    container: (p?: object | null | undefined) => string | undefined;
    input: (p?: object | null | undefined) => string | undefined;
    toggleButton: (p?: object | null | undefined) => string | undefined;
    footer: (p?: object | null | undefined) => string | undefined;
};

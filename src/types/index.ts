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
        bg: { [key in keyof DPBGColor]: string };
        border: { [key in keyof DPBorderColor]: string };
        button: { [key in keyof DPButtonColor]: string };
        ring: { [key in keyof DPRingColor]: string };
        text: { [key in keyof DPTextColor]: string };
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

export type RootClassNamesBG = Record<"container" | "input", string>;
export type RootClassNamesBorder = Record<"container" | "calendar" | "input", string>;
export type RootClassNamesButton = Record<string, string>;
export type RootClassNamesRing = Record<string, string>;
export type RootClassNamesText = Record<"placeholder" | "body" | "input", string>;

export type RootClassNamesType = {
    bg: RootClassNamesBG;
    border: RootClassNamesBorder;
    button: RootClassNamesButton;
    ring: RootClassNamesRing;
    text: RootClassNamesText;
};

export type ClassNamesTypeProp = Partial<
    {
        container: (p?: object | null | undefined) => string | undefined;
        input: (p?: object | null | undefined) => string | undefined;
        toggleButton: (p?: object | null | undefined) => string | undefined;
        footer: (p?: object | null | undefined) => string | undefined;
    } & RootClassNamesType
>;

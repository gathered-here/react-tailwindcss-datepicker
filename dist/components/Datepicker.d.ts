import React from "react";
import { ClassNamesTypeProp, Configs, DateRangeType, DateType, DateValueType } from "../types";
interface Props {
    primaryColor?: string;
    value: DateValueType;
    onChange: (value: DateValueType, e?: HTMLInputElement | null | undefined) => void;
    useRange?: boolean;
    hideArrow?: boolean;
    showFooter?: boolean;
    showShortcuts?: boolean;
    configs?: Configs | null;
    asSingle?: boolean;
    placeholder?: string;
    separator?: string;
    startFrom?: Date | null;
    i18n?: string;
    disabled?: boolean;
    classNames?: ClassNamesTypeProp | undefined;
    inputClassName?: string | null;
    toggleClassName?: string | null;
    toggleIcon?: ((open: boolean) => React.ReactNode) | undefined;
    inputId?: string;
    inputName?: string;
    containerClassName?: string | null;
    displayFormat?: string;
    readOnly?: boolean;
    minDate?: DateType | null;
    maxDate?: DateType | null;
    disabledDates?: DateRangeType[] | null;
    startWeekOn?: string | null;
}
declare const Datepicker: React.FC<Props>;
export default Datepicker;
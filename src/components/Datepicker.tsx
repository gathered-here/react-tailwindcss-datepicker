import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Calendar from "../components/Calendar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Shortcuts from "../components/Shortcuts";
import {
    DEFAULT_BG_CLASSES,
    DEFAULT_BORDER_CLASSES,
    DEFAULT_COLOR,
    DEFAULT_COLORS,
    DEFAULT_TEXT_CLASSES
} from "../constants";
import DatepickerContext from "../contexts/DatepickerContext";
import { formatDate, nextMonth, previousMonth } from "../helpers";
import useOnClickOutside from "../hooks";
import {
    ClassNamesTypeProp,
    Configs,
    DateRangeType,
    DateType,
    DateValueType,
    Period
} from "../types";

import { Arrow, VerticalDash } from "./utils";

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

const Datepicker: React.FC<Props> = ({
    primaryColor = "blue",
    value = null,
    onChange,
    useRange = true,
    hideArrow = false,
    showFooter = false,
    showShortcuts = false,
    configs = null,
    asSingle = false,
    placeholder = null,
    separator = "~",
    startFrom = null,
    i18n = "en",
    disabled = false,
    inputClassName = null,
    containerClassName = null,
    toggleClassName = null,
    toggleIcon = undefined,
    displayFormat = "YYYY-MM-DD",
    readOnly = false,
    minDate = null,
    maxDate = null,
    disabledDates = null,
    inputId,
    inputName,
    startWeekOn = "sun",
    classNames = undefined
}) => {
    // Ref
    const containerRef = useRef<HTMLDivElement>(null);
    const calendarContainerRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    // State
    const [firstDate, setFirstDate] = useState<dayjs.Dayjs>(
        startFrom && dayjs(startFrom).isValid() ? dayjs(startFrom) : dayjs()
    );
    const [period, setPeriod] = useState<Period>({
        start: null,
        end: null
    });
    const [secondDate, setSecondDate] = useState<dayjs.Dayjs>(nextMonth(firstDate));
    const [dayHover, setDayHover] = useState<string | null>(null);
    const [inputText, setInputText] = useState<string>("");

    const [inputRef, setInputRef] = useState(React.createRef<HTMLInputElement>());

    // Custom Hooks use
    useOnClickOutside(containerRef, () => {
        const container = containerRef.current;
        if (container) {
            hideDatepicker();
        }
    });

    // Functions
    const hideDatepicker = useCallback(() => {
        const div = calendarContainerRef.current;
        const arrow = arrowRef.current;
        if (arrow && div && div.classList.contains("block")) {
            div.classList.remove("block");
            div.classList.remove("translate-y-0");
            div.classList.remove("opacity-1");
            div.classList.add("translate-y-4");
            div.classList.add("opacity-0");
            setTimeout(() => {
                div.classList.remove("bottom-full");
                div.classList.add("hidden");
                div.classList.add("mb-2.5");
                div.classList.add("mt-2.5");
                arrow.classList.remove("-bottom-2");
                arrow.classList.remove("border-r");
                arrow.classList.remove("border-b");
                arrow.classList.add("border-l");
                arrow.classList.add("border-t");
            }, 300);
        }
    }, []);

    const firstGotoDate = useCallback(
        (date: dayjs.Dayjs) => {
            const newDate = dayjs(formatDate(date));
            const reformatDate = dayjs(formatDate(secondDate));
            if (newDate.isSame(reformatDate) || newDate.isAfter(reformatDate)) {
                setSecondDate(nextMonth(date));
            }
            setFirstDate(date);
        },
        [secondDate]
    );

    const previousMonthFirst = useCallback(() => {
        setFirstDate(previousMonth(firstDate));
    }, [firstDate]);

    const nextMonthFirst = useCallback(() => {
        firstGotoDate(nextMonth(firstDate));
    }, [firstDate, firstGotoDate]);

    const secondGotoDate = useCallback(
        (date: dayjs.Dayjs) => {
            const newDate = dayjs(formatDate(date, displayFormat));
            const reformatDate = dayjs(formatDate(firstDate, displayFormat));
            if (newDate.isSame(reformatDate) || newDate.isBefore(reformatDate)) {
                setFirstDate(previousMonth(date));
            }
            setSecondDate(date);
        },
        [firstDate, displayFormat]
    );

    const previousMonthSecond = useCallback(() => {
        secondGotoDate(previousMonth(secondDate));
    }, [secondDate, secondGotoDate]);

    const nextMonthSecond = useCallback(() => {
        setSecondDate(nextMonth(secondDate));
    }, [secondDate]);

    const changeFirstMonth = useCallback(
        (month: number) => {
            firstGotoDate(dayjs(`${firstDate.year()}-${month < 10 ? "0" : ""}${month}-01`));
        },
        [firstDate, firstGotoDate]
    );

    const changeSecondMonth = useCallback(
        (month: number) => {
            secondGotoDate(dayjs(`${secondDate.year()}-${month < 10 ? "0" : ""}${month}-01`));
        },
        [secondDate, secondGotoDate]
    );

    const changeFirstYear = useCallback(
        (year: number) => {
            firstGotoDate(dayjs(`${year}-${firstDate.month() + 1}-01`));
        },
        [firstDate, firstGotoDate]
    );

    const changeSecondYear = useCallback(
        (year: number) => {
            secondGotoDate(dayjs(`${year}-${secondDate.month() + 1}-01`));
        },
        [secondDate, secondGotoDate]
    );

    // UseEffects & UseLayoutEffect
    useEffect(() => {
        const container = containerRef.current;
        const calendarContainer = calendarContainerRef.current;
        const arrow = arrowRef.current;

        if (container && calendarContainer && arrow) {
            const detail = container.getBoundingClientRect();
            const screenCenter = window.innerWidth / 2;
            const containerCenter = (detail.right - detail.x) / 2 + detail.x;

            if (containerCenter > screenCenter) {
                arrow.classList.add("right-0");
                arrow.classList.add("mr-3.5");
                calendarContainer.classList.add("right-0");
            }
        }
    }, []);

    useEffect(() => {
        if (value && value.startDate && value.endDate) {
            const startDate = dayjs(value.startDate);
            const endDate = dayjs(value.endDate);
            const validDate = startDate.isValid() && endDate.isValid();
            const condition =
                validDate && (startDate.isSame(endDate) || startDate.isBefore(endDate));
            if (condition) {
                setPeriod({
                    start: formatDate(startDate),
                    end: formatDate(endDate)
                });
                setInputText(
                    `${formatDate(startDate, displayFormat)}${
                        asSingle ? "" : ` ${separator} ${formatDate(endDate, displayFormat)}`
                    }`
                );
            }
        }

        if (value && value.startDate === null && value.endDate === null) {
            setPeriod({
                start: null,
                end: null
            });
            setInputText("");
        }
    }, [asSingle, value, displayFormat, separator]);

    useEffect(() => {
        if (startFrom && dayjs(startFrom).isValid()) {
            if (value != null && value.startDate != null) {
                setFirstDate(dayjs(value.startDate));
                setSecondDate(nextMonth(dayjs(value.startDate)));
            } else {
                setFirstDate(dayjs(startFrom));
                setSecondDate(nextMonth(dayjs(startFrom)));
            }
        }
    }, [startFrom, value]);

    // Variable
    const colorPrimary = useMemo(() => {
        if (configs?.colors && DEFAULT_COLORS.includes(primaryColor)) {
            return primaryColor;
        }
        return DEFAULT_COLOR;
    }, [primaryColor, configs?.colors]);

    const contextValues = useMemo(() => {
        return {
            asSingle,
            primaryColor: colorPrimary,
            configs,
            calendarContainer: calendarContainerRef,
            arrowContainer: arrowRef,
            hideDatepicker,
            period,
            changePeriod: (newPeriod: Period) => setPeriod(newPeriod),
            dayHover,
            changeDayHover: (newDay: string | null) => setDayHover(newDay),
            inputText,
            changeInputText: (newText: string) => setInputText(newText),
            updateFirstDate: (newDate: dayjs.Dayjs) => firstGotoDate(newDate),
            changeDatepickerValue: onChange,
            showFooter,
            placeholder,
            separator,
            i18n,
            value,
            disabled,
            inputClassName,
            containerClassName,
            toggleClassName,
            toggleIcon,
            readOnly,
            displayFormat,
            minDate,
            maxDate,
            disabledDates,
            inputId,
            inputName,
            startWeekOn,
            classNames,
            onChange,
            input: inputRef
        };
    }, [
        asSingle,
        colorPrimary,
        configs,
        hideDatepicker,
        period,
        dayHover,
        inputText,
        onChange,
        showFooter,
        placeholder,
        separator,
        i18n,
        value,
        disabled,
        inputClassName,
        containerClassName,
        toggleClassName,
        toggleIcon,
        readOnly,
        displayFormat,
        firstGotoDate,
        minDate,
        maxDate,
        disabledDates,
        inputId,
        inputName,
        startWeekOn,
        classNames,
        inputRef
    ]);

    return (
        <DatepickerContext.Provider value={contextValues}>
            <div
                className={`
                    relative w-full 
                    ${(classNames?.text ?? DEFAULT_TEXT_CLASSES).placeholder} 
                    ${containerClassName}
                `}
                ref={containerRef}
            >
                <Input setContextRef={setInputRef} />

                <div
                    className={`
                        transition-all ease-out duration-300 
                        absolute z-10 
                        mt-[1px] 
                        text-sm lg:text-xs 2xl:text-sm 
                        translate-y-4 opacity-0 
                        hidden
                    `}
                    ref={calendarContainerRef}
                >
                    <Arrow className={hideArrow ? "hidden" : ""} ref={arrowRef} />

                    <div
                        className={`
                        mt-2.5 px-1 py-0.5 
                        ${(classNames?.border ?? DEFAULT_BORDER_CLASSES).container} 
                        ${(classNames?.bg ?? DEFAULT_BG_CLASSES).container} 
                        ${(classNames?.text ?? DEFAULT_TEXT_CLASSES).body} 
                    `}
                    >
                        <div className="flex flex-col py-2 lg:flex-row">
                            {showShortcuts && <Shortcuts />}

                            <div
                                className={`
                                    flex flex-col md:flex-row 
                                    items-stretch 
                                    space-y-4 md:space-y-0 md:space-x-1.5 
                                    ${showShortcuts ? "md:pl-2" : "md:pl-1"} 
                                    pr-2 lg:pr-1
                                `}
                            >
                                <Calendar
                                    date={firstDate}
                                    onClickPrevious={previousMonthFirst}
                                    onClickNext={nextMonthFirst}
                                    changeMonth={changeFirstMonth}
                                    changeYear={changeFirstYear}
                                />

                                {useRange && (
                                    <>
                                        <div className="flex items-center">
                                            <VerticalDash />
                                        </div>

                                        <Calendar
                                            date={secondDate}
                                            onClickPrevious={previousMonthSecond}
                                            onClickNext={nextMonthSecond}
                                            changeMonth={changeSecondMonth}
                                            changeYear={changeSecondYear}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        {showFooter && <Footer />}
                    </div>
                </div>
            </div>
        </DatepickerContext.Provider>
    );
};

export default Datepicker;

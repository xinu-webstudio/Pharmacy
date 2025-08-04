import { ReactElement } from "react";
import { AbsentIcon, CalendarIcon, LateIcon, PresentIcon } from "../../assets/Svg/AttendanceSvg";

interface FourCardProps {
    firstCardTitle: string;
    firstCardValue?: number | string;
    firstCardDescription?: string;
    secondCardTitle?: string;
    secondCardValue?: number | string;
    secondCardDescription?: string;
    thirdCardTitle?: string;
    thirdCardValue?: number | string;
    thirdCardDescription?: string;
    fourthCardTitle?: string;
    fourthCardValue?: number | string;
    fourthCardDescription?: string;
}

export const FourboxHeader = ({
    firstCardTitle,
    firstCardValue,
    firstCardDescription,
    secondCardTitle,
    secondCardValue,
    secondCardDescription,
    thirdCardTitle,
    thirdCardValue,
    thirdCardDescription,
    fourthCardTitle,
    fourthCardValue,
    fourthCardDescription,
}: FourCardProps) => {

    return (
        <div className="bg-white rounded-md">
            <div className="grid grid-cols-4 gap-5 p-5">
                {
                    firstCardTitle && <StatCard title={firstCardTitle} value={firstCardValue} icon={<CalendarIcon />} lastUpdated={firstCardDescription} />
                }
                {
                    secondCardTitle && <StatCard title={secondCardTitle} value={secondCardValue} icon={<PresentIcon />} lastUpdated={secondCardDescription} />
                }
                {
                    thirdCardTitle && <StatCard title={thirdCardTitle} value={thirdCardValue} icon={<AbsentIcon />} lastUpdated={thirdCardDescription} />
                }
                {
                    fourthCardTitle && <StatCard title={fourthCardTitle} value={fourthCardValue} icon={<LateIcon />} lastUpdated={fourthCardDescription} />
                }


            </div>
        </div>
    )
}

const StatCard = ({ title, value, icon, lastUpdated }: { title: string; value: string | number | undefined; icon: ReactElement, lastUpdated: string | undefined }) => (
    <div className="p-4 bg-[#f6f8f9] rounded-md shadow-sm">
        <div className="flex justify-between">
            <div className="flex flex-col gap-2">
                <p className="mt-1 text-sm font-medium text-gray-600">{title}</p>
                <p className="text-xl font-semibold">{value}</p>
                <p className="mt-1 text-[13px] text-gray-600">{lastUpdated}</p>
            </div>
            <span className="text-2xl">{icon}</span>
        </div>
    </div>
);